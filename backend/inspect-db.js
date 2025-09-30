require('dotenv').config();
const { DynamoDBClient, ScanCommand, DescribeTableCommand } = require('@aws-sdk/client-dynamodb');

const dynamodb = new DynamoDBClient({ 
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function inspectTable() {
  try {
    // Get table info
    const tableInfo = await dynamodb.send(new DescribeTableCommand({
      TableName: 'Voice-to-Connection'
    }));
    
    console.log('📊 Table Info:');
    console.log('- Name:', tableInfo.Table.TableName);
    console.log('- Status:', tableInfo.Table.TableStatus);
    console.log('- Item Count:', tableInfo.Table.ItemCount);
    
    // Get sample items
    const items = await dynamodb.send(new ScanCommand({
      TableName: 'Voice-to-Connection',
      Limit: 5
    }));
    
    console.log('\n📋 Sample Items:');
    items.Items.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, JSON.stringify(item, null, 2));
    });
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

inspectTable();