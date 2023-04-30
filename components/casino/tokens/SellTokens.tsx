import React, { useState } from "react";

export const SellTokens = () => {
  const [amountTokens, setAmountTokens] = useState<string>("1");

  const handleChangeTokens = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAmountTokens(event.target.value);
  };

  const returnTokens = async (value: string) => {
    // if (casinoContract) {
    //   await casinoContract.returnTokens({
    //     value: BigNumber.from(value),
    //   });
    // }
    // fetchTokenAmount();
    console.log("return tokens", value);
  };

  return (
    <div className="form-control my-5">
      <p className="subtitle  text-lg">Or prefer to sell?</p>
      <label className="label">
        <span className="label-text subtitle">Enter amount</span>
      </label>
      <label className="input-group">
        <input
          type="text"
          placeholder="1"
          className="input input-bordered subtitle"
          value={amountTokens}
          onChange={handleChangeTokens}
        />
        <span>Tokens</span>
      </label>
      <button
        className="btn btn-sm my-4 subtitle glass"
        onClick={() => returnTokens(amountTokens)}
      >
        sell tokens
      </button>
    </div>
  );
};
