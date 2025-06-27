package no.europris.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Service
public class SalesCounterService {
    private int dailySalesCount;
    private final SimpMessagingTemplate messagingTemplate;

    public SalesCounterService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
        this.dailySalesCount = 0;
    }

    public void incrementSalesCount() {
        dailySalesCount++;
        sendSalesCountUpdate();
    }

    private void sendSalesCountUpdate() {
        messagingTemplate.convertAndSend("/topic/daily-sales", dailySalesCount);
    }

     //Sender initialverdi til klienter som kobler seg til
     public void sendInitialCount() {
        messagingTemplate.convertAndSend("/topic/initial-sales-count", dailySalesCount);
    }

    @Scheduled(cron = "0 0 0 * * ?") // Kjører hver dag ved midnatt
    public void resetDailyCounter() {
        dailySalesCount = 0;
        sendSalesCountUpdate();
    }

    public int getDailySalesCount() {
        return dailySalesCount;
    }
}