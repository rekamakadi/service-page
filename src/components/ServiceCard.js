import React, { useEffect, useRef, useState } from "react";

const ServiceCard = ({ service, isActive, onVideoEnd }) => {
  const videoRef = useRef(null);
  const delayTimeoutRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (isActive && video) {
      delayTimeoutRef.current = setTimeout(() => {
        video.play();
      }, 1300);
    } else if (video) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = setTimeout(() => {
        video.pause();
        video.currentTime = 0;
        setHovered(false);
      }, 400);
    }

    return () => {
      clearTimeout(delayTimeoutRef.current);
    };
  }, [isActive]);

  const handleMouseEnter = () => isActive && setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const cardStyle = {
    transform: hovered
      ? "translateY(-5px) scale(1.2)"
      : "translateY(0) scale(1)",
    boxShadow: hovered
      ? "0 20px 30px rgba(0, 0, 0, 0.4);"
      : "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.5s, box-shadow 0.5s",
    zIndex: hovered ? 100 : 1,
  };

  const descriptionStyle = {
    maxHeight: isActive ? "fit-content" : "0",
    maxWidth: isActive ? "fit-content" : "0",
    opacity: isActive ? 1 : 0,
    padding: isActive ? "10px" : "0",
    transition: "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out",
  };

  return (
    <div
      className={`service-card ${isActive ? "active" : ""}`}
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        className="service-video"
        ref={videoRef}
        src={service.vid}
        muted
        loop={false}
        onEnded={onVideoEnd}
        type="video/webm"
        width="350"
        height="250"
        controlsList="nodownload nofullscreen"
        fetchpriority="high"
        playsInline
      />
      <div className={`description`} style={descriptionStyle}>
        <p dangerouslySetInnerHTML={{ __html: service.description }} />
      </div>
    </div>
  );
};

export default ServiceCard;
