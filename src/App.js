import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Features } from "./pages/Features";
import { Contact } from "./pages/Contact";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "./assets/image.png";
import "./styles/styles.css";
function App() {
  return (
    <div className="app-div" style={{ paddingTop: "60px" }}>
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <footer className="footer">
        <div className="container" fixed="bottom">
          <p>&copy; Trader's Newz.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
