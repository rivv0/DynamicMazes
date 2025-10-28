import React, { useRef, useEffect } from 'react';

const IntroVideo = ({ onVideoEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', onVideoEnd);
      return () => video.removeEventListener('ended', onVideoEnd);
    }
  }, [onVideoEnd]);

  return (
    <div className="video-container">
      <video 
        ref={videoRef}
        src="/videos/intro.mp4"
        autoPlay
        muted
        className="fullscreen-video"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default IntroVideo;