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
    
    // Abonner på initialverdien
    stompClient.subscribe('/topic/initial-sales-count', (message) => {
        const count = JSON.parse(message.body);
        eventEmitter.emit('dailySales', count);
    });

    // Abonner på events fra Event Hubs
    stompClient.subscribe('/topic/receipts', (message) => {
        const event = JSON.parse(message.body);
        eventEmitter.emit('sale', event);
    });

    // Abonner på dagens salgstall
    stompClient.subscribe('/topic/daily-sales', (message) => {
        const count = JSON.parse(message.body);
        eventEmitter.emit('dailySales', count);
    });

    // Be om initialverdi ETTER at subscription er satt opp
    setTimeout(() => {
        stompClient.publish({ destination: '/app/get-initial-sales' });
    }, 200); // 200 ms for å være sikker på at subscription er aktiv
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