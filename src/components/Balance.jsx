import { useAccount, useBalance } from "wagmi";

const Balance = () => {
  const { address } = useAccount();
  const { data: ethBal } = useBalance({
    address,
    watch: true,
    chainId: 1,
  });

  const { data: bscBal } = useBalance({
    address,
    watch: true,
    chainId: 56,
  });

  return (
    <>
      <div className="text-white shadow text-xl">
        Balance:
        <span className="ml-2">
          {ethBal?.formatted ? (
            <>
              {Number(ethBal?.formatted).toFixed(4)}
              {ethBal?.symbol}
            </>
          ) : (
            0
          )}
        </span>
        <span className="ml-2 border-r-2"></span>
        <span className="ml-2">
          {bscBal?.formatted ? (
            <>
              {Number(bscBal?.formatted).toFixed(4)}
              {bscBal?.symbol}
            </>
          ) : (
            0
          )}
        </span>
      </div>
    </>
  );
};

export default Balance;
