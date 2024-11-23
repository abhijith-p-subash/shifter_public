import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Pagination,
  TextInput,
  Select,
  Button,
} from "flowbite-react";

import { useEffect, useState } from "react";
import { getAll } from "../../../core/firebase/firebase.service";
import { Quote, Status } from "../../../interface/quotes";
import moment from "moment";
import { WhereFilterOp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { MdEdit, MdDelete, MdEmail } from "react-icons/md";
import { toast } from "react-toastify";

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

const Quotes = () => {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState<Quote[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const onPageChange = (page: number) => setCurrentPage(page);

  // Function to handle search input change
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log("SEARCH TERM", searchTerm, e.target.value);
  };

  // Function to handle status filter change
  const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
    console.log("SELECTED STATUS", selectedStatus, e.target.value);
  };

  // Fetch quotes with filters, search, and pagination
  const fetchAllQuotes = async () => {
    try {
      // showLoader();
      const filters: {
        field: string;
        operator: WhereFilterOp;
        value: unknown;
      }[] = [];

      if (searchTerm) {
        filters.push({
          field: "name",
          operator: "array-contains",
          value: searchTerm,
        });
      }

      if (selectedStatus) {
        filters.push({
          field: "status",
          operator: "==",
          value: selectedStatus,
        });
      }

      const { data, count, limit } = await getAll<Quote>("quotes", {
        filters,
        sort: { field: "created_at", direction: "desc" },
        limit: 10,
      });

      console.log("data", data, "count", count, "limit", limit);

      setDataSource(data);
      setTotalPages(Math.ceil(count / 10));
    } catch (error) {
      toast.error("Failed to fetch quotes", {
        autoClose: 5000,
      });
      console.error("Error fetching quotes:", error);
    }
  };

  useEffect(() => {
    fetchAllQuotes();
  }, []);

  return (
    <div className="m-6">
      <div className="text-2xl font-bold">Quotes</div>
      <div className="bg-white rounded-lg shadow-md p-4 my-4">
        {/* Filter/Search Section */}
        <div className="flex flex-wrap gap-4 mb-4">
          <TextInput
            id="search"
            type="text"
            placeholder="Search..."
            className="w-full sm:w-[200px] rounded-md"
            value={searchTerm}
            onChange={onSearchChange}
          />
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
          <Button
            color="primary"
            className="w-full sm:w-auto"
            onClick={fetchAllQuotes}
          >
            Apply
          </Button>
          <Button
            outline
            color="primary"
            className="w-full sm:w-auto"
            onClick={() => {
              setSearchTerm("");
              setSelectedStatus("");
            }}
          >
            Clear
          </Button>
        </div>

        {/* Table View (Large Screens) */}
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
                    <TableCell>{index + 1 || "--"}</TableCell>
                    <TableCell className="whitespace-nowrap font-medium dark:text-white">
                      {quote.name}
                    </TableCell>
                    <TableCell>{quote.email || "--"}</TableCell>
                    <TableCell>{quote.phone || "--"}</TableCell>
                    <TableCell>{quote.locationFrom || "--"}</TableCell>
                    <TableCell>{quote.locationTo || "--"}</TableCell>
                    <TableCell>
                      {moment(quote.date).format("DD MMM YYYY") || "--"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full uppercase
                      ${
                        quote.status === Status.PENDING
                          ? "bg-yellow-200 text-yellow-800"
                          : ""
                      }
                      ${
                        quote.status === Status.COMPLETED
                          ? "bg-green-200 text-green-800"
                          : ""
                      }
                      ${
                        quote.status === Status.IN_PROGRESS
                          ? "bg-blue-200 text-blue-800"
                          : ""
                      }
                      ${
                        quote.status === Status.CANCELLED
                          ? "bg-red-200 text-red-800"
                          : ""
                      }
                      ${
                        quote.status === Status.QUOTE_SENT
                          ? "bg-purple-200 text-purple-800"
                          : ""
                      }`}
                      >
                        {quote.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          color="primary"
                          size="xs"
                          onClick={() => navigate(`/quotes/${quote.id}`)}
                        >
                          {" "}
                          <MdEdit className="w-5 h-5" />{" "}
                        </Button>
                        <Button
                          color="green"
                          size="xs"
                          onClick={() => navigate(`/quotes/${quote.id}`)}
                        >
                          {" "}
                          <MdEmail className="w-5 h-5" />{" "}
                        </Button>
                        <Button
                          color="red"
                          size="xs"
                          onClick={() => navigate(`/quotes/${quote.id}`)}
                        >
                          {" "}
                          <MdDelete className="w-5 h-5" />{" "}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="bg-white dark:bg-gray-800 text-center w-full">
                  NOT DATA FOUND
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Card View (Small Screens) */}
        <div className="block lg:hidden">
          {dataSource.length > 0
            ? dataSource.map((quote) => (
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
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full uppercase
                  ${
                    quote.status === Status.PENDING
                      ? "bg-yellow-200 text-yellow-800"
                      : ""
                  }
                  ${
                    quote.status === Status.COMPLETED
                      ? "bg-green-200 text-green-800"
                      : ""
                  }
                  ${
                    quote.status === Status.IN_PROGRESS
                      ? "bg-blue-200 text-blue-800"
                      : ""
                  }
                  ${
                    quote.status === Status.CANCELLED
                      ? "bg-red-200 text-red-800"
                      : ""
                  }
                  ${
                    quote.status === Status.QUOTE_SENT
                      ? "bg-purple-200 text-purple-800"
                      : ""
                  }`}
                    >
                      {quote.status}
                    </span>
                  </p>
                  <div className="mt-2">
                    <Button size="sm">Edit</Button>
                  </div>
                </div>
              ))
            : "No quotes found"}
        </div>

        {/* Pagination */}
        <div className="m-6">
          <Pagination
            layout="table"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            showIcons
          />
          {/* <Pagination
            layout="navigation"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Quotes;
