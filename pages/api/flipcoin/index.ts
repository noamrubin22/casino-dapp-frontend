// const { contracts, coinSide } = req.body;
// const { casinoContract, tokenContract } = contracts;

// try {
//   if (tokenContract) {
//     console.log("TOKENCONTRACT", tokenContract);

//     await tokenContract.interface.functions.approve(
//       casinoContract.address,
//       ethers.utils.parseEther("1")
//     );

//     // const approveTx = await tokenContract.approve(
//     //   casinoContract.address,
//     //   ethers.utils.parseEther("1")
//     // );
//     // console.log("approvedTX", approveTx);
//     // approveTx.wait();
//   }

//   // const flipTx = await casinoContract.flipCoin(coinSide);

//   return res.status(200).json(true);
// } catch (error) {
//   console.error(error);
//   return res.status(500).json(error);
// }
// } else {
// return res.status(400).json(req.method);
// }
