import { useMemo } from "react";
import { AnalyticsConsumer } from "../../context/AnalyticsContext";

const Row = ({ data }) => {
  const logo = useMemo(() => {
    return data?.token?.metadata?.chain === "ethereum"
      ? "/weth.png"
      : "/pancake.png";
  }, [data]);

  const { fullData } = AnalyticsConsumer();

  function calculateEthProfit(recentValue, oneDayAgoValue) {
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
      priceDifference:
        priceDifference * fullData.ethData.eth_PriceNow.ethereum.usd,
      percentageChange,
    };
  }

  const nowBal = data.balance;
  const hourBal = data.hourBalance / 10 ** data.token.metadata.decimals;

  const nowPrice = data.tokenPriceEth;
  const hourPrice = data.hourPriceEth;

  const ethNow = nowPrice * nowBal;
  const ethHour = hourPrice * hourBal;

  const calc = calculateEthProfit(ethNow, ethHour);

  return (
    <tr className="border-t border-gray-400/60">
      <th
        scope="row"
        className="px-6 pr-3 lg:pr-4 py-2 font-medium whitespace-nowrap flex flex-row items-center"
      >
        <div className="mr-4">
          <img
            src={data?.token?.metadata?.logo}
            className="w-7 lg:w-8 object-cover m-5"
            alt="table-logo"
          />
        </div>

        <div className="flex flex-col items-center">
          <div>{data?.token?.metadata?.name}</div>
          <div className="flex flex-row items-center">
            <div>
              <img src={logo} className="w-3 lg:w-3 mr-1" alt="table-logo" />
            </div>
            <div className="capitalize font-light text-xs">
              {data?.token?.metadata?.chain}
            </div>
          </div>
        </div>
      </th>
      <td className="px-6 py-4 whitespace-nowrap">
        ${Number(data?.nowPrice * data.tokenPriceEth).toFixed(8)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {Number(data?.balance).toLocaleString()} {data?.token?.metadata?.symbol}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className="">
          ${Number(data.nowPriceBal * data.nowPrice).toLocaleString()}
        </span>
        <br />
        <span
          className={`${
            calc.profitLoss === "Profit" ? "text-green-600" : "text-red-600"
          }`}
        >
          {calc.profitLoss === "Profit" && "+"}
          {calc.percentageChange.toLocaleString()}% ($
          {calc.priceDifference.toLocaleString()})
        </span>
      </td>
    </tr>
  );
};

export default Row;
