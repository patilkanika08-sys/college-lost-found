import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import LostItem from "./pages/LostItem";
import FoundItem from "./pages/FoundItem";
import ProtectedRoute from "./components/ProtectedRoute";
import ClaimItem from "./pages/ClaimItem";
import GroqAI from "./components/GroqAI";
import GroqVision from "./pages/GroqVision";


function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard"element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        
        <Route path="/lost-item"element={<LostItem />} />  
        <Route path="/found-item"element={<FoundItem />} />
        <Route path="/claim-item"element={<ClaimItem />} />
       <Route path="/groq-ai"element={<GroqAI />} />
       <Route path="/groq-vision"element={<GroqVision />} />
        
           </Routes>
      

      <Footer />
    </>
  );
}

export default App;