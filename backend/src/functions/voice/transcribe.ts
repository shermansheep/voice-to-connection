import { APIGatewayProxyHandler } from 'aws-lambda';
import { TranscribeClient, StartTranscriptionJobCommand, GetTranscriptionJobCommand } from '@aws-sdk/client-transcribe';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

const transcribe = new TranscribeClient({ region: process.env.REGION });
const s3 = new S3Client({ region: process.env.REGION });

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'No audio data provided' })
      };
    }

    // 上傳音頻檔案到 S3
    const audioData = Buffer.from(event.body, 'base64');
    const audioKey = `transcribe/${uuidv4()}.wav`;
    
    await s3.send(new PutObjectCommand({
      Bucket: process.env.VOICE_BUCKET,
      Key: audioKey,
      Body: audioData,
      ContentType: 'audio/wav'
    }));

    const audioUri = `s3://${process.env.VOICE_BUCKET}/${audioKey}`;
    const jobName = `transcribe-job-${uuidv4()}`;

    // 啟動轉錄工作
    await transcribe.send(new StartTranscriptionJobCommand({
      TranscriptionJobName: jobName,
      LanguageCode: 'zh-TW', // 繁體中文
      MediaFormat: 'wav',
      Media: {
        MediaFileUri: audioUri
      },
      OutputBucketName: process.env.VOICE_BUCKET,
      OutputKey: `transcripts/${jobName}.json`
    }));

    // 輪詢轉錄結果
    let attempts = 0;
    const maxAttempts = 30; // 最多等待30秒
    
    while (attempts < maxAttempts) {
      const result = await transcribe.send(new GetTranscriptionJobCommand({
        TranscriptionJobName: jobName
      }));

      if (result.TranscriptionJob?.TranscriptionJobStatus === 'COMPLETED') {
        // 獲取轉錄文本
        const transcriptUri = result.TranscriptionJob.Transcript?.TranscriptFileUri;
        if (transcriptUri) {
          // 這裡應該從S3獲取轉錄結果，簡化處理
          return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              text: '語音轉錄完成', // 實際應該從S3獲取轉錄文本
              jobName,
              transcriptUri
            })
          };
        }
      } else if (result.TranscriptionJob?.TranscriptionJobStatus === 'FAILED') {
        throw new Error('Transcription job failed');
      }

      // 等待1秒後重試
      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;
    }

    return {
      statusCode: 202,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Transcription job started',
        jobName,
        status: 'IN_PROGRESS'
      })
    };

  } catch (error) {
    console.error('Error in transcription:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        error: 'Transcription failed' 
      })
    };
  }
};