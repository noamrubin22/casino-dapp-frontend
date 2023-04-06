import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

const CheckNftOwnership = () => {
  const [isHolder, setIsHolder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const walletAddress = useAccount().address;

  const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY;

  const checkNftOwnership = async () => {
    setIsLoading(true);
    const options = {
      method: 'GET',
      headers: { accept: 'application/json' },
    };
    try {
      const response = await fetch(
        `https://polygon-mumbai.g.alchemy.com/nft/v2/${alchemyApiKey}/isHolderOfCollection?wallet=${walletAddress}&contractAddress=0x651e4057ffbf616542799c7d0bbcee4fa7b6cb80`,
        options
      );
      const json = await response.json();
      setIsHolder(json.is_holder);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={checkNftOwnership}>
        {isLoading ? 'Checking ownership...' : 'Check NFT Ownership'}
      </button>
      {isHolder !== undefined && (
        <p>{isHolder ? 'User holds the NFT' : 'User does not hold the NFT'}</p>
      )}
      <button disabled={!isHolder}>Get Started</button>
    </div>
  );
};

export default CheckNftOwnership;
