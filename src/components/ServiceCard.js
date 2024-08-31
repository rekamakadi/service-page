import React, { useEffect, useRef } from "react";

const ServiceCard = ({ service, isActive, onVideoEnd }) => {
  const videoRef = useRef(null);
  const delayTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (isActive && video) {
      delayTimeoutRef.current = setTimeout(() => {
        video.play();
      }, 1000);
    } else if (video) {
      clearTimeout(delayTimeoutRef.current);
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      clearTimeout(delayTimeoutRef.current);
    };
  }, [isActive]);

  return (
    <div className={`service-card ${isActive ? "active" : ""}`}>
      <video
        className="service-video"
        ref={videoRef}
        src={service.vid}
        muted
        loop={false}
        onEnded={onVideoEnd}
      />
      <div className={`description ${isActive ? "open" : ""}`}>
        <p>{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
