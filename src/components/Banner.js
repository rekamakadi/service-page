import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "animate.css";
import TrackVisibility from "react-on-screen";
import { extend } from "@react-three/fiber";
import { OrbitControls, TransformControls } from "three-stdlib";
import { ModelScene } from "./ModelScene.js";
import { TypeAnimation } from "react-type-animation";

extend({ OrbitControls, TransformControls });

export const Banner = React.memo(() => {
  return (
    <section className="banner" id="home">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/sdv-LOGO-03.svg`}
          alt="Logo"
          style={{ height: "40vh", width: "auto" }}
        />
      </div>
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={6} className="d-flex align-items-center">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h1 className="greeting">Welcome, We are</h1>
                  <h1>Sphere Dice Visuals</h1>
                  <br />
                  <span className="tagline">
                    <h4>Your digital dreams, designed and delivered.</h4>
                  </span>
                  <br />
                  <h3>
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
                  </h3>
                  <br />
                  <p className="d-none d-lg-block">
                    We specialize in bringing your digital dreams to life
                    through stunning animations, captivating product
                    visualizations, innovative branding, and web development.
                    {/* Our expertise extends to crafting engaging explainer videos,
                    video editing, creating impactful social media assets, and
                    much more. */}
                  </p>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={6} className="d-flex align-items-center">
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
          <Col xs={12} className="d-lg-none">
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <p>
                    We specialize in bringing your digital dreams to life
                    through stunning animations, captivating product
                    visualizations, innovative branding, and web development.
                    {/* Our expertise extends to crafting engaging explainer videos, video editing, creating impactful social media assets, and much more.*/}
                  </p>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
