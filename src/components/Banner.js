import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { CanvasForObjectToMove } from "./CanvasForObjectToMove.js";
import { TypeAnimation } from "react-type-animation";

export const Banner = () => {
  return (
    <section className="banner" id="home">
      <Container>
      <img src={`${process.env.PUBLIC_URL}/sdv-LOGO-03.svg`} alt="Logo" className="aligh-items-center" />
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline">
                    Your digital dreams, designed and delivered.
                  </span>
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
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <a href="#connect">
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
                  style={{ width: "100%", height: "100%" }}
                >
                  <CanvasForObjectToMove objectName="cube" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
