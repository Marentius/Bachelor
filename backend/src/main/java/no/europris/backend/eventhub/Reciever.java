package no.europris.backend.eventhub;

import com.azure.messaging.eventhubs.*;
import com.azure.messaging.eventhubs.models.EventPosition;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.EnableScheduling;

import jakarta.annotation.PostConstruct;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

// Denne klassen er ansvarlig for å motta events fra Azure Event Hub og videresende dem til WebSocket

// Gjør at Spring Boot automatisk oppretter en instans av denne klassen
@Component
@EnableScheduling // Aktiverer scheduling-funksjonalitet
public class Reciever {
    // Henter connection string fra application.properties
    @Value("${azure.eventhub.connection-string}")
    private String eventHubConnectionString;

    // Henter event hub navn fra application.properties
    @Value("${azure.eventhub.name}")
    private String eventHubName;

    // Klienten som brukes til å koble mot Event Hub
    private EventHubConsumerClient eventHubConsumerClient;

    // Template for å sende meldinger til WebSocket-klienter
    private final SimpMessagingTemplate messagingTemplate;

    // For JSON-håndtering
    private final ObjectMapper objectMapper = new ObjectMapper();

    // Konstruktør som får messagingTemplate injisert av Spring
    public Reciever(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // Kalles automatisk etter at klassen er opprettet
    @PostConstruct
    public void initialize() {
        // Oppretter en Event Hub klient med gitt konfigurasjon
        eventHubConsumerClient = new EventHubClientBuilder()
                .connectionString(eventHubConnectionString, eventHubName)
                .consumerGroup("cg-studentweb")
                .buildConsumerClient();
        
        System.out.println("Event Hub-klient initialisert: " + System.currentTimeMillis() / 1000);
    }

    // Planlagt oppgave som kjører med fast intervall
    // fixedDelay = 1000 betyr at det går 1000ms fra en oppgave er ferdig til neste starter
    @Scheduled(fixedDelay = 1000)
    public void pollEventsWithFixedDelay() {
        System.out.println("Polling events med fixed delay: " + System.currentTimeMillis() / 1000);
        pollEvents();
    }

    // Metode for å hente events fra Event Hub
    private void pollEvents() {
        try {
            // Henter liste over alle partisjoner i Event Hub
            for (String partitionId : eventHubConsumerClient.getPartitionIds()) {
                // For hver partisjon, hent events
                eventHubConsumerClient
                        .receiveFromPartition(partitionId, 100, EventPosition.latest())
                        .forEach(event -> processEvent(event.getData()));
            }
        } catch (Exception e) {
            processError(e);
        }
    }

    // Håndterer hvert enkelt event som mottas
    private void processEvent(EventData event) {
        try {
            // For å unngå og opprette Java-objekter bruker vi JsonNode som lar oss jobbe
            // dynamisk med Json-data.

            // Oppretter ett JsonNode objekt og konverterer event-data til string
            JsonNode jsonNode = objectMapper.readTree(event.getBodyAsString());

            // Henter ut feltet vi skal bruke for å kategorisere dataen som double
            Double receiptTotalIncVat = jsonNode.path("receiptTotalIncVat").asDouble();

            // Legger til kategori basert på verdien i feltet, verdiene skal endres i
            // etterkant
            if (jsonNode.get("receiptTotalIncVat").asDouble() >= 300
                    && jsonNode.get("receiptTotalIncVat").asDouble() < 800) {
            //JsonNode er en skrivebeskyttet klasse. Det vil si at vi kan lese fra den, men ikke skrive til den. For å kunne skrive til den må vi type-caste den til ObjectNode.
                ((ObjectNode) jsonNode).put("saleSizeCategory", 2);
            }
            else if (receiptTotalIncVat >= 800) {
                ((ObjectNode) jsonNode).put("saleSizeCategory", 3);
            }
            else {
                ((ObjectNode) jsonNode).put("saleSizeCategory", 1);
            }

            // Logger til konsoll
            System.out.println("Mottok event med innhold: " + jsonNode.toString());

            // Sender eventet til alle tilkoblede WebSocket-klienter på topic "receipts"
            messagingTemplate.convertAndSend("/topic/receipts", jsonNode);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    // Enkel feilhåndtering - logger feilmeldingen
    private void processError(Throwable throwable) {
        System.out.printf("Feil ved prosessering av event (%s): %s%n", System.currentTimeMillis() / 1000, throwable.getMessage());
    }
}
/**
 * Kilder:
 * https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-java-get-started-send?tabs=passwordless%2Croles-azure-portal
 * https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/configure-spring-cloud-stream-binder-java-app-azure-event-hub?toc=%2Fazure%2Fevent-hubs%2FTOC.json
 * https://learn.microsoft.com/en-us/java/api/com.azure.messaging.eventhubs.eventhubconsumerclient?view=azure-java-stable
 * https://medium.com/@salvipriya97/jsonnode-explained-with-examples-d0c05324f61d
 * https://www.baeldung.com/jackson-json-node-tree-model
 * https://www.baeldung.com/spring-scheduled-tasks
 */
