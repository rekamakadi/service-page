// import meter1 from "../assets/img/meter1.svg";
// import meter2 from "../assets/img/meter2.svg";
// import meter3 from "../assets/img/meter3.svg";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { TypeAnimation } from "react-type-animation";

// import arrow1 from "../assets/img/arrow1.svg";
// import arrow2 from "../assets/img/arrow2.svg";
// import colorSharp from "../assets/img/color-sharp.png"

export const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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

  const handleAfterChange = (previousSlide, { currentSlide }) => {
    setCurrentSlide(currentSlide);
  };

  const getMiddleIndex = (totalItems, itemsVisible) => {
    return Math.floor(itemsVisible / 2);
  };

  return (
    <section className="skill" id="services">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Services</h2>
              <p>
                {/* Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.<br></br> Lorem Ipsum has been the industry's standard
                dummy text. */}
              </p>
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
                    <div className="item" key={index}>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      {isMiddleItem && (
                        <h5>
                          <TypeAnimation
                            sequence={[
                              ...service.sequences.flatMap((seq) => [
                                seq,
                                1000,
                              ]),
                            ]}
                            speed={50}
                            repeat={Infinity}
                            className="font-bold italic"
                          />
                        </h5>
                      )}
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      {/* <img className="background-image-left" src={''} alt="Image" /> */}
    </section>
  );
};
