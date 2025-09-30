import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';

const dynamodb = new DynamoDBClient({ region: 'ap-southeast-2' });
const s3 = new S3Client({ region: process.env.REGION });

const schema = Joi.object({
  title: Joi.string().required().max(100),
  description: Joi.string().max(500),
  category: Joi.string().valid(
    'transportation', 'shopping', 'medical', 
    'companionship', 'household', 'technology', 'other'
  ).required(),
  urgency: Joi.string().valid('low', 'medium', 'high').required(),
  elderlyId: Joi.string().required()
});

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    // 解析請求數據
    const body = JSON.parse(event.body || '{}');
    const { error, value } = schema.validate(body);
    
    if (error) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          error: 'Invalid input', 
          details: error.details 
        })
      };
    }

    const serviceId = uuidv4();
    const now = new Date().toISOString();

    // 處理語音檔案上傳 (如果有)
    let voiceRecordUrl;
    if (event.isBase64Encoded && event.body) {
      const voiceData = Buffer.from(event.body, 'base64');
      const voiceKey = `voice-requests/${serviceId}.wav`;
      
      await s3.send(new PutObjectCommand({
        Bucket: process.env.VOICE_BUCKET,
        Key: voiceKey,
        Body: voiceData,
        ContentType: 'audio/wav'
      }));
      
      voiceRecordUrl = `https://${process.env.VOICE_BUCKET}.s3.amazonaws.com/${voiceKey}`;
    }

    // 創建服務記錄
    const service = {
      serviceId: { S: serviceId },
      elderlyId: { S: value.elderlyId },
      title: { S: value.title },
      description: { S: value.description || '' },
      category: { S: value.category },
      urgency: { S: value.urgency },
      status: { S: 'pending' },
      createdAt: { S: now },
      updatedAt: { S: now }
    };

    if (voiceRecordUrl) {
      service.voiceRecordUrl = { S: voiceRecordUrl };
    }

    await dynamodb.send(new PutItemCommand({
      TableName: 'Voice-to-Connection',
      Item: service
    }));

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        serviceId,
        message: 'Service created successfully'
      })
    };

  } catch (error) {
    console.error('Error creating service:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Internal server error' 
      })
    };
  }
};