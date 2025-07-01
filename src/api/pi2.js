const API_URL = "https://rpc.vsl.pi2.network/";

/**
 * Generic JSON-RPC call to Pi² devnet
 * @param {string} method - The JSON-RPC method name
 * @param {Array<any>} paramsArray - Parameters as an array
 * @returns {Promise<any>} - The result from the RPC response
 */
export async function pi2Rpc(method, paramsArray = []) {
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method,
    params: paramsArray,
  };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await response.json();

  if (json.error) {
    throw new Error(json.error.message || "RPC Error");
  }

  return json.result;
}
