import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import image from "../assets/image.png";
const Navigation = () => {
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="transparent"
        data-bs-theme="dark"
        fixed="top"
      >
        <Container>
          <Navbar.Brand>
            <Link to="/" className="nav-link">
              <img
                src={image}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="news"
              ></img>
              Trader's Newz
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Item>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/features" className="nav-link">
                Features
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
