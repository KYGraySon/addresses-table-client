import { WETH } from "../config";
import calculateTokenPrice from "./calculateTokenPrice";

const getBalanceDetails = (balance, ethData) => {
  const isWeth =
    String(balance.reserves[1].token0).toLowerCase() ===
    String(WETH).toLowerCase();

  const wethDecimals = 18;
  const tokenDecimals = balance.token.metadata.decimals;
  const reserves = balance?.reserves[0];
  const now = reserves.nowReserve;
  const hour = reserves.dates[0];
  const day = reserves.dates[1];
  const week = reserves.dates[2];
  const month = reserves.dates[3];
  const year = reserves.dates[4];
  const max = reserves.maxReserve;

  const wethReserve = isWeth ? now?._reserve0 : now?._reserve1;
  if (wethReserve / 1e18 > 1) {
    const nowPriceEth = isWeth
      ? calculateTokenPrice(
          now?._reserve1,
          now?._reserve0,
          tokenDecimals,
          wethDecimals
        )
      : calculateTokenPrice(
          now?._reserve0,
          now?._reserve1,
          tokenDecimals,
          wethDecimals
        );

    const hourPriceEth = isWeth
      ? calculateTokenPrice(
          hour?._reserve1,
          hour?._reserve0,
          tokenDecimals,
          wethDecimals
        )
      : calculateTokenPrice(
          hour?._reserve0,
          hour?._reserve1,
          tokenDecimals,
          wethDecimals
        );
    const dayPriceEth = isWeth
      ? calculateTokenPrice(
          day?._reserve1,
          day?._reserve0,
          tokenDecimals,
          wethDecimals
        )
      : calculateTokenPrice(
          day?._reserve0,
          day?._reserve1,
          tokenDecimals,
          wethDecimals
        );

    const weekPriceEth = isWeth
      ? calculateTokenPrice(
          week?._reserve1,
          week?._reserve0,
          tokenDecimals,
          wethDecimals
        )
      : calculateTokenPrice(
          week?._reserve0,
          week?._reserve1,
          tokenDecimals,
          wethDecimals
        );

    const monthPriceEth = isWeth
      ? calculateTokenPrice(
          month?._reserve1,
          month?._reserve0,
          tokenDecimals,
          wethDecimals
        )
      : calculateTokenPrice(
          month?._reserve0,
          month?._reserve1,
          tokenDecimals,
          wethDecimals
        );

    const maxPriceEth = isWeth
      ? calculateTokenPrice(
          max?._reserve1,
          max?._reserve0,
          tokenDecimals,
          wethDecimals
        )
      : calculateTokenPrice(
          max?._reserve0,
          max?._reserve1,
          tokenDecimals,
          wethDecimals
        );

    const nowPrice = ethData.eth_PriceNow.ethereum.usd;
    const hourPrice = ethData.eth_Price1H.market_data.current_price.usd;
    const day1Price = ethData.eth_Price1D.market_data.current_price.usd;
    const day7Price = ethData.eth_Price7.market_data.current_price.usd;
    const day30Price = ethData.eth_Price30.market_data.current_price.usd;

    return {
      nowPriceBal: nowPriceEth * balance.token.balance,
      hourPriceBal: hourPriceEth * (hour.balance / 10 ** tokenDecimals),
      dayPriceBal: dayPriceEth * (day.balance / 10 ** tokenDecimals),
      weekPriceBal: weekPriceEth * (week.balance / 10 ** tokenDecimals),
      monthPriceBal: monthPriceEth * (month.balance / 10 ** tokenDecimals),
      maxPriceBal: maxPriceEth * (max.balance * 10 ** tokenDecimals),
      token: balance.token,
      nowPrice,
      tokenPriceEth: nowPriceEth,
      hourPrice,
      day1Price,
      day7Price,
      day30Price,
      hourPriceEth,
      hourBalance: hour.balance,
      balance: balance.token.balance,
    };
  }
};

export default getBalanceDetails;
