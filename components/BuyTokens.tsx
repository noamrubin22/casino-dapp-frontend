import { BigNumber, ethers } from "ethers";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useAccount } from "wagmi";
import { getContract } from "../utils/contract";
import { fetchContracts } from "./FlipCoin";

// interface BuyTokensProps {
//   casinoContract: ethers.Contract | undefined;
//   tokenContract: ethers.Contract | undefined;
// }

export const BuyTokens: React.FC = ({}) => {
  const walletAddress = useAccount().address;
  const { data, status } = useQuery(
    ["fetchContracts"],
    () => fetchContracts(),
    { cacheTime: 0 }
  );

  const [casinoContract, setCasinoContract] = useState<
    ethers.Contract | undefined
  >(getContract("casino"));
  const [tokenContract, setTokenContract] = useState<
    ethers.Contract | undefined
  >(getContract("token"));

  const [ethValue, setETHValue] = useState<string>("0.01");
  const [amountTokens, setAmountTokens] = useState<string>("1");
  const [totalAmountTokens, setTotalAmountTokens] = useState<
    number | undefined
  >();

  const fetchTokenAmount = async () => {
    if (!tokenContract) return;

    tokenContract
      .balanceOf(walletAddress)
      .then((balance: { _hex: ethers.BigNumberish }) => {
        console.log("in tokenContract BalanceOf");
        const formattedBalance = parseFloat(
          ethers.utils.formatEther(balance._hex)
        );
        console.log("FormattedBalance: ", formattedBalance);
        setTotalAmountTokens(formattedBalance);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleChangeETH = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setETHValue(event.target.value);
  };

  const handleChangeTokens = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAmountTokens(event.target.value);
  };

  const buyTokens = async (value: string) => {
    fetchTokenAmount();
    if (casinoContract) {
      const buyTokensTx = await casinoContract.purchaseTokens({
        value: ethers.utils.parseEther(value),
      });
      console.log("BUYTOKENStx: ", buyTokensTx);
    }
  };

  const returnTokens = async (value: string) => {
    if (casinoContract) {
      await casinoContract.returnTokens({
        value: BigNumber.from(value),
      });
    }
    fetchTokenAmount();
  };

  return (
    <div>
      <div className="px-6 py-10 flex justify-center align-center text-center bg-base-100">
        <div>
          <>
            <div className="form-control">
              {totalAmountTokens && (
                <p className="subtitle text-xl">
                  You have <span className="text-2xl">{totalAmountTokens}</span>
                </p>
              )}
              <span className="main-font px-5 text-4xl">T7E</span>{" "}
              {totalAmountTokens && <p>tokens.</p>}
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
          </>
        </div>
      </div>
    </div>
  );
};
