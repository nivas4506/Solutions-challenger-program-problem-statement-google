const { Kafka } = require('kafkajs');
const axios = require('axios');

const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9093';

const kafka = new Kafka({
  clientId: 'scraper-worker',
  brokers: [KAFKA_BROKER]
});

const consumer = kafka.consumer({ groupId: 'scraper-group' });
const producer = kafka.producer();

async function scrapeSite(url) {
  console.log(`[Worker] Simulating deep scrape/stream-rip of URL: ${url}`);
  // In a production environment, this would spin up Puppeteer/Playwright
  // intercept network traffic to find .m3u8/.ts video streams,
  // download chunks, and format them for detection.
  
  await new Promise(resolve => setTimeout(resolve, 2500)); 
  
  return {
    suspect_url: `${url}/live-stream-${Math.floor(Math.random() * 1000)}.m3u8`,
    platform: url,
    mock_media_bytes: "FAKE_SUSPECT_VIDEO_CHUNK",
    captured_at: new Date().toISOString()
  };
}

async function init() {
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: 'crawl-jobs', fromBeginning: true });

  console.log('Scraper worker connected, listening for jobs...');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const task = JSON.parse(message.value.toString());
      console.log(`[Worker] Executing job: ${task.taskId} -> ${task.url}`);
      
      const scrapedData = await scrapeSite(task.url);
      
      // Publish the extracted suspected pirate media to Kafka for the Detection Engine
      await producer.send({
        topic: 'suspect-media',
        messages: [
          { value: JSON.stringify(scrapedData) }
        ],
      });
      console.log(`[Worker] Sent suspect media from ${task.url} to Detection Engine`);
    },
  });
}

init().catch(console.error);
