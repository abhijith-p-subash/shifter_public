import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Pagination,
  Select,
  Button,
} from "flowbite-react";

import { useEffect, useState } from "react";
import { getAll } from "../../../core/firebase/firebase.service";
import { Quote, Status } from "../../../interface/quotes";
import moment from "moment";
import { useNavigate } from "react-router-dom";

import { MdEdit, MdDelete, MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import { useLoader } from "../../../core/context/LoaderContext";
import { Filters } from "../../../interface/core";

const header = [
  "Sl. No.",
  "Name",
  "Email",
  "Phone",
  "From",
  "To",
  "Date",
  "Status",
  "Action",
];

const statusStyles = {
  [Status.PENDING]: "bg-yellow-200 text-yellow-800",
  [Status.COMPLETED]: "bg-green-200 text-green-800",
  [Status.IN_PROGRESS]: "bg-blue-200 text-blue-800",
  [Status.CANCELLED]: "bg-red-200 text-red-800",
  [Status.QUOTE_SENT]: "bg-purple-200 text-purple-800",
};

const Quotes = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<Quote[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const { showLoader, hideLoader } = useLoader();

  const onPageChange = (page: number) => setCurrentPage(page);

  const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const resetFilters = () => {
    setSelectedStatus("");
    fetchAllQuotes();
  };

  const fetchAllQuotes = async () => {
    try {
      showLoader();
      const filters: Filters[] = selectedStatus
        ? [{ field: "status", operator: "==", value: selectedStatus }]
        : [];

      const { data, count } = await getAll<Quote>("quotes", {
        filters,
        sort: { field: "created_at", direction: "desc" },
        limit: 10,
      });

      setDataSource(data);
      setTotalPages(Math.ceil(count / 10));
    } catch (error) {
      toast.error("Failed to fetch quotes", { autoClose: 5000 });
      console.error("Error fetching quotes:", error);
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    fetchAllQuotes();
  }, [currentPage, selectedStatus]);

  const renderStatusBadge = (status: Status) => (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full uppercase ${
        statusStyles[status] || ""
      }`}
    >
      {status}
    </span>
  );

  return (
    <div className="m-6">
      <div className="text-2xl font-bold mb-4">Quotes</div>
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* Filter Section */}
        <div className="flex flex-wrap gap-4 mb-4">
          <Select
            id="filter"
            required
            className="w-full sm:w-[200px] rounded-md"
            value={selectedStatus}
            onChange={onFilterChange}
          >
            <option value="">Filter</option>
            <option value="in-progress">In-Progress</option>
            <option value="quote-sent">Quote Sent</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Select>
          <Button outline color="primary" onClick={resetFilters}>
            Clear
          </Button>
        </div>

        {/* Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <Table hoverable>
            <TableHead>
              {header.map((head) => (
                <TableHeadCell key={head}>{head}</TableHeadCell>
              ))}
            </TableHead>
            <TableBody className="divide-y">
              {dataSource.length > 0 ? (
                dataSource.map((quote, index) => (
                  <TableRow
                    key={quote.id}
                    className="bg-white dark:bg-gray-800"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{quote.name}</TableCell>
                    <TableCell>{quote.email || "--"}</TableCell>
                    <TableCell>{quote.phone || "--"}</TableCell>
                    <TableCell>{quote.locationFrom || "--"}</TableCell>
                    <TableCell>{quote.locationTo || "--"}</TableCell>
                    <TableCell>
                      {moment(quote.date).format("DD MMM YYYY") || "--"}
                    </TableCell>
                    <TableCell>{renderStatusBadge(quote.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="xs"
                          color="primary"
                          onClick={() => navigate(`/quotes/${quote.id}`)}
                        >
                          <MdEdit className="w-5 h-5" />
                        </Button>
                        <Button
                          size="xs"
                          color="green"
                          onClick={() => navigate(`/quotes/${quote.id}`)}
                        >
                          <MdEmail className="w-5 h-5" />
                        </Button>
                        <Button
                          size="xs"
                          color="red"
                          onClick={() => navigate(`/quotes/${quote.id}`)}
                        >
                          <MdDelete className="w-5 h-5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={header.length} className="text-center">
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Card View for Small Screens */}
        <div className="block lg:hidden">
          {dataSource.length > 0 ? (
            dataSource.map((quote) => (
              <div
                key={quote.id}
                className="bg-white shadow-lg rounded-md p-4 mb-4 border"
              >
                <h2 className="text-lg font-semibold mb-2">{quote.name}</h2>
                <p className="text-sm text-gray-600">
                  <strong>Email:</strong> {quote.email || "--"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {quote.phone || "--"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>From:</strong> {quote.locationFrom || "--"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>To:</strong> {quote.locationTo || "--"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong>{" "}
                  {moment(quote.date).format("DD MMM YYYY") || "--"}
                </p>
                <p className="text-sm">
                  <strong>Status:</strong> {renderStatusBadge(quote.status)}
                </p>
                <div className="mt-2">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/quotes/${quote.id}`)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div>No quotes found</div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination
            layout="table"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </div>
    </div>
  );
};

export default Quotes;
