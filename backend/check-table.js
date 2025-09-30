require('dotenv').config();
const { DynamoDBClient, DescribeTableCommand } = require('@aws-sdk/client-dynamodb');

const dynamodb = new DynamoDBClient({ 
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function checkTable() {
  try {
    const result = await dynamodb.send(new DescribeTableCommand({
      TableName: 'Voice-to-Connection'
    }));
    
    console.log('📊 Table Schema:');
    console.log('Primary Key:', result.Table.KeySchema);
    console.log('Attributes:', result.Table.AttributeDefinitions);
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

checkTable();