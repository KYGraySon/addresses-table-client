import { XCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useMemo } from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";


const BuyModal = ({ handleClose, handleBuy, data }) => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  // useEffect(() => {
  //   if (data?.exchange === "Uniswap") {
  //     if (!switchNetwork || 1 === chain?.id) {
  //       return;
  //     } else {
  //       switchNetwork?.(1);
  //     }
  //   } else {
  //     if (!switchNetwork || 56 === chain?.id) {
  //       return;
  //     } else {
  //       switchNetwork?.(56);
  //     }
  //   }
  // }, [chain?.id, data, switchNetwork]);

  const ethTokens = useMemo(() => {
    if(data?.type === 'Buy') {
      return ['ETH', data?.address]
    } else {
      return [data?.address, 'ETH']
    }
  }, [data])

  const bscTokens = useMemo(() => {
    if(data?.type === 'Buy') {
      return ['BNB', data?.address]
    } else {
      return [data?.address, 'BNB']
    }
  }, [data])

  const amount = 1

  return (
    <dialog
      data-buy
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
          {data?.exchange === "Uniswap" ? (
            <iframe
              src={`https://app.uniswap.org/#/swap?exactField=input&exactAmount=${amount}&inputCurrency=${ethTokens[0]}&outputCurrency=${ethTokens[1]}`}
              className="border-none mx-auto mb-2 block rounded-xl max-w-[960px] min-w-[400px] h-[500px]"
            />
          ) : (
            <iframe
              src={`https://pancakeswap.finance/swap?exactField=input&exactAmount=${amount}&inputCurrency=${bscTokens[0]}&outputCurrency=${bscTokens[1]}`}
              className="border-none mx-auto mb-2 block rounded-xl max-w-[960px] min-w-[400px] h-[500px]"
            />
          )}
        </div>
      </div>
    </dialog>
  );
};

export default BuyModal;
