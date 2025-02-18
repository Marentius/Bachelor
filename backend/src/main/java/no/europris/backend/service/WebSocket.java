
package no.europris.backend.service;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.lang.NonNull;

//Denne klassen setter opp WebSocket-kommunikasjon mellom server og klient.
@Configuration
@EnableWebSocketMessageBroker // Aktiverer WebSocket med meldingsmegler (message broker)
public class WebSocket implements WebSocketMessageBrokerConfigurer {

    /**
     * Konfigurerer message broker for WebSocket-kommunikasjon
     * 
     * @param config Konfigurasjonsobjekt for message broker
     */
    @Override
    public void configureMessageBroker(@NonNull MessageBrokerRegistry config) {
        // Setter opp en simpel broker som håndterer meldinger med '/topic' prefix
        // Klienter må abonnere på f.eks. "/topic/receipts" for å motta meldinger
        config.enableSimpleBroker("/topic");

        // Setter prefix for meldinger som sendes FRA klient TIL server
        // Klienter må sende meldinger til f.eks. "/app/send-receipt"
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
        registry.addEndpoint("/ws-receipts")
                // Tillater kun tilkoblinger fra React-applikasjonen på localhost:3000
                .setAllowedOrigins("http://localhost:3000")
                // Legger til SockJS-støtte for bedre kompatibilitet
                // SockJS er en fallback hvis ren WebSocket ikke støttes
                .withSockJS();
    }
}

// Kilde: https://spring.io/guides/gs/messaging-stomp-websocket
