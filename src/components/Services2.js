import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ServiceCard from "./ServiceCard";

export const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const services = [
    {
      title: "Animation",
      description:
        "Transform complex concepts into engaging animations that resonate with your audience.",
      sequences: [
        "character animation",
        "motion graphics",
        "2D & 3D animation",
        "explainer animations",
      ],
    },
    {
      title: "Product Visualization",
      description:
        "Transform your products into realistic 3D visuals that showcase every detail.",
      sequences: [
        "3D modelling",
        "product rendering",
        "interactive visualizations",
        "bespoke environments",
      ],
    },
    {
      title: "Branding",
      description:
        "From logos to packaging, we craft branding solutions that leave a lasting impression.",
      sequences: [
        "logo design",
        "graphic design",
        "packaging design",
        "social media post assets",
      ],
    },
    {
      title: "Web Development",
      description:
        "Build your online presence with custom web solutions tailored to your needs.",
      sequences: [
        "simple websites",
        "custom web solutions",
        "responsive design",
        "e-commerce",
      ],
    },
    {
      title: "Explainer Videos / Video Editing",
      description:
        "Communicate your message clearly with professional explainer videos and seamless editing.",
      sequences: [
        "video editing",
        "explainer videos",
        "post-production",
        "story-telling",
      ],
    },
  ];


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
