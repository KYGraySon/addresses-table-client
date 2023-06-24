import "./App.css";
import Balance from "./components/Balance";
import { ConnectWallet } from "./components/ConnectWallet";
import Table from "./components/Table";

function App() {
  
  return (
    <div className="min-h-screen flex-col text-white bg-black flex justify-center items-center relative">
      <div className="top-3 absolute">
        <ConnectWallet />
      </div>
      <div className="top-20 absolute">
        <Balance />
      </div>
      <div className="overflow-x-auto scrollbar-hide px-3 w-full h-full lg:w-fit lg:h-fit mt-12">
        <Table />
      </div>
    </div>
  );
}

export default App;
