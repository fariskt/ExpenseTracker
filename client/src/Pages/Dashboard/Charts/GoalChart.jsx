import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useGoals } from "../../../hooks/useExpenses";

const GoalChart = ({goals}) => {  
  const { onTrack, offTrack, closed, atRisk } = goals.reduce(
    (acc, goal) => {
      const { saved, target, deadline } = goal;

      if (saved >= target) {
        acc.closed++;
      } else {
        const now = new Date();
        const deadlineDate = new Date(deadline);

        const progress = saved / target;

        if (deadlineDate < now) {
          acc.offTrack++;
        } else if (progress >= 0.75) {
          acc.onTrack++;
        } else if (progress >= 0.4) {
          acc.atRisk++;
        } else {
          acc.offTrack++;
        }
      }

      return acc;
    },
    { onTrack: 0, offTrack: 0, closed: 0, atRisk: 0 }
  );

  const [state, setState] = useState({
    series: [onTrack, offTrack, closed, atRisk],
    options: {
      chart: {
        width: 380,
        type: "donut",
      },
      labels: ["On Track", "Off Track", "Closed", "At Risk"],
      colors: ["#00E396", "#FF4560", "#775DD0", "#FEB019"],

      dataLabels: {
        enabled: true,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      legend: {
        position: "right",
        offsetY: 20,
        itemMargin: {
          vertical: 8,
          horizontal: 12,
        },
        height: 230,
        labels: {
          colors: "#ffffff", 
          useSeriesColors: false,
        },
      },
    },
  });

  
    if (!goals) {
    return;
  }

  return (
    <div>
      <div>
        <div className="chart-wrap ">
          <div id="chart">
            <h4 className="hidden md:block relative top-[130px] left-[110px]">Goals</h4>
            <ReactApexChart
              options={state.options}
              series={state.series}
              type="donut"
              width={380}
            />
          </div>
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default GoalChart;
