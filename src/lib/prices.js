import axios from "axios";

const ethPrice = async (date) => {
  const time = new Date(date);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const day = time.getDate();
  const format = `${day}-${month}-${year}`;
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/history?date=${format}&localization=false`
  );
  return data;
};
//date=30-12-2022
const coinInfo = async (contract) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contract}`
  );
  return data;
};

const marketChart = async (contract, days) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contract}/market_chart/?vs_currency=usd&days=${days}`
  );
  return data;
};
const marketChartRange = async (contract, start, end) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contract}/market_chart/range?vs_currency=usd&from=${start}&to=${end}`
  );
  return data;
};

export { ethPrice, coinInfo, marketChart, marketChartRange };
