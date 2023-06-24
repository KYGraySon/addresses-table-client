import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import Profile from "./Profile";
import WalletModal from "./Modal/WalletModal";

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { disconnect } = useDisconnect();

  const handleOpen = () => {
    const modal = document.querySelector("[data-modal]");
    modal.showModal();
  };

  const handleClose = () => {
    const modal = document.querySelector("[data-modal]");
    modal.close();
  };

  if (isConnected)
    return (
      <>
        <button className="mt-3">
          <Profile onClick={handleOpen} ensName={ensName} address={address} />
        </button>
        <WalletModal
          handleDisconnect={() => disconnect()}
          handleClose={handleClose}
        />
      </>
    );
  return (
    <button
      className="px-3 py-2 bg-sky-600 rounded-xl active:ring-4 transform active:scale-90 transition-transform delay-75"
      onClick={() => connect()}
    >
      Connect Wallet
    </button>
  );
}
