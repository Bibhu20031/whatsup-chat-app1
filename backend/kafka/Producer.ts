import { Kafka } from 'kafkajs';
import fs from 'fs';
import path from 'path';
const kafka = new Kafka({
  clientId: 'whatsup-chat-app',
  brokers: ['kafka-whatsup-whatsup-chat-app.i.aivencloud.com:13716'] ,
  
  ssl:{
    ca:[fs.readFileSync(path.resolve('./ca.pem'), 'utf-8')]
  },
  
  sasl: {
     username: "avnadmin",
     password:process.env.KAFKA_PASS as string,
     mechanism: 'plain',
  }
});

const producer = kafka.producer();

export const sendMessage = async (newMessage:any) => {
  try {
    await producer.connect();
    await producer.send({
      topic: 'chat-messages',
      messages: [
        { value: JSON.stringify(newMessage) },
      ],
    });
  } catch (error) {
    console.error('Error producing message:', error);
    
  } finally {
    await producer.disconnect();
  }
};

export default sendMessage;
