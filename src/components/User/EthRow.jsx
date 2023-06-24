import { useMemo } from "react";
import { AnalyticsConsumer } from "../../context/AnalyticsContext";

const EthRow = ({ data }) => {
  const logo = useMemo(() => {
    return data?.chain === "ethereum" ? "/weth.png" : "/pancake.png";
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
      priceDifference: priceDifference,
      percentageChange,
    };
  }

  const calc = calculateEthProfit(
    data?.amount * fullData.ethData.eth_PriceNow.ethereum.usd,
    fullData.ethAnalysis.ethBalances[0] *
      fullData.ethData.eth_Price1H.market_data.current_price.usd
  );

  return (
    <tr className="border-t border-gray-400/60">
      <th
        scope="row"
        className="px-6 pr-3 lg:pr-4 py-2 font-medium whitespace-nowrap flex flex-row items-center"
      >
        <div className="mr-4">
          <img
            src={data?.logo}
            className="w-7 lg:w-8 object-cover m-5"
            alt="table-logo"
          />
        </div>

        <div className="flex flex-col items-center">
          <div>{data?.name}</div>
          <div className="flex flex-row items-center">
            <div>
              <img src={logo} className="w-3 lg:w-3 mr-1" alt="table-logo" />
            </div>
            <div className="capitalize font-light text-xs">{data?.chain}</div>
          </div>
        </div>
      </th>
      <td className="px-6 py-4 whitespace-nowrap">
        ${Number(data?.price).toLocaleString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {Number(data?.amount).toLocaleString()} {data?.symbol}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="">${Number(data?.value).toLocaleString()}</span>
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

export default EthRow;
