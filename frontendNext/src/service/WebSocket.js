import { Client } from '@stomp/stompjs';

// Oppretter en STOMP-klient
const stompClient = new Client({
    // Kobler til WebSocket-endepunktet definert i backend
    brokerURL: 'wss://ep-backend.calmstone-a598e619.northeurope.azurecontainerapps.io/ws-receipts'
});

// Kjøres når tilkoblingen er etablert
stompClient.onConnect = (frame) => {
    // Logger tilkoblingsinformasjon til nettleserkonsollen
    console.log('Tilkoblet: ' + frame);
    
    // Abonnerer på events fra Event Hub
    // Dette matcher destinasjonen i backend: messagingTemplate.convertAndSend("/topic/receipts", ...)
    stompClient.subscribe('/topic/receipts', (message) => {
        // Når et event mottas, parse JSON og logg til konsollen
        const eventData = JSON.parse(message.body);
        console.log('Mottatt event:', eventData);
    });
};

// Håndterer WebSocket-tilkoblingsfeil
stompClient.onWebSocketError = (error) => {
    console.error('WebSocket-feil:', error);
};

// Håndterer STOMP-protokollfeil
stompClient.onStompError = (frame) => {
    console.error('Broker rapporterte feil: ' + frame.headers['message']);
    console.error('Ytterligere detaljer: ' + frame.body);
};

// Starter tilkoblingen
stompClient.activate();

export default stompClient;


//Kilde: https://spring.io/guides/gs/messaging-stomp-websocket