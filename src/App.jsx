import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ClaimDetail from "./pages/ClaimDetail";
import BlockDetail from "./pages/BlockDetail";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Blocks from "./pages/Blocks";
import Claims from "./pages/Claims"; 

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/claims/:id" element={<ClaimDetail />} /> {/* ✅ Keep only this */}
          <Route path="/blocks/:blockNumber" element={<BlockDetail />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </BrowserRouter>
  );
}
