import { useParams, Link } from "react-router-dom";
import { Clipboard } from "lucide-react";
import { mockBlocks } from "../data/mockBlocks";

export default function BlockDetail() {
  const { blockNumber } = useParams();

  const block = mockBlocks.find(
    (b) => b.blockNumber === Number(blockNumber)
  );

  const copy = (value) => navigator.clipboard.writeText(value);

  if (!block) {
    return (
      <div className="min-h-screen bg-[#0b0b0c] text-center py-20 text-white">
        <h2 className="text-xl">Block not found 🚫</h2>
        <Link to="/" className="text-blue-400 hover:underline">Back to Home</Link>
      </div>
    );
  }

  const statusColor = {
    verified: "text-green-400",
    validating: "text-yellow-300",
    failed: "text-red-400",
  }[block.status] || "text-gray-400";

  return (
    <div className="min-h-screen bg-[#0b0b0c] px-4 py-10 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">
          Block #{block.blockNumber}
        </h1>

        <div className="bg-[#1a1a1c] rounded-xl p-5 border border-gray-700 space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Status:</span>
            <span className={`text-sm font-medium ${statusColor}`}>
              {block.status}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Timestamp:</span>
            <span className="text-sm">
              {new Date(block.timestamp).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Relayer:</span>
            <span className="text-sm text-blue-400 flex items-center gap-1">
              {block.relayer.slice(0, 6)}...{block.relayer.slice(-4)}
              <button onClick={() => copy(block.relayer)} title="Copy relayer">
                <Clipboard size={14} />
              </button>
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Block Hash:</span>
            <span className="text-sm text-gray-300 flex items-center gap-1">
              {block.blockHash.slice(0, 10)}...{block.blockHash.slice(-6)}
              <button onClick={() => copy(block.blockHash)} title="Copy hash">
                <Clipboard size={14} />
              </button>
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-sm text-gray-400">Gas Used:</span>
            <span className="text-sm text-gray-300">
              {block.gasUsed.toLocaleString()}
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Claims in this Block</h2>
          {block.claims.length > 0 ? (
            <ul className="space-y-3">
              {block.claims.map((claim) => (
                <li
                  key={claim.id}
                  className="bg-[#1a1a1c] p-4 rounded-xl border border-gray-700 flex items-center justify-between"
                >
                  <div className="text-sm">
                    <div className="text-gray-300">Claim ID: {claim.id}</div>
                    <div className="text-gray-500 text-xs">
                      Relayer: {claim.relayer.slice(0, 6)}...{claim.relayer.slice(-4)}
                    </div>
                  </div>
                  <Link
                    to={`/claims/${claim.id}`}
                    className="text-blue-400 text-sm hover:underline"
                  >
                    View →
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No claims found for this block.</p>
          )}
        </div>
      </div>
    </div>
  );
}
