package no.europris.backend.eventhub;

import java.time.LocalTime;
import java.util.Random;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

//@Component
@EnableScheduling
public class SimulatedReciever {
    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public SimulatedReciever(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @Scheduled(fixedDelay = 1000)
    public void pollEventsWithFixedDelay() {
        System.out.println("Polling events med fixed delay: " + System.currentTimeMillis() / 1000);
        pollEvents();
    }

    private void pollEvents() {
        LocalTime time = LocalTime.now();
        Random random = new Random();

        ObjectNode event = objectMapper.createObjectNode();

        event.put("uniqueReceiptId", time.toString());
        event.put("storeNo", random.nextInt(400));
        event.put("numberOfDifferentItems", random.nextInt(10));
        event.put("quantityOfItems", random.nextInt(10));
        event.put("receiptTotalIncVat", random.nextInt(1100));
        event.put("transDateTime", time.toString());
        event.put("saleSizeCategory", random.nextInt(3) + 1);

        System.out.println(event.getNodeType());
        System.out.println(event.getClass());
        
        messagingTemplate.convertAndSend("/topic/receipts", event);
    }
}
