require('dotenv').config();
const { DynamoDBClient, CreateTableCommand } = require('@aws-sdk/client-dynamodb');

const dynamodb = new DynamoDBClient({ 
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function createTable() {
  try {
    const result = await dynamodb.send(new CreateTableCommand({
      TableName: 'Voice-to-Connection',
      KeySchema: [
        {
          AttributeName: 'serviceId',
          KeyType: 'HASH'
        }
      ],
      AttributeDefinitions: [
        {
          AttributeName: 'serviceId',
          AttributeType: 'S'
        }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    }));

    console.log('✅ Table created successfully');
    console.log('Table ARN:', result.TableDescription.TableArn);
    
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log('✅ Table already exists');
    } else {
      console.log('❌ Error:', error.message);
    }
  }
}

createTable();