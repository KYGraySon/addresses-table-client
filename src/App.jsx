import "./App.css";
import Balance from "./components/Balance";
import { ConnectWallet } from "./components/ConnectWallet";
import Table from "./components/Table";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const goToAnalytics = async () => {
    navigate(`/address`);
  };

  return (
    <div className="min-h-screen flex-col text-white bg-black flex justify-center items-center relative">
      {/* <div className="top-3 absolute">
        <ConnectWallet />
      </div>
      <div className="top-20 absolute">
        <Balance />
      </div>
      <div className="overflow-x-auto scrollbar-hide px-3 w-full h-full lg:w-fit lg:h-fit mt-12">
        <Table />
      </div> */}
      <div
        onClick={goToAnalytics}
        className="ring-2 ring-white px-10 py-6 text-2xl rounded-lg cursor-pointer"
      >
        Go To Analytics
      </div>
    </div>
  );
}

export default App;
