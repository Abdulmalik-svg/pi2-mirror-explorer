import { useState } from "react";
import { mockClaims } from "../data/mockClaims";
import ClaimCard from "../components/ClaimCard";
import { motion } from "framer-motion";

export default function Home() {
  const [connected, setConnected] = useState(false);

  const connectToDevnet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnected(true);
      } else {
        alert("Please install MetaMask to connect.");
      }
    } catch (err) {
      console.error(err);
      alert("Connection failed – see console.");
    }
  };

  return (
    <main className="text-white bg-[#0b0b0c]">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-700 via-violet-800 to-blue-900 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Explore the Pi² Devnet
        </motion.h1>
        <p className="text-lg max-w-2xl mx-auto mb-6 text-indigo-100">
          Mirror Ethereum blocks and discover claim proofs on the Pi² VSL
        </p>
        <button
          onClick={connectToDevnet}
          className="bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 font-semibold rounded-xl transition"
        >
          {connected ? "Connected!" : "Connect to Devnet"}
        </button>
      </section>

      {/* Stats */}
      <section className="bg-[#111214] py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <StatBox label="Total Claims" value="1,204" />
          <StatBox label="Mirrored Blocks" value="325" />
          <StatBox label="Active Relayers" value="6" />
        </div>
      </section>

      {/* Quick Start */}
      <section className="bg-[#15161a] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12"
          >
            Quick Start with Pi² Devnet
          </motion.h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 text-left">
            <StepCard
              number="1"
              title="Run a Local Devnet"
              description="Spin up your Pi² devnet locally using the CLI to simulate block claims."
            />
            <StepCard
              number="2"
              title="Mirror Ethereum Blocks"
              description="Start mirroring real Ethereum blocks and generating proofs."
            />
            <StepCard
              number="3"
              title="Explore Mirror Claims"
              description="Use this explorer to inspect verified claims and debug submissions."
            />
          </div>
        </div>
      </section>

      {/* Latest Claims */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center text-3xl font-extrabold tracking-tight"
        >
          Latest Pi² Mirror Claims
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockClaims.map((c) => (
            <ClaimCard key={c.id} claim={c} />
          ))}
        </div>
      </section>
    </main>
  );
}

/* ───────── helpers ───────── */

function StatBox({ label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1a1b1f] rounded-xl py-6 px-4 text-center shadow border border-[#24262b]"
    >
      <div className="text-3xl font-bold text-blue-400">{value}</div>
      <div className="mt-2 text-sm text-gray-400">{label}</div>
    </motion.div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1a1b1f] p-6 rounded-xl border border-[#24262b] shadow hover:shadow-lg transition"
    >
      <div className="flex items-center mb-4">
        <div className="text-2xl font-bold text-yellow-400 mr-3">#{number}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
