/*
we have a <VideoPlayer> component that includes a playback speed control. Unfortunately, it doesn't work!

For context, here's how we can affect the playback speed of a <video> element in vanilla JavaScript:

const videoElement = document.querySelector('#some-video');
videoElement.playbackRate = 2; // Play at 2x speed
Acceptance Criteria:

When the user changes the "Playback speed" control and then plays the corresponding video, that video should play at the selected speed.
You should use the useRef hook to capture a ref to the <video> element.

*/
import React, { useRef } from "react";

function VideoPlayer({ src, caption }) {
  const playbackRateSelectId = React.useId();
  const videoRef = useRef(); // initial value {current:undefined} -> when i provide video <video controls src={src} ref={videoRef} /> -> {current:<video>}

  return (
    <div className="video-player">
      <figure>
        <video controls src={src} ref={videoRef} />
        <figcaption>{caption}</figcaption>
      </figure>

      <div className="actions">
        <label htmlFor={playbackRateSelectId}>Select playback speed:</label>
        <select
          id={playbackRateSelectId}
          defaultValue="1"
          onChange={(event) => {
            videoRef.current.playbackRate = event.target.value;
          }}
        >
          <option value="0.5">0.5</option>
          <option value="1">1</option>
          <option value="1.25">1.25</option>
          <option value="1.5">1.5</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
    </div>
  );
}
