export const mockBlocks = [
    {
      blockNumber: 1024,
      blockHash: "0xAAAABBBBCCCDDDEEE",
      gasUsed: 938472,
      timestamp: "2025-06-28T12:00:00Z",
      relayer: "0xABC1234567890DEF",
      status: "verified",
      claims: [
        { id: "0x1a2b", status: "verified", relayer: "0xABC1234567890DEF" },
        { id: "0x3c4d", status: "validating", relayer: "0xABC1234567890DEF" }
      ]
    },
    {
      blockNumber: 1025,
      blockHash: "0x1111222233334444",
      gasUsed: 752001,
      timestamp: "2025-06-27T15:30:00Z",
      relayer: "0xFEDCBA9876543210",
      status: "failed",
      claims: [
        { id: "0x5e6f", status: "failed", relayer: "0xFEDCBA9876543210" }
      ]
    }
  ];
  