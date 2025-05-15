import React from "react";
import GoalChart from "./Charts/GoalChart";
import { LuGoal } from "react-icons/lu";
import { useGoals } from "../../hooks/useExpenses";
import useUIStore from "../../store/useUIForm";
import { TbExternalLink } from "react-icons/tb";
import { Link } from "react-router-dom";

const GoalsPreview = () => {
  const { data: goals } = useGoals();
  const { setShowForm } = useUIStore();

  const goalPercentages = goals?.map((goal) => {
    return ((goal.saved / goal.target) * 100).toFixed(0); // or .toFixed(2) if you want decimals
  });

  console.log(goalPercentages);

  return (
    <div className=" border border-gray-700 rounded-lg w-[95%] md:w-[95%] bg-[#0f172a] min-h-[200px] max-h-[420px] overflow-y-auto scroll-bar">
      <div className="flex justify-between items-center border-b border-gray-700">
        <h1 className="my-2 pb-2 pl-4 ">
          Goals <span className="text-gray-300">({goals?.length})</span>
        </h1>
        <button
          className="text-blue-500 text-2xl mr-4 "
          onClick={() => setShowForm("goal")}
        >
          +
        </button>
      </div>
      <div className="flex  items-center w-full gap-6 mt-4">
        <div className="ml-4 bg-gray-800 rounded-2xl p-3">
          <GoalChart goals={goals} />
        </div>
        <div className="w-full max-h-[300px] overflow-y-auto scroll-bar mt-2">
          {goals?.map((goal) => {
            const percentage = (goal.saved / goal.target) * 100;
            const barColor = percentage < 10 ? "bg-orange-500" : percentage >= 75 ? "bg-green-600" : "bg-yellow-400";
            return (
              <div
                className="flex items-center justify-between max-w-xl w-full gap-4 mb-6"
                key={goal.id}
              >
                <div className="flex items-center gap-4">
                  <span className="rounded-full bg-green-500 p-3 text-xl">
                    <LuGoal />
                  </span>
                  <div className="flex flex-col">
                    <h4> {goal.name} </h4>
                    <p>
                      End date:{" "}
                      {goal?.deadline &&
                        new Date(goal.deadline).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                    </p>
                  </div>
                </div>
                <div className="min-w-44">
                  <div className="flex justify-between gap-8 w-full">
                    <span>
                      {(goal.saved / goal.target) * 100 === 100
                        ? "closed"
                        : "on track"}
                    </span>
                    <span>
                      {((goal.saved / goal.target) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-600 w-full rounded-xl">
                    <div
                      style={{
                        width: `${(goal.saved / goal.target) * 100}%`,
                      }}
                      className={`${barColor} h-2 rounded-xl transition-all duration-300`}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
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
