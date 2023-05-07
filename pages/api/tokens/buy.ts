import { ethers } from "ethers";
import { Interface } from "ethers/lib/utils.js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { value } = req.body;

    if (
      !process.env.CASINO_CONTRACT_ADDRESS ||
      !process.env.MNEMONIC ||
      !process.env.ALCHEMY_API_KEY
    ) {
      return res.status(500).json("No env keys.");
    }

    const casinoABI = require("../../../data/casino-abi.json");
    const casinoContractAddress = process.env.CASINO_CONTRACT_ADDRESS;

    try {
      const provider = new ethers.providers.AlchemyProvider(
        "maticmum",
        process.env.ALCHEMY_API_KEY
      );

      // the signer needs to be the contract owner
      const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC);
      const signer = wallet.connect(provider);

      const casinoContract = new ethers.Contract(
        casinoContractAddress,
        casinoABI,
        signer
      );
      await casinoContract
        .purchaseTokens({ value: ethers.utils.parseEther(value) })
        .then((res: any) => {
          return res.status(200).json(res);
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
}
