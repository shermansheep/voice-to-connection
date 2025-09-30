import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';

const dynamodb = new DynamoDBClient({ region: 'ap-southeast-2' });

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const result = await dynamodb.send(new ScanCommand({
      TableName: 'Voice-to-Connection',
      FilterExpression: 'attribute_exists(serviceId)'
    }));

    const services = (result.Items || []).map(item => ({
      serviceId: item.serviceId?.S,
      elderlyId: item.elderlyId?.S,
      title: item.title?.S,
      description: item.description?.S,
      category: item.category?.S,
      urgency: item.urgency?.S,
      status: item.status?.S,
      createdAt: item.createdAt?.S,
      voiceRecordUrl: item.voiceRecordUrl?.S
    }));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(services)
    };

  } catch (error) {
    console.error('Error getting services:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Failed to get services' })
    };
  }
};