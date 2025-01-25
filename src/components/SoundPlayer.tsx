import { useRef, forwardRef, useImperativeHandle } from "react";

interface SoundPlayerProps {
  src: string;
}


export const SoundPlayer = forwardRef<{ play: () => void }, SoundPlayerProps>(({ src }, ref) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useImperativeHandle(ref, () => ({
    play() {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    },
  }));

  return <audio ref={audioRef} src={src} />;
});