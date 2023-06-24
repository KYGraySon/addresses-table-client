import SearchBox from "./SearchBox";
import AssetsTab from "./User/AssetsTab";
import PerformanceTab from "./User/PerformanceTab";


const User = ({ id }) => {

  return (
    <div>
      <SearchBox />
      <PerformanceTab userId={id} />
      <AssetsTab />
    </div>
  );
};

export default User;
