package no.europris.backend.service;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.lang.NonNull;

//Denne klassen setter opp WebSocket-kommunikasjon mellom server og klient.
@Configuration
@EnableWebSocketMessageBroker // Aktiverer WebSocket med message broker
public class WebSocket implements WebSocketMessageBrokerConfigurer {

    /**
     * Konfigurerer message broker for WebSocket-kommunikasjon
     * 
     * @param config Konfigurasjonsobjekt for message broker
     */
    @Override
    public void configureMessageBroker(@NonNull MessageBrokerRegistry config) {
        // Setter opp en simpel broker som håndterer meldinger med destinasjonen '/topic'
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    /**
     * Registrerer STOMP-endepunkter som klienter kan koble seg til
     * 
     * @param registry Register for STOMP-endepunkter
     */
    @Override
    public void registerStompEndpoints(@NonNull StompEndpointRegistry registry) {
        // Oppretter hovedendepunktet for WebSocket-tilkoblinger
        registry.addEndpoint("/ws-receipts").setAllowedOrigins("*");
    }
}

// Kilde: https://spring.io/guides/gs/messaging-stomp-websocket
