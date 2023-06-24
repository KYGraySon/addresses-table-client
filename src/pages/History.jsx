import { useNavigate, useParams } from "react-router-dom";
import HistoryCard from "../components/User/HistoryCard";
import { AnalyticsConsumer } from "../context/AnalyticsContext";
import { useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";

const History = () => {
  const { id } = useParams();
  const { history } = AnalyticsConsumer();
  const navigate = useNavigate();

  useEffect(() => {
    if (history.length === 0) {
      navigate(`/address/${id}`);
    }
  }, [history, navigate, id]);

  return (
    <div className="pb-32">
      <div className="text-center font-bold text-xl mt-10 mb-20">History</div>
      {history?.length > 0 ? (
        <div className="border mx-auto border-gray-400/60 p-2 relative shadow-lg rounded-lg w-[350px] lg:w-[520px] py-10 px-5">
          <div className="px-4 space-y-4">
            {history?.map((history, index) => (
              <HistoryCard data={history} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <Skeleton
            className="mx-auto w-[350px] lg:w-[700px] h-[3000px]"
            variant="text"
            height={600}
            sx={{ fontSize: "1rem" }}
          />
        </div>
      )}
    </div>
  );
};

export default History;
