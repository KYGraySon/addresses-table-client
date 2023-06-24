import { ArrowDownIcon, DocumentIcon, ArrowUpIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
import { useMemo } from "react";

const HistoryCard = ({ data }) => {
  const logo = useMemo(() => {
    return data?.chain === "ethereum" ? "/weth.png" : "/pancake.png";
  }, [data]);

  const multiplier = useMemo(() => {
    if (data?.type === "Send") return "-";
    else if (data?.type === "Receive") return "+";
    else return;
  }, [data]);

  const Type = ({ type }) => {
    if(type === 'Receive') {
    return <ArrowDownIcon className="rounded-full p-2 bg-gray-200/60 w-9 text-green-600" />
    } else if(type === 'Send') {
      return <ArrowUpIcon className="rounded-full p-2 bg-gray-200/60 w-9 text-red-600" />
      } else if(type === 'Transfer') {
        return <ArrowUpIcon className="rounded-full p-2 bg-gray-200/60 w-9 text-red-600" />
        } else if(type === 'Trade') {
        return <ArrowsRightLeftIcon className="rounded-full p-2 bg-gray-200/60 w-9" />
        } else if(type === 'Approve') {
          return <DocumentIcon className="rounded-full p-2 bg-gray-200/60 w-9 text-" />
          } 
          else {
            return <div></div>
          }
  }

  return (
    <div className="flex justify-between flex-row">
      <div className="flex flex-row space-x-4">
        <div className="relative">
          <Type type={data?.type} />
          <img src={logo} className="w-3 absolute bottom-0 right-0" alt="chain" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{data?.type}</span>
          <span className="text-xs font-light">{data?.date}</span>
        </div>
      </div>
      <div className="flex flex-col">
        {data?.type === "Trade" ? (
          <span className="text-sm font-light">
            -{data?.amount} {data?.asset}
          </span>
        ) : (
          <span className="text-sm font-light">
            {multiplier}
            {data?.amount} {data?.asset}
          </span>
        )}
        {data?.type === "Trade" ? (
          <span className="text-xs font-extralight">
            {"+"}
            {data.recieved && `${data.recieved} ${data?.token}`}
          </span>
        ) : (
          <span className="text-xs">
            {" "}
            {data.recieved && `${data.recieved} ${data?.token}`}
          </span>
        )}
      </div>
    </div>
  );
};

export default HistoryCard;
