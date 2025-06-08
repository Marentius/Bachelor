import { Client } from '@stomp/stompjs';
import EventEmitter from 'events';

// EventEmitter brukes for å sende eventer til Animation.jsx
export const eventEmitter = new EventEmitter();

// Oppretter en STOMP-klient
const stompClient = new Client({
    // Kobler til WebSocket-endepunktet med backend deployment url 
    brokerURL: 'ws://localhost:8080/ws-receipts'
});

// Kjøres når tilkoblingen er etablert
stompClient.onConnect = (frame) => {
    // Logger tilkoblingsinformasjon til nettleserkonsollen
    console.log('Tilkoblet: ' + frame);
    
    // Abonnerer på events fra Event Hubs
    // Dette matcher destinasjonen i backend: messagingTemplate.convertAndSend("/topic/receipts", ...)
    stompClient.subscribe('/topic/receipts', (message) => {
        const event = JSON.parse(message.body);
        
        // Sender event til alle lyttere (Animation.jsx)
        eventEmitter.emit('sale', event);
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

// Starter WebSocket-tilkoblingen
stompClient.activate();

export default stompClient;