import { useRef, useImperativeHandle, forwardRef, useEffect } from "react";
import AchievementSound from '../assets/sounds/achievement-sparkle.wav';

interface SoundPlayerProps {
  src: string;
  volume?: number; // Volym mellan 0.0 och 1.0
}

export interface SoundPlayerHandle {
  play: (soundType: 'flip' | 'achievement') => void; // Definiera play med ett argument
}

export const SoundPlayer = forwardRef<SoundPlayerHandle, SoundPlayerProps>(({ src, volume = 1.0 }: SoundPlayerProps, ref) => {
  const flipRef = useRef<HTMLAudioElement | null>(null); // Kortflippningsljudet
  const achievementRef = useRef<HTMLAudioElement | null>(null); // Achievement-ljudet

  useEffect(() => {
    if (flipRef.current) {
      flipRef.current.volume = volume;
    }
    if (achievementRef.current) {
      achievementRef.current.volume = volume;
    }
  }, [volume]);

  useImperativeHandle(ref, () => ({
    play: (soundType: 'flip' | 'achievement') => {
      if (soundType === 'flip' && flipRef.current) {
        if (!flipRef.current.paused) {
          flipRef.current.pause();
          flipRef.current.currentTime = 0;
        }
        flipRef.current.play();
      }

      if (soundType === 'achievement' && achievementRef.current) {
        if (!achievementRef.current.paused) {
          achievementRef.current.pause();
          achievementRef.current.currentTime = 0;
        }
        achievementRef.current.play();
      }
    },
  }));

  return (
    <>
      <audio ref={flipRef} src={src} />
      <audio ref={achievementRef} src={AchievementSound} />
    </>
  );
});