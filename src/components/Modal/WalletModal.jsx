import { XCircleIcon } from "@heroicons/react/24/outline";

const WalletModal = ({ handleClose, handleDisconnect }) => {
  return (
    <dialog
      data-modal
      className="rounded-lg w-72 h-44 backdrop-blur-3xl bg-gray-100"
    >
      <div className="relative w-full h-full flex justify-center items-center">
        <button className="absolute top-0 right-0">
          <XCircleIcon onClick={handleClose} className="w-7 cursor-pointer" />
        </button>
        <button
          onClick={handleDisconnect}
          className="bg-red-500 px-4 py-2 text-white rounded-lg"
        >
          Disconnect
        </button>
      </div>
    </dialog>
  );
};

export default WalletModal;
