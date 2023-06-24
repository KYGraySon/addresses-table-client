import { XCircleIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

const OneInchModal = ({ handleClose, handleBuy, data }) => {
  const ethTokens = useMemo(() => {
    if (data?.type === "Sell") {
      return [data?.address, "ETH"];
    } else {
      return ["ETH", data?.address];
    }
  }, [data]);

  const bscTokens = useMemo(() => {
    if (data?.type === "Sell") {
      return [data?.address, "BNB"];
    } else {
      return ["BNB", data?.address];
    }
  }, [data]);
  const amount = 1;
  const chainId = useMemo(() => {
    return data?.exchange === "Uniswap" ? 1 : 56;
  }, [data]);

  const primary = useMemo(() => {
    return data?.exchange === "Uniswap" ? "ETH" : "BNB";
  }, [data]);
  console.log(data?.address);
  return (
    <dialog
      data-inch
      className="rounded-lg w-fit h-fit backdrop-blur-3xl bg-gray-200"
    >
      <div className="relative w-full h-full flex-col flex justify-center items-center">
        <button className="absolute top-0 right-0">
          <XCircleIcon onClick={handleClose} className="w-7 cursor-pointer" />
        </button>
        <div className="mb-8 mt-8">
          {/* <Input
            placeholder="Enter Amount (ETH)"
            value={value}
            setValue={setValue}
          />
           */}
          {data?.type === "Buy" ? (
            <iframe
              src={`https://app.1inch.io/#/${chainId}/simple/swap/${primary}/${data?.address}`}
              className="border-none mx-auto mb-2 block rounded-xl max-w-[960px] min-w-[400px] h-[500px]"
            />
          ) : (
            <iframe
              src={`https://app.1inch.io/#/${chainId}/simple/swap/${data?.address}/${primary}`}
              className="border-none mx-auto mb-2 block rounded-xl max-w-[960px] min-w-[400px] h-[500px]"
            />
          )}
        </div>
      </div>
    </dialog>
  );
};

export default OneInchModal;
