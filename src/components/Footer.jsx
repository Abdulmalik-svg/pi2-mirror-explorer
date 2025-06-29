import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0b0c] text-gray-400 border-t border-gray-800 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* LEFT: Brand */}
        <div className="space-y-2">
          <h2 className="text-white text-xl font-bold">Pi² Mirror Explorer</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Explore mirrored blocks and cryptographic claims on the Pi² Network. Designed for transparency and reliability.
          </p>
        </div>

        {/* CENTER: Navigation */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/blocks" className="hover:text-blue-400 transition">Blocks</Link></li>
            <li><Link to="/claims" className="hover:text-blue-400 transition">Claims</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition">About</Link></li>
            <li><a href="https://docs.pi2.network" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Docs</a></li>
          </ul>
        </div>

        {/* RIGHT: Contact / Placeholder */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4">Contact</h3>
          <p className="text-sm mb-2">Questions or suggestions?</p>
          <p className="text-sm text-blue-400">contact@pi2explorer.io</p>
        </div>
      </div>

      {/* BOTTOM: Legal + Attribution */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-xs text-gray-500">
        &copy; {year} Pi² Mirror Explorer. Built by <span className="text-white">YourName</span>. All rights reserved.
      </div>
    </footer>
  );
}
