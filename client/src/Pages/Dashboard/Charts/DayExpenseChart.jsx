import React, { useContext, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import ErrorBoundary from "../../../Components/ErrorBoundary";
import { useExpenses } from "../../../hooks/useExpenses";

const DayExpenseChart = () => {
  const { data: expenses } = useExpenses();
  const [dayToDayExpense, setDayToDayExpense] = useState({
    series: [],
    options: {
      chart: {
        type: "bar",
        height: 400,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
        },
      },
      colors: [
        "#FF5733",
        "#33FF57",
        "#3357FF",
        "#FF33A1",
        "#FFA533",
        "#33FFF5",
        "#F533FF",
      ],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "top",
        labels: {
          colors: "black",
        },
      },
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        labels: {
          style: {
            colors: "black",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        min: 0,
        max: 5000,
        tickAmount: 5,
        labels: {
          style: {
            colors: "white",
            fontSize: "14px",
          },
        },
        title: {
          style: {
            color: "white",
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    },
  });

  const getAmountOfDay = (day) => {
    if (!Array.isArray(expenses)) return new Array(5).fill(0);
    const categories = ["fuel", "hospital", "food", "clothing", "other"];
    const dayMapping = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
    return categories.map((category) => {
      return expenses
        .filter((item) => {
          const expenseDay = new Date(item.date).getDay();
          return item.category === category && expenseDay === dayMapping[day];
        })
        .reduce((acc, val) => acc + (parseFloat(val.amount) || 0), 0);
    });
  };

  useEffect(() => {
    if (!Array.isArray(expenses)) {
      setDayToDayExpense((prev) => ({
        ...prev,
        series: [],
      }));
      return;
    }

    const categories = ["Fuel", "Hospital", "Food", "Clothing", "Other"];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const seriesData = categories.map((item, index) => ({
      name: item,
      data: days.map((day) => {
        const amount = getAmountOfDay(day)[index];
        console.log("amount ======= ", amount);

        return isNaN(amount) ? 0 : amount;
      }),
    }));

    console.log("Series data:", seriesData);

    setDayToDayExpense((prev) => ({
      ...prev,
      series: seriesData,
    }));
  }, [expenses]);

  console.log(dayToDayExpense.series);

  return (
    <div className="rounded-md text-black py-2">
      <ErrorBoundary>
        {dayToDayExpense.series.length > 0 ? (
          process.env.NODE_ENV === "test" ? (
            <div data-testid="mock-apex-chart">
              Mocked ApexChart for testing
            </div>
          ) : (
            <ReactApexChart
              options={dayToDayExpense.options}
              series={dayToDayExpense.series}
              height={300}
              type="bar"
            />
          )
        ) : (
          <p>No data available for the chart.</p>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default DayExpenseChart;
