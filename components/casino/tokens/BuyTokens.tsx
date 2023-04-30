import React, { useState } from "react";

interface BuyTokensProps {
  refetch: any;
}

export const BuyTokens: React.FC<BuyTokensProps> = ({ refetch }) => {
  const [ethValue, setETHValue] = useState<string>("0.01");

  const handleChangeETH = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setETHValue(event.target.value);
  };

  const buyTokens = async (value: string) => {
    // buy tokens
    try {
      const response = await fetch(`/api/tokens/buy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || response.statusText);
      }
      // update token amount <-- not working yet.
      refetch();

      return data;
    } catch (error) {
      console.error(error);
      return { error: "Something went wrong. Please try again later." };
    }
  };

  return (
    <div>
      {" "}
      <p className="subtitle my-3 text-lg">Want to buy more?</p>
      <label className="label">
        <span className="label-text subtitle">Enter amount</span>
      </label>
      <label className="input-group">
        <input
          type="text"
          placeholder="0.01"
          className="input input-bordered subtitle"
          value={ethValue}
          onChange={handleChangeETH}
        />
        <span>ETH</span>
      </label>
      <button
        className="btn btn-sm my-4 subtitle glass"
        onClick={() => buyTokens(ethValue)}
      >
        buy tokens
      </button>
    </div>
  );
};
