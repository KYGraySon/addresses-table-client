import { useCallback, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HistoryCard from "./HistoryCard";
import { AnalyticsConsumer } from "../../context/AnalyticsContext";
import { ethers } from "ethers";
import erc20Abi from "../../config/erc20Abi.json";
import {
  UniswapV2,
  UniswapV3,
  endpoint,
  ethProviderKey,
  oneInchV5,
} from "../../config";
import oneInchV5Abi from "../../config/oneInchV5Abi.json";
import axios from "axios";

const PerformanceTab = ({ userId }) => {
  const navigate = useNavigate();
  const { apiData, ethPrices, fullData, history, setHistory } =
    AnalyticsConsumer();

  function calculateProfitLoss(recentValue, oneDayAgoValue) {
    let priceDifference = 0;
    let percentageChange = 0;
    let zero = 0.01;
    if (oneDayAgoValue === 0) {
      priceDifference = recentValue - zero;
    } else {
      priceDifference = recentValue - oneDayAgoValue;
    }
    const profitLoss = priceDifference > 0 ? "Profit" : "Loss";
    if (oneDayAgoValue === 0) {
      percentageChange = (priceDifference / zero) * 100;
    } else {
      percentageChange = (priceDifference / oneDayAgoValue) * 100;
    }

    return {
      profitLoss,
      priceDifference: priceDifference * ethPrices.eth_PriceNow.ethereum.usd,
      percentageChange,
    };
  }

  const nowPrices = apiData.reduce(
    (accumulator, item) => accumulator + item?.nowPriceBal,
    0
  );
  const hourPrices = apiData.reduce(
    (accumulator, item) => accumulator + item?.hourPriceBal,
    0
  );
  const dayPrices = apiData.reduce(
    (accumulator, item) => accumulator + item?.dayPriceBal,
    0
  );
  const weekPrices = apiData.reduce(
    (accumulator, item) => accumulator + item?.weekPriceBal,
    0
  );
  const monthPrices = apiData.reduce(
    (accumulator, item) => accumulator + item?.monthPriceBal,
    0
  );
  const maxPrices = apiData.reduce(
    (accumulator, item) => accumulator + item?.maxPriceBal,
    0
  );

  const [duration, setDuration] = useState(
    hourPrices + fullData.ethAnalysis.ethBalances[0]
  );
  const [nowBalance, setNowBalance] = useState(
    nowPrices + fullData.ethAnalysis.ethBalanceNow
  );

  const durations = useMemo(() => {
    return ["1H", "1D", "1W", "1M", "1Y", "MAX"];
  }, []);

  const [selected, setSelected] = useState("1H");

  const select = useCallback(
    (selector) => {
      setSelected(selector);
      if (selector === "1H") {
        setDuration(hourPrices + fullData.ethAnalysis.ethBalances[0]);
      } else if (selector === "1D") {
        setDuration(dayPrices + fullData.ethAnalysis.ethBalances[1]);
      } else if (selector === "1W") {
        setDuration(weekPrices + fullData.ethAnalysis.ethBalances[2]);
      } else if (selector === "1M") {
        setDuration(monthPrices + fullData.ethAnalysis.ethBalances[3]);
      } else if (selector === "MAX") {
        setDuration(maxPrices) + fullData.ethAnalysis.ethBalances[4];
      } else {
        setDuration(maxPrices + fullData.ethAnalysis.ethBalances[4]);
      }
    },
    [hourPrices, dayPrices, weekPrices, monthPrices, maxPrices, fullData]
  );

  const ethProvider = useMemo(
    () => new ethers.JsonRpcProvider(ethProviderKey),
    []
  );
  // const bscProvider = new ethers.JsonRpcProvider('')

  function formatNumber(value) {
    const suffixes = [
      "",
      "K",
      "M",
      "B",
      "T",
      "Q",
      "QT",
      "ST",
      "SP",
      "OT",
      "NN",
      "DC",
    ];

    let suffixIndex = 0;
    while (value >= 1000 && suffixIndex < suffixes.length - 1) {
      value /= 1000;
      suffixIndex++;
    }

    return value.toFixed(1) + suffixes[suffixIndex];
  }

  function convertToStandardForm(number) {
    const numberString = number.toExponential(2);
    const [formattedNumber, exponent] = numberString.split("e");

    return `${formattedNumber}${exponent}`;
  }

  useEffect(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const setData = async () => {
      console.time("apiCall");
      const { data } = await axios.post(endpoint + "transactions", {
        address: userId,
      });
      console.timeEnd("apiCall");
      const txs = [];
      await Promise.all(
        data?.map(async (transaction) => {
          if (
            transaction.functionName === "transfer(address _to, uint256 _value)"
          ) {
            const contract = new ethers.Contract(
              transaction.to,
              erc20Abi,
              ethProvider
            );
            const decimals = await contract.decimals();
            const symbol = await contract.symbol();
            const decodedData = contract.interface.decodeFunctionData(
              "transfer",
              transaction.input
            );
            const amount = parseInt(decodedData[1]) / 10 ** parseInt(decimals);
            const date2 = new Date(transaction.timeStamp * 1000);
            const day = date2.getDate();
            const month = date2.getMonth();
            const date = `${months[month]}, ${day}`;
            let suffix;

            if (amount > 1e30) {
              suffix = convertToStandardForm(amount);
            } else {
              suffix = formatNumber(amount);
            }

            txs.push({
              ...transaction,
              chain: "ethereum",
              type: "Transfer",
              amount: suffix,
              date: date,
              jsDate: date2,
              asset: symbol,
            });
          } else if (
            transaction.functionName ===
            "approve(address _spender, uint256 _value)"
          ) {
            const contract = new ethers.Contract(
              transaction.to,
              erc20Abi,
              ethProvider
            );
            const decimals = await contract.decimals();
            const symbol = await contract.symbol();
            const decodedData = contract.interface.decodeFunctionData(
              "approve",
              transaction.input
            );
            const amount = parseInt(decodedData[1]) / 10 ** parseInt(decimals);
            let suffix;

            if (amount > 1e30) {
              suffix = convertToStandardForm(amount);
            } else {
              suffix = formatNumber(amount);
            }
            const date2 = new Date(transaction.timeStamp * 1000);
            const day = date2.getDate();
            const month = date2.getMonth();
            const date = `${months[month]}, ${day}`;

            txs.push({
              ...transaction,
              chain: "ethereum",
              type: "Approve",
              amount: suffix,
              date: date,
              jsDate: date2,
              asset: symbol,
            });
          } else if (!transaction.functionName && transaction.value > 0) {
            const date2 = new Date(transaction.timeStamp * 1000);
            const day = date2.getDate();
            const month = date2.getMonth();
            const date = `${months[month]}, ${day}`;
            const amount = transaction.value / 1e18;
            let suffix;

            if (amount > 1e30) {
              suffix = convertToStandardForm(amount);
            } else {
              suffix = formatNumber(amount);
            }

            if (transaction.from === userId) {
              txs.push({
                ...transaction,
                chain: "ethereum",
                type: "Send",
                amount: suffix,
                date: date,
                jsDate: date2,
                asset: "ETH",
              });
            } else {
              txs.push({
                ...transaction,
                chain: "ethereum",
                type: "Receive",
                amount: suffix,
                date: date,
                jsDate: date2,
                asset: "ETH",
              });
            }
          } else if (
            transaction.functionName.startsWith("swap") ||
            transaction.functionName.startsWith("exactInputSingle") ||
            transaction.functionName.startsWith("swapETHForExactTokens")
          ) {
            const date2 = new Date(transaction.timeStamp * 1000);
            const day = date2.getDate();
            const month = date2.getMonth();
            const date = `${months[month]}, ${day}`;

            if (transaction.to === oneInchV5) {
              try {
                const contract = new ethers.Contract(
                  transaction.to,
                  oneInchV5Abi,
                  ethProvider
                );

                const decodedData = contract.interface.decodeFunctionData(
                  "swap",
                  transaction.input
                );

                const tokenIn = decodedData[1][0];
                const tokenOut = decodedData[1][1];

                const inContract = new ethers.Contract(
                  tokenIn,
                  erc20Abi,
                  ethProvider
                );
                const outContract = new ethers.Contract(
                  tokenOut,
                  erc20Abi,
                  ethProvider
                );

                const tokenInSymbol = await inContract.symbol();
                const tokenInDecimal = await inContract.decimals();
                const tokenOutSymbol = await outContract.symbol();
                const tokenOutDecimal = await outContract.decimals();

                const amount =
                  parseInt(decodedData[1][4]) / 10 ** parseInt(tokenInDecimal);
                const receivedAmount =
                  parseInt(decodedData[1][5]) / 10 ** parseInt(tokenOutDecimal);

                let suffix;
                let receivedFixed;

                if (amount > 1e30) {
                  suffix = convertToStandardForm(amount);
                  receivedFixed = convertToStandardForm(receivedAmount);
                } else {
                  suffix = formatNumber(amount);
                  receivedFixed = formatNumber(receivedAmount);
                }

                txs.push({
                  ...transaction,
                  chain: "ethereum",
                  type: "Trade",
                  date: date,
                  jsDate: date2,
                  amount: suffix,
                  recieved: receivedFixed,
                  asset: tokenInSymbol,
                  token: tokenOutSymbol,
                });
              } catch (error) {
                // console.log(error)
              }
            } else if (transaction.to === UniswapV2) {
              console.log("v2");
            } else if (transaction.to === UniswapV3) {
              console.log("v3");
            }
          }
        })
      );
      const sorted = txs.sort((a, b) => b.jsDate - a.jsDate);
      setHistory(sorted);
    };
    setData();
  }, [ethProvider, userId, setHistory]);

  const slicedHistory = useMemo(() => history.slice(0, 4), [history]);

  const toHistory = () => {
    navigate(`/history/${userId}`);
  };

  const graph = useMemo(() => {
    if (selected === durations[0]) return "1H";
    else if (selected === durations[1]) return "1D";
    else if (selected === durations[2]) return "1W";
    else if (selected === durations[3]) return "1M";
    else if (selected === durations[4]) return "1Y";
    else if (selected === durations[5]) return "MAX";
    else return "MAX";
  }, [selected, durations]);

  const calculations = calculateProfitLoss(nowBalance, duration);

  return (
    <div className="mx-auto items-center flex-col lg:justify-center flex lg:flex-row mt-5 rounded-lg p-4 w-full overflow-auto scrollbar-hide">
      <div className="flex flex-col items-center p-2 rounded-lg">
        <div className="flex flex-row text-xl font-bold items-center">
          {" "}
          Performance{" "}
          <img
            className="w-8 ring-black rounded-full ml-2"
            src="/eth.png"
            alt="coinLogo"
          />
        </div>
        <div className="border relative border-gray-400/60 p-2 rounded-lg w-[350px] h-[300px] lg:w-[700px] lg:h-[450px] mt-5 shadow-lg">
          <div className="text-3xl lg:text-5xl ml-5 mt-2">
            <div className="font-semibold">
              $
              {isFinite(Number(nowBalance).toFixed(8))
                ? Number(
                    nowBalance * ethPrices.eth_PriceNow.ethereum.usd
                  ).toLocaleString()
                : 0}
            </div>
            <div
              className={`text-sm lg:text-xl ${
                calculations.percentageChange > 0
                  ? "text-green-500"
                  : "text-red-600"
              }`}
            >
              {calculations.profitLoss === "Profit" && "+"}
              {isFinite(calculations.percentageChange.toFixed(3))
                ? calculations.percentageChange.toLocaleString()
                : 0}
              % ($
              {isFinite(calculations.priceDifference.toFixed(8))
                ? calculations.priceDifference.toFixed(3)
                : 0}
              )
            </div>
          </div>
          <div className="flex text-center absolute top-[40%] left-[30%] lg:left-[43%]">
            {" "}
            Graph {graph} goes here{" "}
          </div>
          <div className="flex flex-row space-x-4 absolute bottom-3 ml-3">
            {durations.map((duration, id) => (
              <div
                className={`lg:w-10 lg:h-7 w-9 h-6 items-center cursor-pointer transition flex justify-center text-xs lg:text-sm rounded-lg ${
                  selected === duration ? "bg-rose-600/80" : "bg-gray-300"
                }`}
                onClick={() => select(duration)}
                key={id}
              >
                {duration}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-3">
        <div className="text-center font-bold text-xl">History</div>
        <div className="border border-gray-400/60 p-2 relative shadow-lg rounded-lg w-[350px] h-[300px] lg:w-[320px] lg:h-[450px] mt-5">
          <div className="px-4 mt-5 lg:mt-10 space-y-4 lg:space-y-6">
            {slicedHistory.length > 0 ? (
              <>
                {slicedHistory?.map((history, index) => (
                  <HistoryCard data={history} key={index} />
                ))}
              </>
            ) : (
              <div className="mx-auto absolute top-[40%] left-[44%] lf:left-[45%]">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
          <div className="absolute bottom-0 right-0 mx-auto flex justify-center items-center w-full border-t h-14 lg:h-20 border-t-gray-400/60">
            <button
              onClick={toHistory}
              className="px-4 py-1 border border-gray-400/60 shadow-lg rounded-lg active:ring-2 transform active:ring-gray-400/60  active:scale-90 transition-transform"
            >
              See all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTab;
