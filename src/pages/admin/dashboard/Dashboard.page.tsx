import { useLoader } from "../../../core/context/LoaderContext";
import moment from "moment";
import { toast } from "react-toastify";
import { getAll } from "../../../core/firebase/firebase.service";
import { Quote } from "../../../interface/quotes";
import { useEffect, useState } from "react";

import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { showLoader, hideLoader } = useLoader();
  const [quoteData, setQuoteData] = useState<{ [key: string]: number }>({
    pending: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
  });
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>(
    new Array(12).fill(0)
  );
  const [totalRevenue, setTotalRevenue] = useState<number>(0); // New state for total revenue
  const [monthlyStatusData, setMonthlyStatusData] = useState(
    Array.from({ length: 12 }, () => ({
      pending: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
    }))
  );
  const [selectedYear, setSelectedYear] = useState(moment().year()); // Initialize with the current year

  const fetchAllQuotes = async (year: number) => {
    try {
      showLoader();

      const { data } = await getAll<Quote>("quotes", {
        filters: [
          {
            field: "created_at",
            operator: ">=",
            value: moment().year(year).startOf("year").format(),
          },
          {
            field: "created_at",
            operator: "<=",
            value: moment().year(year).endOf("year").format(),
          },
        ],
        sort: { field: "created_at", direction: "desc" },
        limit: 1000,
      });

      const statusCount = {
        pending: 0,
        inProgress: 0,
        completed: 0,
        cancelled: 0,
      };

      const monthlyRevenueData = new Array(12).fill(0);
      const monthlyStatus = Array.from({ length: 12 }, () => ({
        pending: 0,
        inProgress: 0,
        completed: 0,
        cancelled: 0,
      }));

      data.forEach((quote) => {
        const updatedMonth = moment(quote.updated_at).month(); // 0 for Jan, 11 for Dec
        const status = quote.status.toLowerCase();

        // Update revenue
        if (quote.price && quote.status === "completed") {
          monthlyRevenueData[updatedMonth] += Number(quote.price);
        }

        // Update status count
        if (status === "pending") {
          statusCount.pending++;
          monthlyStatus[updatedMonth].pending++;
        }
        if (status === "in-progress") {
          statusCount.inProgress++;
          monthlyStatus[updatedMonth].inProgress++;
        }
        if (status === "completed") {
          statusCount.completed++;
          monthlyStatus[updatedMonth].completed++;
        }
        if (status === "cancelled") {
          statusCount.cancelled++;
          monthlyStatus[updatedMonth].cancelled++;
        }
      });

      setQuoteData(statusCount);
      setMonthlyRevenue(monthlyRevenueData);
      setTotalRevenue(monthlyRevenueData.reduce((sum, revenue) => sum + revenue, 0)); // Calculate total revenue
      setMonthlyStatusData(monthlyStatus);
    } catch (error) {
      toast.error("Failed to fetch quotes");
      console.error("Error fetching quotes:", error);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchAllQuotes(selectedYear); // Fetch data for the initial year
  }, [selectedYear]);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };

  const revenueChartData = {
    labels: moment.months(),
    datasets: [
      {
        label: "Revenue Generated",
        data: monthlyRevenue,
        backgroundColor: "rgba(0, 123, 255, 0.2)", // Blue (light fill)
        borderColor: "rgba(0, 123, 255, 1)", // Blue (line color)
        borderWidth: 2,
        pointBackgroundColor: "rgba(0, 123, 255, 1)",
        pointBorderColor: "#fff",
        tension: 0.4, // Smooth curve
      },
    ],
  };

  const statusChartData = {
    labels: moment.months(),
    datasets: [
      {
        label: "Pending",
        data: monthlyStatusData.map((month) => month.pending),
        backgroundColor: "rgba(255, 204, 0, 0.6)", // Yellow
        borderColor: "rgba(255, 204, 0, 1)",
        borderWidth: 1,
      },
      {
        label: "In-progress",
        data: monthlyStatusData.map((month) => month.inProgress),
        backgroundColor: "rgba(0, 123, 255, 0.6)", // Blue
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Completed",
        data: monthlyStatusData.map((month) => month.completed),
        backgroundColor: "rgba(40, 167, 69, 0.6)", // Green
        borderColor: "rgba(40, 167, 69, 1)",
        borderWidth: 1,
      },
      {
        label: "Cancelled",
        data: monthlyStatusData.map((month) => month.cancelled),
        backgroundColor: "rgba(220, 53, 69, 0.6)", // Red
        borderColor: "rgba(220, 53, 69, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="m-4 mb-20 lg:mb-0">
      <div className="text-2xl font-bold mb-4">Dashboard</div>

      {/* Year Selector */}
      <div className="mb-6">
        <label htmlFor="year-select" className="font-semibold mr-2">
          Select Year:
        </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={handleYearChange}
          className="p-2 border rounded-lg"
        >
          {Array.from(
            { length: moment().year() - 2021 },
            (_, i) => 2022 + i
          ).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

       {/* Status Summary */}
       <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 my-4">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="text-lg font-bold mb-2 uppercase text-softYellow-500">
            Pending
          </div>
          <div className="text-4xl font-extrabold text-softYellow-600">
            {quoteData.pending || 0}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="text-lg font-bold mb-2 uppercase text-brightBlue-500">
            In Progress
          </div>
          <div className="text-4xl font-extrabold text-brightBlue-600">
            {quoteData.inProgress || 0}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="text-lg font-bold mb-2 uppercase text-green-500">
            Completed
          </div>
          <div className="text-4xl font-extrabold text-green-600">
            {quoteData.completed || 0}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="text-lg font-bold mb-2 uppercase text-red-500">
            Cancelled
          </div>
          <div className="text-4xl font-extrabold text-red-600">
            {quoteData.cancelled || 0}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="text-lg font-bold mb-2 uppercase text-purple-500">
            Total Revenue
          </div>
          <div className="text-4xl font-extrabold text-purple-600">
            ₹{totalRevenue.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 pb-16 mb-6 h-96">
        <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
        <Line
          options={{ responsive: true, maintainAspectRatio: false }}
          data={revenueChartData}
        />
      </div>

      {/* Status Data Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 pb-16 h-96">
        <h3 className="text-lg font-semibold mb-4">Monthly Status Data</h3>
        <Bar
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
          data={statusChartData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
