export const getTokenAmount = async (
  walletAddress: `0x${string}` | undefined
) => {
  const response = await fetch(`/api/token?walletAddress=${walletAddress}`);
  return response.json();
};
