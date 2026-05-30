import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

type Props = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * Click-to-play preview. Shows the poster frame with a play button; on click it
 * loads + plays the video (muted, looping) and reveals native controls. Nothing
 * downloads the full video until the user opts in, keeping the page light.
 */
const WebVideo = ({ src, poster, className }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => {});
    setStarted(true);
  };

  return (
    <div className="relative h-full w-full">
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        controls={started}
        className={`${className ?? ''} ${started ? '' : 'transition-transform duration-500 group-hover:scale-[1.03]'}`}
      />
      {!started && (
        <button
          type="button"
          onClick={play}
          aria-label="Play preview"
          className="absolute inset-0 flex items-center justify-center bg-foreground/10 transition-colors hover:bg-foreground/20"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform group-hover:scale-110">
            <Play className="h-6 w-6 translate-x-0.5 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
};

export default WebVideo;
