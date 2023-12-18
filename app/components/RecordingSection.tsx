import { Microphone, Pause } from "@phosphor-icons/react";
import Button from "./shared/Button";
import { FC, useEffect, useRef, useState } from "react";
import moment from "moment";
import AudioWaveForm from "./AudioWaveForm";

const DATA_ACTUALIZATION_RATE = 1;
const RecordingSection: FC = () => {
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array());
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState<Date>(new Date(0));
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = new Date(prev.getTime() + 1000);
          return newTime;
        });
      }, 1000);

      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorder.current = new MediaRecorder(stream);
          mediaRecorder.current.start(DATA_ACTUALIZATION_RATE);

          const audioChunks: Blob[] = [];
          const audioContext = new AudioContext();
          const track = audioContext.createMediaStreamSource(stream);
          const analyser = audioContext.createAnalyser();
          track.connect(analyser);
          analyser.connect(audioContext.destination);

          mediaRecorder.current.addEventListener("dataavailable", (event) => {
            audioChunks.push(event.data);

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteTimeDomainData(dataArray);
            setAudioData(dataArray);
          });
        })
        .catch((err) => {
          console.error(err);
        });

      return () => clearInterval(interval);
    } else {
      setAudioData(new Uint8Array());
    }
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(new Date(0));
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setRecordingTime(new Date(0));

      // Stop the media stream
      mediaRecorder.current.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Button
        onClick={() => {
          if (isRecording) {
            stopRecording();
          } else {
            startRecording();
          }
        }}
        className="relative mb-16"
      >
        {isRecording ? (
          <Pause color="#1b2e75" size={60} />
        ) : (
          <Microphone color="#1b2e75" size={60} />
        )}
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          {isRecording && (
            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-800 opacity-75 " />
          )}
          <div className="absolute inline-flex rounded-full h-32 w-32 border-4 border-blue-800 hover:bg-purple-600/20" />
        </div>
      </Button>
      <AudioWaveForm
        audioData={audioData}
        height={150}
        width={600}
        isRecording={isRecording}
      />
      <div className="text-blue-800 text-center mb-6">
        <span className="text-2xl font-semibold">
          {moment(recordingTime).format("mm:ss")}
        </span>
      </div>
    </div>
  );
};

export default RecordingSection;
