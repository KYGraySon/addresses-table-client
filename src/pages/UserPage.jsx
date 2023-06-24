import { useEffect, useState } from "react";
import { useParams, useNavigation } from "react-router-dom";
import PortfolioLayout from "../components/Layouts/PortfolioLayout";
import User from "../components/User";
import { WETH, endpoint } from "../config";
import getBalanceDetails from "../lib/getBalanceDetails";
import axios from "axios";
import { AnalyticsConsumer } from "../context/AnalyticsContext";

const UserPage = () => {
  const params = useParams();
  const navigation = useNavigation();
  const userId = params.userId;

  const [loading, setLoading] = useState(true);

  const { apiData, setApiData, setEthPrices, setFulldata } =
    AnalyticsConsumer();

  useEffect(() => {
    const setData = async () => {
      console.time("apiCall");
      const { data: returnedData } = await axios.post(endpoint + "analysis", {
        address: userId,
      });
      console.timeEnd("apiCall");

      const data = await Promise.all(
        returnedData?.balances.map((balance) => {
          if (balance?.reserves) {
            const isWeth =
              String(balance.reserves[1].token0).toLowerCase() ===
              String(WETH).toLowerCase();

            const wethDecimals = 18;
            const wethReserve = isWeth
              ? balance.reserves[0].nowReserve._reserve0 / 10 ** wethDecimals
              : balance.reserves[0].nowReserve._reserve1 / 10 ** wethDecimals;
            if (wethReserve > 1) {
              const details = getBalanceDetails(balance, returnedData.ethData);
              return details;
            }
          }
        })
      );
      const array = [];
      data?.map((item) => {
        if (item) {
          array.push(item);
        }
      });
      setApiData(array);
      setEthPrices(returnedData.ethData);
      setFulldata(returnedData);
      setLoading(false);
    };
    setData();
  }, [setApiData, setEthPrices, setFulldata, userId]);

  return (
    <div className="transition delay-75 min-h-screen">
      {navigation.state === "loading" || loading ? (
        <PortfolioLayout />
      ) : (
        <User data={apiData} id={userId} />
      )}
    </div>
  );
};

export default UserPage;
