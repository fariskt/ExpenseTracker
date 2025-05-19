import ReactApexChart from 'react-apexcharts';
import { useBudgets, useExpenses } from '../../../hooks/useExpenses';
import PulseLoader from '../../../Components/ui/PulseLoader';


const BudgetTrackingChart = () => {
    const {data:budgets} = useBudgets()
    const {data:expenses} = useExpenses()

    if(!budgets || !expenses){
        return <PulseLoader/>
    }
  // Helper: Total spent in each category
  const getSpent = (category) => {
    return expenses?.filter(exp => exp.category.toLowerCase() === category.toLowerCase())
      .reduce((sum, exp) => sum + exp.amount, 0);
  };  

  const categories = budgets?.map(b => b.category);
  
  const spentData = budgets?.map(b => getSpent(b.category));
  const remainingData = budgets.map((b, idx) => {
    const remaining = b.limit - spentData[idx];
    return remaining > 0 ? remaining : 0;
  });

  const series = [
    {
      name: 'Spent',
      data: spentData
    },
    {
      name: 'Remaining',
      data: remainingData
    }
  ];
  console.log("spendaa ",spentData);
  

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
    },
    colors: ['#e6692c', '#34c969'],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '60%',
      }
    },
    dataLabels: {
      enabled: true
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories,
      title: {
        text: 'Amount'
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center'
    },
    tooltip: {
      y: {
        formatter: val => `$${val.toFixed(2)}`
      }
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: {
          height: 400
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        }
      }
    }]
  };

  return (
    <div className="rounded-xl w-[95%] p-5 border border-gray-400">
      <h2 className="text-xl font-semibold mb-4">Goal vs Saved</h2>
      <ReactApexChart options={options} series={series} type="bar" height={categories.length * 60 + 100} />
    </div>
  );
};

export default BudgetTrackingChart;
