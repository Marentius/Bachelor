package no.europris.backend.eventhub;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Component
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
        ObjectNode event = objectMapper.createObjectNode();
        event.put("StoreNum", 546);
        System.out.println(event);
        messagingTemplate.convertAndSend("/topic/receipts", event);
    }

}
