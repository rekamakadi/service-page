import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { extend } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "three-stdlib";
import { ModelScene } from "./ModelScene.js";
import { TypeAnimation } from "react-type-animation";
import { Parallax } from "react-scroll-parallax";

extend({ OrbitControls, TransformControls });

export const Banner = () => {
  return (
    <section className="banner" id="home">
      {/* <Parallax y={[-30, 30]}>
        <img src={`${process.env.PUBLIC_URL}/sdv-LOGO-03.svg`} alt="Logo" />
      </Parallax> */}
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h1>{`Hey, we are 
                  Sphere Dice Visuals`}</h1>

                  <h2>
                    <TypeAnimation
                      sequence={[
                        "Animation",
                        1000,
                        "Branding",
                        1000,
                        "Product Visualization",
                        1000,
                        "Web Development",
                        1000,
                      ]}
                      speed={50}
                      repeat={Infinity}
                      className="font-bold italic"
                    />
                  </h2>
                  <br />
                  <p>
                  We specialize in bringing your digital dreams to life through stunning animations, captivating product visualizations, innovative branding, and web development. Our expertise extends to crafting engaging explainer videos, video editing, creating impactful social media assets, and much more.
                  </p>
                  <br />
                  <span className="tagline">
                    Your digital dreams, designed and delivered.
                  </span>
                  <a href="#connect" id="connect-arrow">
                    <button onClick={() => console.log("connect")}>
                      Let’s Connect <ArrowRightCircle size={25} />
                    </button>
                  </a>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                  style={{ height: "100vh" }}
                >
                  <ModelScene />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
