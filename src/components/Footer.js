import { Container, Row, Col } from "react-bootstrap";
// import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6}>
            <img src={""} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a
                href="https://www.linkedin.com/in/zsolt-alfred-molnar-baka/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon1} alt="linkedin icon" />
              </a>
              <a
                href="https://www.facebook.com/zsoltalfred.molnarbaka"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon2} alt="facebook icon" />
              </a>
              <a
                href="https://www.instagram.com/_.chikenfield._/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon3} alt="instagram icon" />
              </a>
            </div>
            <p>Copyright 2024. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
