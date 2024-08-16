import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ServiceCard from "./ServiceCard";
import { responsive } from "../config/responsive";
import { services } from "../config/services";


export const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <section className="skill2">
      <div className="slider">
      <h2>Services</h2>
      <span style={{'--i':1}}><img src="https://picsum.photos/200" alt="Slide1"/></span>
      <span style={{'--i':2}}><img src="https://picsum.photos/200" alt="Slide2"/></span>
      <span style={{'--i':3}}><img src="https://picsum.photos/200" alt="Slide3"/></span>
      <span style={{'--i':4}}><img src="https://picsum.photos/200" alt="Slide4"/></span>
      <span style={{'--i':5}}><img src="https://picsum.photos/200" alt="Slide5"/></span>
    </div>

      {/* <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Services</h2>
             
              <Carousel
                responsive={responsive}
                infinite={true}
                className="owl-carousel owl-theme skill-slider"
                afterChange={handleAfterChange}
              >
                {services.map((service, index) => {
                  const itemsVisible = responsive.desktop.items;
                  const middleIndex = getMiddleIndex(
                    services.length,
                    itemsVisible
                  );
                  const isMiddleItem =
                    index === (currentSlide + middleIndex) % services.length;

                  return (
                    <ServiceCard
                      key={index}
                      service={service}
                      isMiddleItem={isMiddleItem}
                    />
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div> */}
    </section>
  );
};
