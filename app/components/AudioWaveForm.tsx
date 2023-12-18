import React, { useEffect, useRef } from "react";

interface AudioWaveFormProps {
  audioData?: Uint8Array;
  width: number;
  height: number;
  isRecording: boolean;
}

const AudioWaveForm: React.FC<AudioWaveFormProps> = ({
  audioData,
  width,
  height,
  isRecording,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) return;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Clear the canvas before drawing
    canvasContext.clearRect(0, 0, width, height);

    // Draw the static center line
    canvasContext.beginPath();
    canvasContext.moveTo(0, height / 2);
    canvasContext.lineTo(width, height / 2);
    canvasContext.strokeStyle = "#1b2e75";
    canvasContext.lineWidth = 1;
    canvasContext.stroke();

    if (!audioData || !isRecording) {
      // If not recording, cancel the animation frame to stop drawing
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const barWidth = Math.max(1, Math.floor(width / audioData.length));
    let x = 0;

    canvasContext.fillStyle = "#1b2e75";
    const centerY = height / 2;

    for (let i = 0; i < audioData.length; i++) {
      const value = audioData[i];
      const adjustmentFactor = 3;
      const normalizedValue = (value - 128) * adjustmentFactor + 128;
      const barHeight = Math.abs((normalizedValue / 128.0) * centerY - centerY);

      canvasContext.fillRect(x, centerY - barHeight, barWidth, barHeight * 2);
      x += barWidth + 1;
    }

    // Request the next animation frame
    animationFrameRef.current = requestAnimationFrame(drawWaveform);
  };

  useEffect(() => {
    drawWaveform();
    // Cleanup function to cancel the animation frame when the component unmounts
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [audioData, width, height, isRecording]);

  return (
    <div className="flex items-center justify-center w-full">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default AudioWaveForm;
