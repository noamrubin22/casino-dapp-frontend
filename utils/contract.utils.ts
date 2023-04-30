export const getTokenAmount = async (
  walletAddress: `0x${string}` | undefined
) => {
  const response = await fetch(
    `/api/tokens/amount?walletAddress=${walletAddress}`
  );
  return response.json();
};

export const buyTokens = async (value: string | undefined) => {
  const response = await fetch(`/api/tokens/buy`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value }),
  });
  return response.json();
};
