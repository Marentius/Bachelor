package no.europris.backend.eventhub;
 
import java.time.LocalTime;
import java.util.Random;
 
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import no.europris.backend.service.SalesCounterService;
 
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
 
@Component
@EnableScheduling
public class SimulatedReciever {
    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final SalesCounterService salesCounterService;
 
    public SimulatedReciever(SimpMessagingTemplate messagingTemplate, SalesCounterService salesCounterService) {
        this.messagingTemplate = messagingTemplate;
        this.salesCounterService = salesCounterService;
    }
 
    @Scheduled(fixedDelay = 200) // Kjører hvert 200. millisekund (5 ganger i sekundet)
    public void pollEventsWithFixedDelay() {
        System.out.println("Genererer 5 salg: " + System.currentTimeMillis() / 1000);
        pollEvents();
    }
 
    private void pollEvents() {
        // Genererer 5 salg per sekund
        for (int i = 0; i < 5; i++) {
            LocalTime time = LocalTime.now();
            Random random = new Random();
            ObjectNode event = objectMapper.createObjectNode();
            
            // Genererer et tilfeldig salg
            event.put("StoreNum", 546);
            event.put("uniqueReceiptId", time.toString() + "-" + i);
            event.put("storeNo", random.nextInt(400));
            event.put("numberOfDifferentItems", random.nextInt(10));
            event.put("quantityOfItems", random.nextInt(10));
            event.put("receiptTotalIncVat", random.nextInt(1100));
            event.put("transDateTime", time.toString());
            event.put("saleSizeCategory", random.nextInt(4));
            event.put("COUNTRY_CODE", event.get("storeNo").asInt() < 200 ? "NO" : "SE");

            salesCounterService.incrementSalesCount();
            
            // Sender salget til alle tilkoblede klienter
            messagingTemplate.convertAndSend("/topic/receipts", event);
        }
        
        // Logger antall salg som ble generert
        System.out.println("Genererte 5 salg: " + System.currentTimeMillis() / 1000);
    }
  {
    
  }
}
