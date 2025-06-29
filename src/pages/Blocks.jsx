import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clipboard } from "lucide-react";
import { mockBlocks } from "../data/mockBlocks";

export default function Blocks() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  // search / sort / filter
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("all");

  // ───── fetch from API, fall back to mock ─────
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://api.example.com/blocks");
        if (!res.ok) throw new Error("API down");
        const data = await res.json();
        setBlocks(data);
      } catch {
        console.warn("Using mockBlocks fallback");
        setBlocks(mockBlocks);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ───── derived list ─────
  const filtered = blocks
    .filter((b) => {
      const q = query.toLowerCase();
      const matchQ =
        b.blockNumber.toString().includes(q) ||
        b.relayer.toLowerCase().includes(q);
      const matchS = statusFilter === "all" || b.status === statusFilter;
      return matchQ && matchS;
    })
    .sort((a, b) =>
      sortOrder === "asc" ? a.blockNumber - b.blockNumber : b.blockNumber - a.blockNumber
    );

  // ───── helpers ─────
  const copy = (text) => navigator.clipboard.writeText(text);

  const statusColor = (s) =>
    ({ verified: "text-green-400", validating: "text-yellow-300", failed: "text-red-400" }[s] ||
    "text-gray-400");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0b0b0c] text-white px-4 py-10"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🧱 All Mirrored Blocks</h1>

        {/* controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            className="w-full p-3 bg-[#1a1a1c] text-sm text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-600"
            placeholder="Search block or relayer…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="w-full p-3 bg-[#1a1a1c] text-sm text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-600"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="verified">Verified</option>
            <option value="validating">Validating</option>
            <option value="failed">Failed</option>
          </select>
          <select
            className="w-full p-3 bg-[#1a1a1c] text-sm text-white border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-600"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading blocks…</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500">No blocks match your filters.</p>
        ) : (
          <ul className="space-y-4">
            {filtered.map((b) => (
              <motion.li
                key={b.blockNumber}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-[#1a1a1c] p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="text-xl font-semibold flex items-center gap-2">
                      Block #{b.blockNumber}
                      <button onClick={() => copy(b.blockNumber)} title="Copy block number">
                        <Clipboard size={14} />
                      </button>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {new Date(b.timestamp).toLocaleString()}
                    </div>

                    <div className="text-xs mt-1 text-gray-500 flex items-center gap-1">
                      Relayer:
                      <span className="text-blue-400 flex items-center gap-1">
                        {b.relayer.slice(0, 6)}…{b.relayer.slice(-4)}
                        <button onClick={() => copy(b.relayer)} title="Copy relayer">
                          <Clipboard size={12} />
                        </button>
                      </span>
                    </div>

                    <div className="text-xs mt-1 text-gray-500 flex items-center gap-1">
                      Hash:
                      <span className="text-gray-400 flex items-center gap-1">
                        {b.blockHash.slice(0, 8)}…{b.blockHash.slice(-4)}
                        <button onClick={() => copy(b.blockHash)} title="Copy hash">
                          <Clipboard size={12} />
                        </button>
                      </span>
                    </div>

                    <div className="text-xs text-gray-500">
                      Gas Used: <span className="text-gray-300">{b.gasUsed.toLocaleString()}</span>
                    </div>

                    <div className={`text-xs mt-1 font-medium ${statusColor(b.status)}`}>
                      {b.status}
                    </div>
                  </div>

                  <Link
                    to={`/blocks/${b.blockNumber}`}
                    className="text-blue-400 hover:underline text-sm whitespace-nowrap"
                  >
                    View →
                  </Link>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
