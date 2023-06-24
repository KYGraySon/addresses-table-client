import { AnalyticsConsumer } from "../../context/AnalyticsContext";
import EthRow from "./EthRow";
import Row from "./Row";

const AssetsTab = () => {

  const { apiData, fullData } = AnalyticsConsumer();

  const eth =
    {
      name: "Ethereum",
      chain: "ethereum",
      price: fullData.ethData.eth_PriceNow.ethereum.usd,
      amount: fullData.ethAnalysis.ethBalanceNow,
      value: fullData.ethAnalysis.ethBalanceNow * fullData.ethData.eth_PriceNow.ethereum.usd,
      symbol: "ETH",
      logo: '/weth.png'
    }
    // {
    //   asset: "Smart Chain",
    //   chain: "bsc",
    //   price: 235,
    //   amount: 3.5,
    //   value: 784.45,
    //   symbol: "BNB",
    // },
  ;

  const headers = ["Assets", "Price", "Balance", "Value"];

  return (
    <div className="w-full justify-center items-center flex flex-col">
      <div className="text-center font-bold text-xl mt-2">Assets</div>
      <div className="border relative border-gray-400/60 p-4 py-8 rounded-lg w-[350px] lg:w-[1030px] ml-0 mb-10 lg:ml-3 mt-5 shadow-lg scrollbar-hide">
        <div className="relative overflow-x-auto scrollbar-hide">
          <table className="w-full text-sm text-left">
            <thead className="text-xs capitalize">
              <tr>
                {headers.map((header) => (
                  <th key={header} scope="col" className="px-6 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
            <EthRow data={eth}/>
              {apiData?.map((asset, index) => (
                <Row data={asset} key={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssetsTab;
