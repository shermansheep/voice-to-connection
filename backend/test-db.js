require('dotenv').config();
const { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');

const dynamodb = new DynamoDBClient({ 
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function testConnection() {
  try {
    const result = await dynamodb.send(new ScanCommand({
      TableName: 'Voice-to-Connection',
      Limit: 1
    }));
    
    console.log('✅ Connected to DynamoDB successfully');
    console.log('Items count:', result.Count);
    return true;
  } catch (error) {
    console.log('❌ Failed to connect:', error.message);
    return false;
  }
}

testConnection();