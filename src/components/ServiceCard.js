import React from "react";
import { TypeAnimation } from "react-type-animation";

const ServiceCard = ({ service, isActive }) => {
  return (
    <div className="service-card">
      <img src={service.img} alt={service.title} />
      <h3>{service.title}</h3>
      {isActive && (
        <>
          <p>{service.description}</p>

          <h5>
            <TypeAnimation
              sequence={[...service.sequences.flatMap((seq) => [seq, 1000])]}
              speed={50}
              repeat={Infinity}
              className="font-bold italic"
            />
          </h5>
        </>
      )}
    </div>
  );
};

export default ServiceCard;
