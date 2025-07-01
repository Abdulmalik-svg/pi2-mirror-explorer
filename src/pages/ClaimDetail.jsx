import { useParams, Link } from "react-router-dom";
import { mockClaims } from "../data/mockClaims";
import { motion } from "framer-motion";
import { PiArrowLeft } from "react-icons/pi";

export default function ClaimDetail() {
  const { id } = useParams();
  const claim = mockClaims.find((c) => c.id === id);

  if (!claim) {
    return (
      <main className="min-h-screen bg-slate-950 text-white px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Claim Not Found</h1>
        <Link to="/claims" className="text-yellow-400 hover:underline">
          ← Back to Claims
        </Link>
      </main>
    );
  }

  const blockLink = `https://etherscan.io/block/${claim.blockNumber}`;
  const relayerLink = claim.relayer
    ? `https://etherscan.io/address/${claim.relayer}`
    : null;

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          to="/claims"
          className="flex items-center text-sm text-yellow-400 mb-6 hover:underline"
        >
          <PiArrowLeft className="mr-2" />
          Back to Claims
        </Link>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-extrabold mb-6 text-yellow-400"
        >
          Claim Details
        </motion.h1>

        {/* Detail Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800 rounded-xl p-6 shadow space-y-4"
        >
          <Detail label="Claim ID" value={claim.id} />
          <Detail
            label="Block Number"
            value={
              <a
                href={blockLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                #{claim.blockNumber}
              </a>
            }
          />
          <Detail label="Status" value={<StatusBadge status={claim.status} />} />
          <Detail
            label="Relayer"
            value={
              relayerLink ? (
                <a
                  href={relayerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {claim.relayer}
                </a>
              ) : (
                "Unknown"
              )
            }
          />
          <Detail label="Timestamp" value={claim.timestamp || "N/A"} />
        </motion.div>
      </div>
    </main>
  );
}

// Reusable Detail row
function Detail({ label, value }) {
  return (
    <div className="flex justify-between border-b border-slate-700 py-2">
      <span className="text-slate-400">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}

// Status Badge with color
function StatusBadge({ status }) {
  const base = "px-3 py-1 rounded-full text-xs font-semibold capitalize";
  const colorMap = {
    verified: "bg-green-500/20 text-green-400",
    validating: "bg-yellow-500/20 text-yellow-300",
    failed: "bg-red-500/20 text-red-400",
    default: "bg-slate-600/30 text-white",
  };

  return (
    <span className={`${base} ${colorMap[status] || colorMap.default}`}>
      {status}
    </span>
  );
}
