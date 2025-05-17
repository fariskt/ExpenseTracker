import GoalChart from "./Charts/GoalChart";
import { LuGoal } from "react-icons/lu";
import { useGoals } from "../../hooks/useExpenses";
import useUIStore from "../../store/useUIForm";
import { TbExternalLink } from "react-icons/tb";
import { Link } from "react-router-dom";
import PulseLoader from "../../Components/ui/PulseLoader";

const GoalsPreview = () => {
  const { data: goals, isLoading } = useGoals();
  const { setShowForm } = useUIStore();

  if (!goals) {
    return;
  }

  return (
    <div className=" border border-gray-400 rounded-lg w-[95%] md:w-[95%] min-h-[200px] max-h-[420px] overflow-y-auto scroll-bar">
      <div className="flex justify-between items-center border-b border-gray-400">
        <h1 className="my-3 pl-4 ">
          Goals <span className="text-gray-500">({goals?.length})</span>
        </h1>
        <button
          className="text-blue-500 text-2xl mr-4 "
          onClick={() => setShowForm("goal")}
        >
          +
        </button>
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center w-full gap-6 mt-4">
        <div className="md:ml-8 border border-gray-200 rounded-2xl p-3">
          <GoalChart goals={goals} />
        </div>
        <div className="w-full max-h-[300px] overflow-y-auto scroll-bar mt-2">
          {isLoading ? (
            <div className="flex items-center justify-center mt-16">
              <PulseLoader />
            </div>
          ) : (
            goals?.map((goal, index) => {
              const percentage = (goal.saved / goal.target) * 100;
              const barColor =
                percentage < 10
                  ? "bg-orange-500"
                  : percentage >= 75
                  ? "bg-green-600"
                  : "bg-yellow-400";
              const barColorMobile =
                percentage < 10
                  ? "text-orange-500"
                  : percentage >= 75
                  ? "text-green-600"
                  : "text-yellow-400";

              return (
                <div
                  className="flex flex-col md:flex-row md:ml-8 md:items-center justify-between md:max-w-2xl max-w-[85%] mx-auto  w-full gap-4 mb-6"
                  key={goal.id}
                >
                  <div className="flex items-center  justify-between gap-4">
                    <span className="rounded-full bg-green-300 p-3 text-xl">
                      <LuGoal />
                    </span>
                    <div className="flex flex-col">
                      <h4> {goal.name} </h4>
                      <p className="text-sm text-gray-400">
                        End date:{" "}
                        {goal?.deadline &&
                          new Date(goal.deadline).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                      </p>
                    </div>
                    <div className="md:hidden block relative w-14 h-14">
                      <svg className="transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-gray-600"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={barColorMobile}
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray={`${percentage}, 100`}
                          d="M18 2.0845
         a 15.9155 15.9155 0 0 1 0 31.831
         a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-xs">
                        <span>{percentage.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block md:min-w-44">
                    <div className="flex justify-between gap-8 md:w-full ">
                      <span>
                        {(goal.saved / goal.target) * 100 === 100
                          ? "closed"
                          : "on track"}
                      </span>
                      <span>
                        {((goal.saved / goal.target) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-300 w-full rounded-xl">
                      <div
                        style={{
                          width: `${(goal.saved / goal.target) * 100}%`,
                        }}
                        className={`${barColor} h-2 rounded-3xl transition-all duration-300`}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Link to="/goals">
        <div className="flex gap-2 items-center justify-end mr-5 cursor-pointer">
          <button className="my-3">view all</button>
          <span className="text-gray-400 ">
            <TbExternalLink />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default GoalsPreview;
