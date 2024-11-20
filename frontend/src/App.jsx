import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import LoginSignup from "./pages/LoginSignup"
import About from "./pages/About"
import Contact from "./pages/Contact"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App