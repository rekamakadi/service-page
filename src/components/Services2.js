import { useState, useEffect, useRef } from "react";
import ServiceCard from "./ServiceCard";
import { services } from "../config/services";

export const Services = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(null);
  const autoRotateInterval = useRef(null);
  const totalCards = services.length;
  const anglePerCard = 360 / totalCards;

  // Automatic rotation
  const startAutoRotate = () => {
    if (!autoRotateInterval.current) {
      autoRotateInterval.current = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          return nextIndex >= totalCards ? 0 : nextIndex;
        });
        setRotation((prev) => prev - anglePerCard);
      });
    }
  };

  const stopAutoRotate = () => {
    clearInterval(autoRotateInterval.current);
    autoRotateInterval.current = null;
  };

  useEffect(() => {
    if (activeIndex === null && !isDragging) {
      setActiveIndex(0);
      startAutoRotate();
    }
    return () => stopAutoRotate();
  }, [activeIndex, isDragging]);

  const rotateOnShortestPath = (index) => {
    setActiveIndex(index);
    const targetRotation = -index * anglePerCard;
    setRotation(targetRotation);
    stopAutoRotate();
  };

  const handleVideoEnd = (index) => {
    if (index === totalCards - 1) {
      setActiveIndex(0);
      setRotation((prev) => prev - anglePerCard);
    } else {
      setActiveIndex(index + 1);
      setRotation((prev) => prev - anglePerCard);
    }
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
    stopAutoRotate();
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches[0].clientX;
    const moveBy = (startX - currentX) * -0.4;
    setRotation((prevRotation) => prevRotation + moveBy);
    setStartX(currentX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const snappedIndex = Math.round(rotation / -anglePerCard) % totalCards;
    const correctedIndex = (snappedIndex + totalCards) % totalCards;
    setActiveIndex(correctedIndex);
    const newRotation = -correctedIndex * anglePerCard;
    setRotation(newRotation);
    startAutoRotate();
  };

  return (
    <div className="skill-container">
      <h2 className="text-align:center">Services</h2>
      <section
        id="services"
        className="skill"
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onMouseMove={handleDragMove}
        onTouchMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchEnd={handleDragEnd}
      >
        <div
          className={`slider ${isDragging ? "dragging" : ""}`}
          style={{
            transform: `perspective(1000px) rotateY(${rotation}deg)`,
            transition: isDragging ? "none" : "transform 0.8s ease-in-out",
          }}
        >
          <div className="carousel">
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              const angle = index * anglePerCard;
              const transformStyle = {
                transform: `rotateY(${angle}deg) translateZ(400px)`,
                transition: isDragging ? "none" : "transform 0.6s ease",
                zIndex: isActive ? 100 : "auto",
              };

              return (
                <span
                  className={`slider-span ${isActive ? "active" : ""}`}
                  style={transformStyle}
                  key={index}
                  onClick={() => rotateOnShortestPath(index)}
                >
                  <ServiceCard
                    service={service}
                    isActive={isActive}
                    onVideoEnd={() => handleVideoEnd(index)}
                  />
                </span>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
