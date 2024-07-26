import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Features } from "./pages/Features";
import { Contact } from "./pages/Contact";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./Components/Navigation";
import Footer from "./Components/Footer";
import Chart from "./Components/Chart";
import "./styles/styles.css";
function App() {
  return (
    <div className="app-div" style={{ paddingTop: "60px" }}>
      <Navigation />
      {/* <Chart /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
