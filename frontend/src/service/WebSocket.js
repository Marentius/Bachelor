import { Client } from '@stomp/stompjs';

import { WebSocket } from 'ws';
Object.assign(global, { WebSocket });

const client = new Client({
  brokerURL: 'ws://localhost:8080/ws',
  onConnect: () => {
    client.subscribe('/topic/receipts', message =>
      console.log(`Received: ${message.body}`)
    );
    client.publish({ destination: '/topic/receipts', body: 'First Message' });
  },
});

client.activate();