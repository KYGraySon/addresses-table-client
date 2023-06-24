import { useState } from "react";
import BuyModal from "./Modal/BuyModal";
import SellModal from "./Modal/SellModal";
import OneInchModal from "./Modal/OneInchModal";
import truncateEthAddress from "truncate-eth-address";

const Table = () => {
  const headers = [
    "Alias",
    "Address",
    "Since",
    "Buy",
    "Buy Price",
    "Sell",
    "Sell Price",
    "Total ETH",
    "Total BSC",
    "Explorer",
    "Trade",
  ];

  const body = [
    {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      decimals: 18,
      exchange: "Uniswap",
      type: "Sell",
      token0: {
        symbol: "DAI",
      },
      token1: {
        symbol: "ETH",
      },
      data: [
        "Wallet 1",
        "0x00850355e8239534685eb26be5451B1B2716cEBc",
        "5m",
        "ETH",
        "0",
        "DAI",
        "$800",
        "2.3",
        "0",
        "Etherscan",
        "Sell",
      ],
    },
    {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      decimals: 18,
      exchange: "Uniswap",
      type: "Buy",
      token0: {
        symbol: "ETH",
      },
      token1: {
        symbol: "DAI",
      },
      data: [
        "Wallet 1",
        "0x00850355e8239534685eb26be5451B1B2716cEBc",
        "5m",
        "ETH",
        "$200",
        "DAI",
        "0",
        "0.8",
        "0",
        "Etherscan",
        "Sell",
      ],
    },
    {
      address: "0xe5ba47fd94cb645ba4119222e34fb33f59c7cd90",
      decimals: 18,
      exchange: "Pancakeswap",
      type: "Buy",
      token0: {
        symbol: "SAFUU",
      },
      token1: {
        symbol: "BNB",
      },
      data: [
        "Wallet 2",
        "0x935E514597Be2D1C1CDbB9044F7eFF59115353d8",
        "35m",
        "SAFUU",
        "$1000",
        "BNB",
        "0",
        "0",
        "0.5",
        "Bscscan",
        "Buy",
      ],
    },
    {
      address: "0x5ceaa82ffd3b1c0193ff65fc93510846dd56f22c",
      decimals: 18,
      exchange: "Uniswap",
      type: "Sell",
      token0: {
        symbol: "STRIDR",
      },
      token1: {
        symbol: "ETH",
      },
      data: [
        "Wallet 2",
        "0x8B763D91B16a0deD60E400F3B09135B7C78c4a26",
        "15m",
        "STRIDR",
        "0",
        "ETH",
        "$300",
        "0.3",
        "0",
        "Etherscan",
        "Buy",
      ],
    },
    {
      address: "0xe5ba47fd94cb645ba4119222e34fb33f59c7cd90",
      decimals: 18,
      exchange: "Pancakeswap",
      type: "Sell",
      token0: {
        symbol: "SAFUU",
      },
      token1: {
        symbol: "BNB",
      },
      data: [
        "Wallet 2",
        "0x935E514597Be2D1C1CDbB9044F7eFF59115353d8",
        "35m",
        "SAFUU",
        "0",
        "BNB",
        "$100",
        "0",
        "0.5",
        "Bscscan",
        "Buy",
      ],
    },
    {
      address: "0x5ceaa82ffd3b1c0193ff65fc93510846dd56f22c",
      decimals: 18,
      exchange: "Uniswap",
      type: "Buy",
      token0: {
        symbol: "BNB",
      },
      token1: {
        symbol: "STRIDR",
      },
      data: [
        "Wallet 1",
        "0x8B763D91B16a0deD60E400F3B09135B7C78c4a26",
        "1h",
        "STRIDR",
        "$300",
        "ETH",
        "0",
        "1.3",
        "0.5",
        "Etherscan",
        "Buy",
      ],
    },
    {
      address: "0xe5ba47fd94cb645ba4119222e34fb33f59c7cd90",
      decimals: 18,
      exchange: "Pancakeswap",
      type: "Buy",
      token0: {
        symbol: "BNB",
      },
      token1: {
        symbol: "SAFUU",
      },
      data: [
        "Wallet 2",
        "0x935E514597Be2D1C1CDbB9044F7eFF59115353d8",
        "35m",
        "SAFUU",
        "$500",
        "BNB",
        "0",
        "0",
        "0.5",
        "Bscscan",
        "Buy",
      ],
    },
  ];

  const [buyData, setBuyData] = useState();
  const [sellData, setSellData] = useState();
  const [inchData, setInchData] = useState();

  const handleCloseBuy = () => {
    const modal = document.querySelector("[data-buy]");
    modal.close();
  };
  const handleCloseSell = () => {
    const modal = document.querySelector("[data-sell]");
    modal.close();
  };

  const handleBuy = (data) => {
    setBuyData(data);
    const modal = document.querySelector("[data-buy]");
    modal.showModal();
  };
  const handleSell = (data) => {
    setSellData(data);
    const modal = document.querySelector("[data-sell]");
    modal.showModal();
  };

  const openModal = (modalOptions) => {
    if (modalOptions.type === "Sell") {
      handleSell(modalOptions);
    } else {
      handleBuy(modalOptions);
    }
  };

  const openInch = (data) => {
    setInchData(data);
    const modal = document.querySelector("[data-inch]");
    modal.showModal();
  };

  const closeInch = () => {
    const modal = document.querySelector("[data-inch]");
    modal.close();
  };

  return (
    <>
      <table className="w-full overflow-x-auto scrollbar-hide text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers?.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body?.map((row, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 whitespace-nowrap"
              key={index}
            >
              {row?.data?.map((col, index) => {
                if (index == 1) {
                  return (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`https://etherscan.io/address/${col}`}
                        className="underline cursor-pointer"
                      >
                        {truncateEthAddress(col)}
                      </a>
                    </td>
                  );
                } else if (index == 3) {
                  return (
                    <>
                      {row?.type === "Buy" ? (
                        <td key={index} className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="underline cursor-pointer min-w-[80px] py-1 bg-green-500 text-white rounded-lg
                        active:ring-4 transform active:ring-green-400  active:scale-90 transition-transform delay-75"
                          >
                            {col}
                          </button>
                        </td>
                      ) : (
                        <td> </td>
                      )}
                    </>
                  );
                } else if (index == 5) {
                  return (
                    <>
                      {row.type === "Sell" ? (
                        <td key={index} className="px-6 py-4 whitespace-nowrap">
                          <button
                            className="underline cursor-pointer min-w-[80px] py-1 bg-red-500 text-white rounded-lg
                        active:ring-4 active:ring-red-400 transform active:scale-90 transition-transform delay-75"
                          >
                            {col}
                          </button>
                        </td>
                      ) : (
                        <td> </td>
                      )}
                    </>
                  );
                } else if (index == 9) {
                  return (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      <a
                        href={`https://etherscan.io/tx`}
                        className="underline cursor-pointer flex flex-row whitespace-nowrap"
                      >
                        {col}
                      </a>
                    </td>
                  );
                } else if (index == 10) {
                  return (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      <div className="underline cursor-pointer flex flex-row whitespace-nowrap">
                        {row.exchange === "Uniswap" ? (
                          <div className="flex flex-row whitespace-nowrap space-x-3 items-center">
                            <button className=" active:ring-4 transform active:ring-sky-400  active:scale-90 transition-transform delay-75 rounded-full">
                              <img
                                onClick={() => openModal(row)}
                                src="/uni.png"
                                className="w-9 ring-white py-1 rounded-full ring-1"
                              />
                            </button>
                            <button className=" active:ring-4 transform active:ring-sky-400  active:scale-90 transition-transform delay-75 rounded-full">
                              {" "}
                              <img
                                onClick={() => openInch(row)}
                                src="/1inch.png"
                                className="w-8 px-1 ring-white py-1 rounded-full ring-1"
                              />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-row whitespace-nowrap space-x-3 items-center">
                            <button className=" active:ring-4 transform active:ring-sky-400  active:scale-90 transition-transform delay-75 rounded-full">
                              <img
                                onClick={() => openModal(row)}
                                src="/cake.png"
                                className="w-8 ring-white rounded-full ring-1"
                              />
                            </button>
                            <button className=" active:ring-4 transform active:ring-sky-400  active:scale-90 transition-transform delay-75 rounded-full">
                              {" "}
                              <img
                                onClick={() => openInch(row)}
                                src="/1inch.png"
                                className="w-8 ring-white py-1 px-1 rounded-full ring-1"
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  );
                } else {
                  return (
                    <td key={index} className="px-6 py-4 whitespace-nowrap">
                      {col}
                    </td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <BuyModal
        data={buyData}
        handleBuy={handleBuy}
        handleClose={handleCloseBuy}
      />
      <SellModal
        data={sellData}
        handleSell={handleSell}
        handleClose={handleCloseSell}
      />
      <OneInchModal
        data={inchData}
        handleSell={openInch}
        handleClose={closeInch}
      />
    </>
  );
};

export default Table;
