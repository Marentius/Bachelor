package no.europris.backend.eventhub;

import com.azure.messaging.eventhubs.*;
import com.azure.messaging.eventhubs.models.EventPosition;
import no.europris.backend.service.SalesCounterService;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.EnableScheduling;

import jakarta.annotation.PostConstruct;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

/**
 * EventHub-mottaker som håndterer kommunikasjon mellom Azure Event Hubs og WebSocket-klienter.
 * Denne komponenten er ansvarlig for å:
 * 1. Koble til Azure Event Hubs
 * 2. Lytte etter nye events
 * 3. Prosessere mottatte events
 * 4. Videresende prosesserte events til tilkoblede WebSocket-klienter
 */
//@Component
@EnableScheduling
public class Reciever {
    
    // Connection string og navn for Azure Event Hub hentes fra BitBucket variabler
    @Value("${azure.eventhub.connection-string}")
    private String eventHubConnectionString;

    @Value("${azure.eventhub.name}")
    private String eventHubName;

    @Value("${azure.eventhub.consumerGroup}")
    private String consumerGroup;

    // Azure Event Hubs konsumerings-klient for å motta events
    private EventHubConsumerClient eventHubConsumerClient;

    // Spring WebSocket template for å sende meldinger til tilkoblede klienter
    private final SimpMessagingTemplate messagingTemplate;

    // Jackson ObjectMapper for JSON-håndtering
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final SalesCounterService salesCounterService;

    /**
     * Konstruktør som initialiserer WebSocket-messaging template
     * @param messagingTemplate template'n 
     */
    public Reciever(SimpMessagingTemplate messagingTemplate, SalesCounterService salesCounterService) {
        this.messagingTemplate = messagingTemplate;
        this.salesCounterService = salesCounterService;
    }

    /**
     * Initialiserer Event Hub-klienten etter at komponenten er opprettet.
     * Setter opp tilkobling til Event Hub med spesifisert consumer group.
     */
    @PostConstruct
    public void initialize() {
        eventHubConsumerClient = new EventHubClientBuilder()
                .connectionString(eventHubConnectionString, eventHubName)
                .consumerGroup(consumerGroup)
                .buildConsumerClient();
    }

    /**
     * Planlagt oppgave som kjører hvert sekund for å hente nye events.
     * Bruker fixedDelay for å sikre at neste kjøring starter 1 sekund etter at forrige er ferdig.
     */
    @Scheduled(fixedDelay = 1000)
    public void getEventsWithFixedDelay() {
        getEvents();
    }

    /**
     * Henter events fra alle partisjoner i Event Hub.
     * For hver partisjon hentes de 100 nyeste eventene.
     */
    private void getEvents() {
        try {
            for (String partitionId : eventHubConsumerClient.getPartitionIds()) {
                eventHubConsumerClient
                        .receiveFromPartition(partitionId, 100, EventPosition.latest())
                        .forEach(event -> processEvent(event.getData()));
            }
        } catch (Exception e) {
            processError(e);
        }
    }

    /**
     * Prosesserer et enkelt event fra Event Hubs.
     * Legger til kategorisering basert på kjøpsbeløp og videresender til WebSocket-klienter.
     * 
     * Kategorisering:
     * - Kategori 1: Beløp < 300
     * - Kategori 2: Beløp >= 300 og < 1000
     * - Kategori 3: Beløp >= 1000
     * 
     * @param event EventData-objektet som skal prosesseres
     */
    private void processEvent(EventData event) { 
        try {
            JsonNode jsonNode = objectMapper.readTree(event.getBodyAsString());
            Double receiptTotalIncVat = jsonNode.path("receiptTotalIncVat").asDouble();

            // Ignorerer negative salg og salg som går i null
            if (receiptTotalIncVat <= 0) return;

            // Kategoriserer kjøpet basert på beløp
            if (receiptTotalIncVat >= 300 && receiptTotalIncVat < 1000) {
                ((ObjectNode) jsonNode).put("saleSizeCategory", 2);
            } else if (receiptTotalIncVat >= 1000) {
                ((ObjectNode) jsonNode).put("saleSizeCategory", 3);
            } else {
                ((ObjectNode) jsonNode).put("saleSizeCategory", 1);
            }

            // Øker salgstelleren for hvert gyldig salg
            salesCounterService.incrementSalesCount();

            System.out.println("Mottok event med innhold: " + jsonNode.toString());
            messagingTemplate.convertAndSend("/topic/receipts", jsonNode);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    /**
     * Håndterer feil som oppstår under event-prosessering.
     * Logger feilmeldingen med tidsstempel.
     * 
     * @param throwable Feilen som oppstod
     */
    private void processError(Throwable throwable) {
        System.out.println("Feil ved prosessering av event (" + System.currentTimeMillis() / 1000 + "): " +
                throwable.getMessage());
    }
}
