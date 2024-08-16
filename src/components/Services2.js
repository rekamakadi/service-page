import { useState } from "react";
import ServiceCard from "./ServiceCard";
import { responsive } from "../config/responsive";
import { services } from "../config/services";

export const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
    <h2 className="text-align:center">Services</h2>
    <section className="skill">
      
      <div className="slider">
        
        <div className="carousel">
          {services.map((service, index) => {
            return (
              <span
                className={`slider-span ${isActive ? "active" : ""}`}
                style={{ "--i": index }}
                key={index}
              >
                <ServiceCard service={service} isActive={isActive} />
              </span>
            );
          })}
        </div>
      </div>
    </section></>
  );
};
