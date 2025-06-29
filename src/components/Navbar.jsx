import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { PiCubeDuotone } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [connected, setConnected] = useState(false);   // ➊ connection state

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Blocks", path: "/blocks" },
    { name: "Claims", path: "/claims" },
    { name: "About", path: "/about" },
  ];

  // ➋ common button JSX (re‑used for desktop & mobile)
  const ConnectButton = ({ className = "" }) => (
    <button
      onClick={() => setConnected(!connected)}
      className={`${connected
        ? "bg-green-500 hover:bg-green-400 text-white"
        : "bg-yellow-400 hover:bg-yellow-300 text-slate-900"}
        px-4 py-2 rounded-xl text-sm font-semibold transition ${className}`}
    >
      {connected ? "Connected" : "Connect Devnet"}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-slate-800 bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo with motion */}
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <PiCubeDuotone size={24} className="text-yellow-400" />
          </motion.div>
          Pi² Explorer
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition hover:text-yellow-400 ${
                  isActive ? "text-yellow-400" : "text-slate-300"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Devnet Button */}
          <ConnectButton className="ml-4" />   {/* ➌ desktop button */}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-slate-300 focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-slate-900 px-4 pb-4"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 text-sm font-medium transition hover:text-yellow-400 ${
                    isActive ? "text-yellow-400" : "text-slate-300"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Devnet Button for mobile */}
            <ConnectButton className="mt-4 w-full" />  {/* ➍ mobile button */}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
