/*
Let's build a media player!

The UI is ready, and we've loaded an audio file using an <audio> tag. Our job now is to capture a reference to that element, and to trigger it when the user clicks the play/pause button.

For context, here's how we'd solve this problem in vanilla JS:

const audioElement = document.querySelector('#some-audio-elem');

/Start playing the song:
audioElement.play();

/ Stop playing it:
audioElement.pause();

Acceptance Criteria:

Clicking the “Play” button should start playing the song.
Clicking the button again should pause the song.
By default, we should render a <Play> icon inside the button, but it should flip to a <Pause> icon while the song is playing.

*/
import React from "react";
import { Play, Pause } from "react-feather";

import VisuallyHidden from "./VisuallyHidden";

function MediaPlayer({ src }) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  // { current: undefined }
  const audioRef = React.useRef();

  return (
    <div className="wrapper">
      <div className="media-player">
        <img
          alt=""
          src="https://sandpack-bundler.vercel.app/img/take-it-easy.png"
        />
        <div className="summary">
          <h2>Take It Easy</h2>
          <p>Bvrnout ft. Mia Vaile</p>
        </div>
        <button
          onClick={() => {
            if (isPlaying) {
              audioRef.current.pause();
            } else {
              audioRef.current.play();
            }

            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying ? <Pause /> : <Play />}
          <VisuallyHidden>Toggle playing</VisuallyHidden>
        </button>

        <audio
          ref={audioRef}
          src={src}
          onEnded={() => {
            setIsPlaying(false);
          }}
        />
      </div>
    </div>
  );
}

export default MediaPlayer;
