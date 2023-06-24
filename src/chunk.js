// import Input from "../Input";
// import {
//   useContractWrite,
//   usePrepareContractWrite,
//   useWaitForTransaction,
//   useContractRead,
//   useAccount,
// } from "wagmi";
// import {
//   UniswapV2,
//   Pancakeswap,
//   WETH,
//   WETH9,
//   WBNB,
//   UniswapV3,
// } from "../../config";
// import UniswapV2Abi from "../../config/UniswapV2Abi.json";
// import UniswapV3Abi from "../../config/UniswapV3Abi.json";
// import PancakeswapAbi from "../../config/Pancakeswap.json";
// import { ethers } from "ethers";

// const notifyMe = () => {
//   if (!("Notification" in window)) {
//     alert("This browser does not support desktop notification");
//   } else if (Notification.permission === "granted") {
//     new Notification("Hi there!", {
//       body: 'Swap Copleted'
//     });

//   } else if (Notification.permission !== "denied") {
//     Notification.requestPermission().then((permission) => {
//       console.log(permission);
//       if (permission === "granted") {
//         new Notification("Hi there!", {
//           body: 'Swap Copleted'
//         });
//       }
//     });
//   }
// };

// const { config: uniBuyConfig } = usePrepareContractWrite({
//   address: UniswapV2,
//   abi: UniswapV2Abi,
//   functionName: "swapExactETHForTokens",
//   chainId: 1,
//   args: [0, [WETH, data?.address], address, (Date.now / 1000) * 21600],
//   value: ethers.utils.parseEther(value?.toString()),
// });
// const { data: uniBuyData, write: uniBuy } = useContractWrite(uniBuyConfig);

// const { config: uniSellConfig } = usePrepareContractWrite({
//   address: UniswapV2,
//   abi: UniswapV2Abi,
//   functionName: "swapExactTokensForETH",
//   chainId: 1,
//   args: [
//     value * 10 ** data.decimals,
//     0,
//     [data?.address, WETH],
//     address,
//     (Date.now / 1000) * 21600,
//   ],
// });
// const { data: uniSellData, write: uniSell } = useContractWrite(uniBuyConfig);

// const { config: cakeBuyConfig } = usePrepareContractWrite({
//   address: Pancakeswap,
//   abi: PancakeswapAbi,
//   functionName: "swapExactETHForTokens",
//   chainId: 56,
//   args: [0, [WBNB, data?.address], address, (Date.now / 1000) * 21600],
//   value: ethers.utils.parseEther(value?.toString()),
// });
// const { data: cakeBuyData, write: cakeBuy } = useContractWrite(cakeBuyConfig);

// const { config: cakeSellConfig } = usePrepareContractWrite({
//   address: Pancakeswap,
//   abi: PancakeswapAbi,
//   functionName: "swapExactTokensForETH",
//   chainId: 56,
//   args: [
//     value * 10 ** data.decimals,
//     0,
//     [data?.address, WBNB],
//     address,
//     (Date.now / 1000) * 21600,
//   ],
// });
// const { data: cakeSellData, write: cakeSell } =
//   useContractWrite(uniBuyConfig);

// const { config: uniV3BuyConfig } = usePrepareContractWrite({
//   address: UniswapV3,
//   abi: UniswapV3Abi,
//   functionName: "exactOutputSingle",
//   chainId: 1,
//   args: [
//     WETH9,
//     data?.address,
//     3000,
//     address,
//     (Date.now / 1000) * 21600,
//     value * 10 ** data.decimals,
//     0,
//     0,
//   ],
//   value: ethers.utils.parseEther(value?.toString()),
// });
// const { data: uniV3BuyData, write: uniV3Buy } =
//   useContractWrite(uniV3BuyConfig);

// const { config: uniV3SellConfig } = usePrepareContractWrite({
//   address: UniswapV3,
//   abi: UniswapV3Abi,
//   functionName: "exactOutputSingle",
//   chainId: 1,
//   args: [
//     data?.address,
//     WETH9,
//     3000,
//     address,
//     (Date.now / 1000) * 21600,
//     value * 10 ** data.decimals,
//     0,
//     0,
//   ],
// });

// const { data: uniV3SellData, write: uniV3Sell } =
//   useContractWrite(uniV3BuyConfig);

const buy = () => {};
