import React, { useEffect, useState } from "react";
import { BuyTokens } from "./BuyTokens";
import { SellTokens } from "./SellTokens";
import { useAccount, useQuery } from "wagmi";
import { getTokenAmount } from "../../../utils/contract.utils";

export const Tokens = () => {
  const walletAddress = useAccount().address;

  const { data, status, refetch } = useQuery(
    ["getTokenAmount"],
    () => getTokenAmount(walletAddress),
    {
      cacheTime: 0,
    }
  );

  const [totalAmountTokens, setTotalAmountTokens] = useState<
    number | undefined
  >(data);

  useEffect(() => {
    setTotalAmountTokens(data);
  });

  useEffect(() => {
    refetch();
    console.log(totalAmountTokens);
  }, [refetch, totalAmountTokens]);

  return (
    <div className="pl-20 flex flex-col align-center text-center ">
      <div className="form-control">
        {totalAmountTokens && (
          <p className="subtitle text-xl">
            You have <span className="text-2xl">{totalAmountTokens}</span>
          </p>
        )}
        <span className="main-font px-5 text-4xl">T7E</span>{" "}
        {totalAmountTokens && <p>tokens.</p>}
      </div>

      <BuyTokens refetch={refetch} />

      <SellTokens />
    </div>
  );
};
