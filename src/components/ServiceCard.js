import React from "react";
import { TypeAnimation } from "react-type-animation";

const ServiceCard = ({ service, isMiddleItem }) => {
  return (
    <div className="item">
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      {isMiddleItem && (
        <h5>
          <TypeAnimation
            sequence={[...service.sequences.flatMap((seq) => [seq, 1000])]}
            speed={50}
            repeat={Infinity}
            className="font-bold italic"
          />
        </h5>
      )}
    </div>
  );
};

export default ServiceCard;
