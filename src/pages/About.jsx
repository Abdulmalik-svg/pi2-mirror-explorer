import { motion } from "framer-motion";
import { useState } from "react";
import {
  PiPulse,
  PiCubeFocus,
  PiLinkSimple,
  PiUserCircle,
} from "react-icons/pi";

export default function About() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-white bg-slate-950 min-h-screen"
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-900 py-20 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4"
        >
          About Pi² Mirror Explorer
        </motion.h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-300">
          A visual explorer for mirrored Ethereum block claims, built on top of the Pi² Devnet.
          This tool helps users inspect, verify, and track proofs submitted to the VSL (Verifiable State Layer).
        </p>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid gap-12 md:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
            className="bg-slate-800 rounded-2xl p-6 shadow hover:shadow-lg transition"
          >
            <f.icon className="text-yellow-400 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-sm text-slate-300">{f.text}</p>
          </motion.div>
        ))}
      </section>

      {/* Contributors */}
      <section className="bg-slate-900 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Contributors</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <ContributorCard name="Abdulmalik Badmus" role="Frontend Developer" />
          {/* Add more contributors as needed */}
        </div>
      </section>

      {/* Quick Start CLI Guide */}
      <section className="bg-slate-950 py-16 px-4 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-center text-yellow-400"
          >
            ⚡ Quick Start (CLI Setup)
          </motion.h2>

          <div className="space-y-6">
            <Step
              title="1. Install the Devnet CLI"
              code="npm install -g @pi2/devnet"
              icon={<PiCubeFocus size={24} className="text-yellow-400" />}
            />
            <Step
              title="2. Initialize the Devnet"
              code="pi2 devnet init"
              icon={<PiLinkSimple size={24} className="text-yellow-400" />}
            />
            <Step
              title="3. Start the Local Node"
              code="pi2 devnet start"
              icon={<PiPulse size={24} className="text-yellow-400" />}
            />
            <Step
              title="4. Explore in Browser"
              code="Visit http://localhost:8545"
              icon={<PiUserCircle size={24} className="text-yellow-400" />}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 bg-gradient-to-b from-slate-900 to-black px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Ready to Explore the Devnet?
        </motion.h2>
        <p className="text-slate-400 mb-6">
          Browse mirrored claims and dive into Pi²’s Verifiable State Layer.
        </p>
        <a
          href="/claims"
          className="inline-block bg-yellow-400 text-slate-900 font-semibold px-6 py-3 rounded-xl hover:bg-yellow-300 transition"
        >
          View Claims
        </a>
      </section>
    </motion.main>
  );
}

// 🔧 Features List
const features = [
  {
    title: "Ethereum Block Mirror",
    text: "Monitor blocks from Ethereum as they’re mirrored into the Pi² Devnet.",
    icon: PiCubeFocus,
  },
  {
    title: "Proof Explorer",
    text: "View and verify proof-of-claim data linked to block activity.",
    icon: PiLinkSimple,
  },
  {
    title: "Live Devnet Activity",
    text: "See active relayers, claim counts, and real-time mirroring stats.",
    icon: PiPulse,
  },
];

// 🧱 Contributor Card
function ContributorCard({ name, role }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-slate-800 rounded-xl p-6 w-64 text-left shadow"
    >
      <PiUserCircle size={40} className="text-yellow-400 mb-2" />
      <h4 className="text-lg font-semibold text-white">{name}</h4>
      <p className="text-sm text-slate-400">{role}</p>
    </motion.div>
  );
}

// 📋 CLI Step Component with Copy Button
function Step({ title, code, icon }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-slate-800 rounded-xl p-6 shadow-md relative"
    >
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>

      <pre className="bg-slate-900 text-yellow-400 p-4 rounded-md text-sm overflow-x-auto relative">
        <code>{code}</code>
        {!code.startsWith("Visit") && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-white text-xs px-2 py-1 rounded-md"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </pre>
    </motion.div>
  );
}
