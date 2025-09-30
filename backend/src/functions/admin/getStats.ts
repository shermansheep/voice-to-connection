import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';

const dynamodb = new DynamoDBClient({ region: 'ap-southeast-2' });

export const handler: APIGatewayProxyHandler = async () => {
  try {
    // 獲取服務統計
    const servicesResult = await dynamodb.send(new ScanCommand({
      TableName: 'Voice-to-Connection',
      Select: 'ALL_ATTRIBUTES'
    }));

    const services = servicesResult.Items || [];
    const totalServices = services.length;
    const pendingServices = services.filter(s => s.status?.S === 'pending').length;
    const matchedServices = services.filter(s => s.status?.S === 'matched').length;
    const completedServices = services.filter(s => s.status?.S === 'completed').length;

    // 獲取配對統計 (使用同一張表)
    const matchesResult = await dynamodb.send(new ScanCommand({
      TableName: 'Voice-to-Connection',
      FilterExpression: 'attribute_exists(matchId)',
      Select: 'ALL_ATTRIBUTES'
    }));

    const matches = matchesResult.Items || [];
    const successfulMatches = matches.filter(m => m.status?.S === 'accepted').length;
    const matchSuccessRate = totalServices > 0 ? (successfulMatches / totalServices) * 100 : 0;

    // 計算平均配對時間 (模擬數據)
    const averageMatchTime = 18;

    // 獲取志工統計 (模擬數據)
    const totalVolunteers = 78;
    const activeVolunteers = 34;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        totalServices,
        pendingServices,
        matchedServices,
        completedServices,
        totalVolunteers,
        activeVolunteers,
        averageMatchTime,
        matchSuccessRate: Math.round(matchSuccessRate * 10) / 10
      })
    };

  } catch (error) {
    console.error('Error getting admin stats:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Failed to get stats' })
    };
  }
};