import truncateEthAddress from "truncate-eth-address";

const Profile = ({ ensName, address, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-row justify-center items-center space-x-2 px-3 py-2 bg-sky-600 rounded-xl active:ring-4 transform active:scale-90 transition-transform delay-75"
    >
      <div className="ring-1 ring-white rounded-full p-[1px]">
        <img
          className="w- cursor-pointer rounded-full"
          src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${
            ensName ?? address
          }`}
          alt="avatar"
          width={20}
          height={20}
        />
      </div>
      <div>{ensName ?? truncateEthAddress(address)}</div>
    </div>
  );
};

export default Profile;
