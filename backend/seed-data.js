require('dotenv').config();
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');

const dynamodb = new DynamoDBClient({ 
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const sampleData = [
  {
    'Voice-to-Connection': { S: 'svc-001' },
    serviceId: { S: 'svc-001' },
    elderlyId: { S: 'elderly-123' },
    title: { S: '購物協助' },
    description: { S: '需要有人幫我去超市買一些日常用品和蔬菜' },
    category: { S: 'shopping' },
    urgency: { S: 'medium' },
    status: { S: 'pending' },
    createdAt: { S: new Date().toISOString() }
  },
  {
    'Voice-to-Connection': { S: 'svc-002' },
    serviceId: { S: 'svc-002' },
    elderlyId: { S: 'elderly-456' },
    title: { S: '燈泡更換' },
    description: { S: '家裡的燈泡壞了，需要有人幫忙更換' },
    category: { S: 'household' },
    urgency: { S: 'low' },
    status: { S: 'matched' },
    createdAt: { S: new Date().toISOString() }
  },
  {
    'Voice-to-Connection': { S: 'svc-003' },
    serviceId: { S: 'svc-003' },
    elderlyId: { S: 'elderly-789' },
    title: { S: '陪診服務' },
    description: { S: '需要有人陪同去醫院看診' },
    category: { S: 'medical' },
    urgency: { S: 'high' },
    status: { S: 'completed' },
    createdAt: { S: new Date().toISOString() }
  }
];

async function seedData() {
  try {
    for (const item of sampleData) {
      await dynamodb.send(new PutItemCommand({
        TableName: 'Voice-to-Connection',
        Item: item
      }));
      console.log(`✅ Added: ${item.title.S}`);
    }
    console.log('🎉 Sample data added successfully');
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

seedData();