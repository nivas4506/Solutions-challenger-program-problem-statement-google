const { Kafka } = require('kafkajs');
const { CronJob } = require('cron');

const KAFKA_BROKER = process.env.KAFKA_BROKER || 'localhost:9093';
const TARGET_SITES = (process.env.TARGET_SITES || 'https://sketchy-stream-site.com,https://fake-sports-tv.com').split(',');

const kafka = new Kafka({
  clientId: 'crawler-manager',
  brokers: [KAFKA_BROKER]
});

const producer = kafka.producer();

async function init() {
  await producer.connect();
  console.log('Crawler Manager connected to Kafka.');
  
  // Dispatch a simulated scrape job every 30 seconds
  const job = new CronJob('*/30 * * * * *', async () => {
    console.log('[Scheduler] Dispatching crawl jobs...');
    
    for (const site of TARGET_SITES) {
      const crawlTask = {
        taskId: `task-${Date.now()}`,
        url: site,
        type: 'web_scrape',
        priority: 'high',
        timestamp: new Date().toISOString()
      };
      
      await producer.send({
        topic: 'crawl-jobs',
        messages: [
          { value: JSON.stringify(crawlTask) }
        ],
      });
      console.log(`Dispatched crawl job for target: ${site}`);
    }
  });

  job.start();
  console.log('Crawler schedule started.');
}

init().catch(console.error);
