import { useEffect, useState, useRef } from "react";
import { BiVolumeMute, BiVolumeFull } from "react-icons/bi";

export const AudioControl = ({ timeFactor = 1 }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 1 / timeFactor;
      audioRef.current.preservesPitch = false;
    }
  }, [timeFactor]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      paused ? audioRef.current.play() : audioRef.current.pause();
      setPaused(!paused);
    }
  };

  return (
    <div className="mt-4 flex items-center gap-x-4 text-xl">
      <button
        className={`flex w-24 items-center justify-center gap-2 rounded border-2 p-2 text-xl hover:bg-white hover:text-black ${paused ? "text-white/75" : ""}`}
        onClick={handlePlayPause}
      >
        {paused ? "OFF" : "ON"}
        <audio ref={audioRef} loop>
          <source src="/clockSound.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        {paused ? <BiVolumeMute /> : <BiVolumeFull />}
      </button>
    </div>
  );
};

export default AudioControl;
