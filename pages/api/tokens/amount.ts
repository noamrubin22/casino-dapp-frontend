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
      !process.env.ALCHEMY_API_KEY
    ) {
      return res.status(500).json("No env keys.");
    }

    const { walletAddress } = req.query;
    const tokenABI = require("../../../data/token-abi.json");
    const tokenAddress = process.env.TOKEN_CONTRACT_ADDRESS;

    try {
      const provider = new ethers.providers.AlchemyProvider(
        "maticmum",
        process.env.ALCHEMY_API_KEY
      );

      // the signer needs to be the contract owner
      const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);
      const signer = wallet.connect(provider);

      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);

      const formattedBalance = await tokenContract
        .balanceOf(walletAddress)
        .then((balance: { _hex: ethers.BigNumberish }) => {
          return parseFloat(ethers.utils.formatEther(balance._hex));
        })
        .catch((error: any) => {
          console.log(error);
        });

      return res.status(200).json(formattedBalance);
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "POST") {
    // get amount of tokens that the user wants to sell
    // return tokens
    return res.status(400).json(req.method);
  }
}

// tokens
// getTokenAmount
// buyTokens
// sellTokens
