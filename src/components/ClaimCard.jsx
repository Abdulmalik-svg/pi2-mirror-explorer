import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

export default function ClaimCard({ claim }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(claim.id);
  };

  const statusColor = {
    verified: "bg-green-700/20 text-green-400 border border-green-700",
    validating: "bg-yellow-700/20 text-yellow-300 border border-yellow-700",
    failed: "bg-red-700/20 text-red-400 border border-red-700",
  }[claim.status] || "bg-gray-700/20 text-gray-400 border border-gray-700";

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      className="bg-[#111213] border border-gray-800 rounded-2xl p-5 shadow hover:shadow-lg transition-all duration-200"
    >
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-gray-500">Block #{claim.block}</div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor}`}>
          {claim.status}
        </span>
      </div>

      <div className="text-sm font-semibold text-gray-200 truncate mb-1">
        ID: {claim.id}
      </div>

      <div className="text-xs text-gray-400 mb-1">
        Relayer: <span className="text-gray-300">{claim.relayer.slice(0, 6)}...{claim.relayer.slice(-4)}</span>
      </div>

      <div className="text-xs text-gray-500 mb-3">
        {new Date(claim.timestamp).toLocaleString()}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleCopy}
          className="text-xs text-blue-400 hover:text-blue-300 transition"
        >
          Copy ID
        </button>

        <Link
          to={`/claims/${claim.id}`}
          className="text-xs text-gray-400 hover:text-blue-400 transition"
        >
          View →
        </Link>
      </div>
    </motion.div>
  );
}