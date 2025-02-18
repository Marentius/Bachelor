package no.europris.backend.eventhub;

import com.azure.messaging.eventhubs.*;

import com.azure.messaging.eventhubs.models.EventPosition;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

// Denne klassen er ansvarlig for å motta events fra Azure Event Hub og videresende dem til WebSocket
@Component // Gjør at Spring Boot automatisk oppretter en instans av denne klassen
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

        // Starter en ny tråd for å lytte etter events (for å ikke blokkere hovedtråden)
        new Thread(this::startReceiving).start();
    }

    // Kontinuerlig lytting etter events
    private void startReceiving() {
        while (true) {
            try {
                // Henter liste over alle partisjoner i Event Hub
                for (String partitionId : eventHubConsumerClient.getPartitionIds()) {
                    // For hver partisjon, hent events
                    eventHubConsumerClient
                            .receiveFromPartition(partitionId, 100, EventPosition.latest())
                            .forEach(event -> processEvent(event.getData()));
                }

                // En minimal pause (10ms) for å unngå CPU-spinning
                Thread.sleep(10);

            } catch (Exception e) {
                processError(e);
                try {
                    // Beholder 5 sekunders pause ved feil for å unngå flood ved feilsituasjoner
                    Thread.sleep(5000);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        }
    }

    // Håndterer hvert enkelt event som mottas
    private void processEvent(EventData event) {
        // Konverterer event-data til string
        String eventData = event.getBodyAsString();
        // Logger til konsoll
        System.out.printf("Mottok event med innhold: %s%n", eventData);
        // Sender eventet til alle tilkoblede WebSocket-klienter på topic "receipts"
        messagingTemplate.convertAndSend("/topic/receipts", eventData);
    }

    // Enkel feilhåndtering - logger feilmeldingen
    private void processError(Throwable throwable) {
        System.out.printf("Feil ved prosessering av event: %s%n", throwable.getMessage());
    }
}
/**
 * Kilder:
 * https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-java-get-started-send?tabs=passwordless%2Croles-azure-portal
 * https://learn.microsoft.com/en-us/azure/developer/java/spring-framework/configure-spring-cloud-stream-binder-java-app-azure-event-hub?toc=%2Fazure%2Fevent-hubs%2FTOC.json
 */