// src/pages/Claims.jsx
import { useState } from "react";
import { mockClaims } from "../data/mockClaims";
import ClaimCard from "../components/ClaimCard";

export default function Claims() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  const filteredClaims = mockClaims
    .filter((claim) => {
      const matchQuery =
        claim.block.toString().includes(query) ||
        claim.id.toLowerCase().includes(query.toLowerCase());

      const matchStatus =
        statusFilter === "all" || claim.status === statusFilter;

      return matchQuery && matchStatus;
    })
    .sort((a, b) => (sortOrder === "asc" ? a.block - b.block : b.block - a.block));

  return (
    <div className="min-h-screen bg-[#0b0b0c] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Page Title + Description */}
        <h1 className="text-3xl font-bold text-white">Mirrored Claims</h1>
        <p className="text-sm text-gray-400 mb-6">
          View every mirrored block claim submitted via the Pi² VSL protocol.
        </p>

        {/* Search + Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by ID or block..."
            className="w-full p-3 text-sm bg-[#1a1a1c] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-3 text-sm bg-[#1a1a1c] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="all">All Statuses</option>
            <option value="verified">Verified</option>
            <option value="validating">Validating</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-3 text-sm bg-[#1a1a1c] text-white border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>

        {/* Total Count */}
        <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
          <span>Total Claims: {filteredClaims.length}</span>
        </div>

        {/* Claim Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredClaims.length > 0 ? (
            filteredClaims.map((claim) => (
              <ClaimCard key={claim.id} claim={claim} />
            ))
          ) : (
            /* Empty State */
            <div className="col-span-full text-center text-gray-500 py-10">
              <div className="text-4xl mb-2">🛰️</div>
              <p>No matching claims found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
