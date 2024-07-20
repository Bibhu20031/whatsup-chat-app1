import { Kafka } from 'kafkajs';
import { PrismaClient } from '@prisma/client'; 
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
const consumer=kafka.consumer({ groupId: 'chat-app-group' });

const prisma = new PrismaClient(); 

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'chat-messages', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
            if (message.value) {
              const value: ChatMessage = JSON.parse(message.value.toString()); 
      
              try {
                await prisma.message.create({
                  data: {
                    conversationId: value.conversationId,
                    senderId: value.senderId,
                    body: value.body,
                    imageUrl: value.imageUrl,
                  },
                });
                console.log('Message persisted to database:', value);
              } catch (error) {
                console.error('Error persisting message:', error);
                
              }
            } else {
              console.warn('Received empty message');
              
            }
          },
  });
};

run().catch(console.error);
interface ChatMessage {
    conversationId: string;
    senderId: string;
    body?: string;
    imageUrl?: string;
  }