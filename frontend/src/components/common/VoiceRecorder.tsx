import React, { useState, useRef } from 'react';
import { MicrophoneIcon, StopIcon, PlayIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  maxDuration?: number;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onRecordingComplete,
  maxDuration = 60
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [duration, setDuration] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        onRecordingComplete(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);

      // 計時器
      intervalRef.current = setInterval(() => {
        setDuration(prev => {
          if (prev >= maxDuration) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (error) {
      console.error('無法存取麥克風:', error);
      alert('無法存取麥克風，請檢查權限設定');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const playRecording = () => {
    if (audioBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-center">
        <div className="mb-4">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
            isRecording ? 'bg-red-100 recording-pulse' : 'bg-blue-100'
          }`}>
            {isRecording ? (
              <StopIcon className="w-12 h-12 text-red-600" />
            ) : (
              <MicrophoneIcon className="w-12 h-12 text-blue-600" />
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-2xl font-mono text-gray-700">
            {formatTime(duration)}
          </div>
          <div className="text-sm text-gray-500">
            最長 {formatTime(maxDuration)}
          </div>
        </div>

        <div className="space-y-3">
          {!isRecording ? (
            <Button
              onClick={startRecording}
              size="lg"
              className="w-full flex items-center justify-center"
            >
              <MicrophoneIcon className="w-5 h-5 mr-2" />
              開始錄音
            </Button>
          ) : (
            <Button
              onClick={stopRecording}
              variant="danger"
              size="lg"
              className="w-full flex items-center justify-center"
            >
              <StopIcon className="w-5 h-5 mr-2" />
              停止錄音
            </Button>
          )}

          {audioBlob && !isRecording && (
            <Button
              onClick={playRecording}
              variant="secondary"
              size="lg"
              className="w-full flex items-center justify-center"
              disabled={isPlaying}
            >
              <PlayIcon className="w-5 h-5 mr-2" />
              {isPlaying ? '播放中...' : '試聽錄音'}
            </Button>
          )}
        </div>

        {isRecording && (
          <div className="mt-4 text-sm text-gray-600">
            正在錄音中，請清楚說出您的需求...
          </div>
        )}
      </div>
    </div>
  );
};