package no.europris.backend.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import no.europris.backend.service.SalesCounterService;

@Controller
public class SalesCounterController {

    @Autowired
    private SalesCounterService salesCounterService;

    @MessageMapping("/get-initial-sales")
    @SendTo("/topic/initial-sales-count")
    public int getInitialSales() {
        return salesCounterService.getDailySalesCount();
    }
}
