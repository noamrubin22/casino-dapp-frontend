import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Tokens } from "./tokens/Tokens";
import { useAccount } from "wagmi";
import CoinContainer from "./coinflip/CoinContainer";
import { Stake } from "./Stake";

import { FlipCoin } from "./coinflip/FlipCoin";

export const Casino = () => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  return (
    <div className="hero min-h-full bg-base-100 flex flex-col">
      <FlipCoin isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
      <div className="flex flex-row justify-between">
        <Tokens />
        <div className="coin-container flex self-center ">
          <CoinContainer isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
        </div>
        <div className="">
          <Stake />
        </div>
      </div>
    </div>
  );
};

// const { data, status } = useQuery(
//   ["fetchContracts"],
//   () => fetchContracts(),
//   { cacheTime: 0 }
// );

// const flipCoin = async (heads: boolean) => {
//   setIsFlipped(true);
//   console.log(casinoContract?.address);
//   if (tokenContract) {
//     const approveTx = await tokenContract.approve(
//       casinoContract?.address,
//       ethers.utils.parseEther("1")
//     );
//     console.log(approveTx);
//     approveTx.wait();
//   }
//   if (casinoContract) {
//     const flipTx = await casinoContract.flipCoin(heads);
//     console.log(flipTx);
//     const result = flipTx.wait();
//     console.log(result.value?._hex);
//   }
// };
