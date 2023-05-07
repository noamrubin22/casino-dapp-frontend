import { ethers } from "ethers";
import { Interface } from "ethers/lib/utils.js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    if (
      !process.env.TOKEN_CONTRACT_ADDRESS ||
      !process.env.MNEMONIC ||
      !process.env.ALCHEMY_API_KEY ||
      !process.env.CASINO_CONTRACT_ADDRESS
    ) {
      return res.status(500).json("No env keys.");
    }

    const { spenderAddress, coinSide } = req.query;

    const tokenABI = require("../../../data/token-abi.json");
    const tokenAddress = process.env.TOKEN_CONTRACT_ADDRESS;
    const casinoABI = require("../../../data/casino-abi.json");
    const casinoAddress = process.env.CASINO_CONTRACT_ADDRESS;

    console.log("SPENDERADDRESS", spenderAddress);
    try {
      const provider = new ethers.providers.AlchemyProvider(
        "maticmum",
        process.env.ALCHEMY_API_KEY
      );

      // the signer needs to be the contract owner
      const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);
      const signer = wallet.connect(provider);

      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
      const casinoContract = new ethers.Contract(
        casinoAddress,
        casinoABI,
        signer
      );

      const tx = await tokenContract.approve(
        spenderAddress,
        ethers.utils.parseEther("1")
      );
      await tx.wait();

      await casinoContract.allowance();

      const flipTx = await casinoContract.flipCoin(coinSide);
      console.log(flipTx);

      // const flipTx = await casinoContract.flipCoin(coinSide);

      return res.status(200).json(flipTx);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  } else {
    return res.status(400).json(req.method);
  }
}
