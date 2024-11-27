import { useLoader } from "../../../core/context/LoaderContext";
import moment from "moment";
import { toast } from "react-toastify";
import { getAll } from "../../../core/firebase/firebase.service";
import { Quote } from "../../../interface/quotes";
import { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
  const [monthlyStatusData, setMonthlyStatusData] = useState(
    Array.from({ length: 12 }, () => ({
      pending: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
    }))
  );

  const fetchAllQuotes = async () => {
    try {
      showLoader();


      const { data } = await getAll<Quote>("quotes", {
        filters: [
          {
            field: "created_at",
            operator: ">=",
            value: moment().startOf("year").format(),
          },
          {
            field: "created_at",
            operator: "<=",
            value: moment().endOf("year").format(),
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
      setMonthlyStatusData(monthlyStatus);
    } catch (error) {
      toast.error("Failed to fetch quotes");
      console.error("Error fetching quotes:", error);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchAllQuotes();
  }, []);

  const revenueChartData = {
    labels: moment.months(), // ["January", "February", ..., "December"]
    datasets: [
      {
        label: "Revenue Generated",
        data: monthlyRevenue,
        backgroundColor: "rgba(0, 123, 255, 0.6)", // Blue
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
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
            cancelled
          </div>
          <div className="text-4xl font-extrabold text-red-600">
            {quoteData.cancelled || 0}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 pb-16  mb-6 h-96">
        <h3 className="text-xl font-semibold mb-4">Monthly Revenue</h3>
        <Bar
          data={revenueChartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>

      {/* Status Chart */}
      <div className="bg-white rounded-lg shadow-md p-4 pb-16  h-96">
        <h3 className="text-xl font-semibold mb-4">Monthly Status Breakdown</h3>
        <Bar
          data={statusChartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
