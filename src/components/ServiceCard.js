import React, { useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";

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
    }
  }, [isActive]);

  return (
    <div
      className={`service-card ${isActive ? "active" : ""}`}
    >
      {/* <img class="service-img" src={service.img} alt={service.title} /> */}
      <video
        className="service-video"
        ref={videoRef}
        src={service.vid}
        muted
        loop={false}
        onEnded={onVideoEnd}
      />
      {/* <h3>{service.title}</h3> */}
      {isActive && (
        <>
          <p>{service.description}</p>

          {/* <h5>
            <TypeAnimation
              sequence={[...service.sequences.flatMap((seq) => [seq, 1000])]}
              speed={50}
              repeat={Infinity}
              className="font-bold italic"
            />
          </h5> */}
        </>
      )}
    </div>
  );
};

export default ServiceCard;
