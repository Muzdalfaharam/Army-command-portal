import React, { useEffect, useRef } from 'react';
import './SoftBackground.css';

const SoftBackground = () => {
  const videoRef = useRef(null);
  
  // Online soft background videos (professional, calm)
  const videoSources = [
    'https://cdn.pixabay.com/video/2021/10/15/93459-633263578_large.mp4',
    'https://cdn.pixabay.com/video/2023/06/06/169174-831725661_large.mp4',
    'https://cdn.pixabay.com/video/2022/11/22/141072-776392985_large.mp4',
    'https://cdn.pixabay.com/video/2020/10/06/51514-464140685_large.mp4'
  ];
  
  // Static fallback images if video doesn't load
  const imageSources = [
    'https://images.pexels.com/photos/210182/pexels-photo-210182.jpeg',
    'https://images.pexels.com/photos/814544/pexels-photo-814544.jpeg',
    'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg'
  ];

  useEffect(() => {
    const randomVideo = videoSources[Math.floor(Math.random() * videoSources.length)];
    if (videoRef.current) {
      videoRef.current.src = randomVideo;
    }
  }, []);

  return (
    <div className="soft-background">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="bg-video"
        poster={imageSources[0]}
      >
        <source src={videoSources[0]} type="video/mp4" />
      </video>
      <div className="bg-overlay"></div>
      <div className="bg-gradient-overlay"></div>
      
      {/* Floating particles effect */}
      <div className="particles-container">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              opacity: 0.1 + Math.random() * 0.3
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SoftBackground;