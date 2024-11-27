/* eslint-disable react-hooks/exhaustive-deps */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Select,
  Button,
  Tooltip,
} from "flowbite-react";

import { useEffect, useState } from "react";
import { deleteById, getAll } from "../../../core/firebase/firebase.service";
import { Quote, Status } from "../../../interface/quotes";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useLoader } from "../../../core/context/LoaderContext";
import { Filters } from "../../../interface/core";
import { useModal } from "../../../core/context/ModalContext";

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
  const [lastVisibleDocument, setLastVisibleDocument] = useState<Quote | null>(
    null
  );
  const { showLoader, hideLoader } = useLoader();
  const { showModal } = useModal();

  const onFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const resetFilters = () => {
    setSelectedStatus("");
    setCurrentPage(1); // Reset to the first page
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
        offset: lastVisibleDocument,
      });

      setLastVisibleDocument(data[data.length - 1]);
      console.log(data);
      setDataSource(data);
      setTotalPages(Math.ceil(count / 10));
    } catch (error) {
      toast.error("Failed to fetch quotes");
      console.error("Error fetching quotes:", error);
    } finally {
      hideLoader();
    }
  };

  const deleteDoc = async (id: string) => {
    try {
      const confirmed = await showModal(
        "failure",
        "Are you sure you want to delete this item?"
      );
      if (confirmed) {
        showLoader();
        await deleteById("quotes", id);
        toast.success("Quote deleted successfully");
        fetchAllQuotes();
      }
    } catch (error) {
      toast.error("Failed to delete quote");
      console.error("Error deleting quote:", error);
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
    <div className="m-4">
      <div className="text-2xl font-bold mb-4">Quotes</div>
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* Filter Section */}
        <div className="flex flex-wrap gap-4 mb-6 ">
          <Select
            id="filter"
            required
            color="light"
            className="w-full sm:w-[300px] rounded-md"
            value={selectedStatus}
            onChange={onFilterChange}
          >
            <option value="">Filter</option>
            <option value="in-progress">In-Progress</option>
            {/* <option value="quote-sent">Quote Sent</option> */}
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </Select>
          <Button color="light" onClick={resetFilters}>
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
                    <TableCell className="font-medium hover:underline">
                      <Link to={`/quotes/${quote.id}`}>{quote.name}</Link>
                    </TableCell>
                    <TableCell>{quote.email || "--"}</TableCell>
                    <TableCell>{quote.phone || "--"}</TableCell>
                    <TableCell>{quote.locationFrom || "--"}</TableCell>
                    <TableCell>{quote.locationTo || "--"}</TableCell>
                    <TableCell>
                      {moment(quote.date).format("DD MMM YYYY") || "--"}
                    </TableCell>
                    <TableCell>{renderStatusBadge(quote.status)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Tooltip content="View">
                          <Button
                            size="xs"
                            color="light"
                            onClick={() => navigate(`/quotes/${quote.id}`)}
                          >
                            <FaRegEye className="w-5 h-5" />
                          </Button>
                        </Tooltip>
                        {/* <Tooltip content="Send Quotes">
                          <Button
                            size="xs"
                            color="green"
                            onClick={() => navigate(`/quotes/${quote.id}`)}
                          >
                            <MdEmail className="w-5 h-5" />
                          </Button>
                        </Tooltip> */}
                        <Tooltip content="Delete">
                          <Button
                            size="xs"
                            color="red"
                            onClick={() => deleteDoc(quote.id)}
                          >
                            <MdDelete className="w-5 h-5" />
                          </Button>
                        </Tooltip>
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
        <div className="block lg:hidden mb-10">
          {dataSource.length > 0 ? (
            dataSource.map((quote) => (
              <div
                key={quote.id}
                className="bg-white shadow-lg rounded-md p-4 mb-4 border"
              >
                <h2
                  className="text-lg font-semibold mb-2 hover:underline cursor-pointer"
                  onClick={() => navigate(`/quotes/${quote.id}`)}
                >
                  {quote.name}
                </h2>
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {/* <Tooltip content="View">
                          <Button
                            size="xs"
                            color="light"
                            onClick={() => navigate(`/quotes/${quote.id}`)}
                          >
                            <MdEdit className="w-5 h-5" />
                          </Button>
                        </Tooltip> */}
                  {/* <Tooltip content="Send Quotes">
                    <Button
                      size="xs"
                      color="green"
                      onClick={() => navigate(`/quotes/${quote.id}`)}
                    >
                      <MdEmail className="w-5 h-5" />
                    </Button>
                  </Tooltip> */}
                  <Tooltip content="Delete">
                    <Button
                      size="xs"
                      color="red"
                      onClick={() => deleteDoc(quote.id)}
                    >
                      <MdDelete className="w-5 h-5" />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            ))
          ) : (
            <div>No quotes found</div>
          )}
        </div>

        {/* Pagination */}
        <div className="hidden md:block">
          <div className=" my-4 w-full flex justify-start">
            <div className="flex">
              <Button
                size="sm"
                color="light"
                className="rounded-r-none rounded-l-full bg-none"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => prev - 1);
                  fetchAllQuotes();
                }}
              >
                Previous
              </Button>

              <Button
                size="sm"
                color="light"
                className="border-l-0 rounded-l-none rounded-r-full bg-none"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                  fetchAllQuotes();
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        <div className="block md:hidden fixed bottom-20 right-4 z-10">
          <div className="flex">
            <Button
              size="sm"
              color="light"
              className=" rounded-r-none  rounded-l-full bg-none"
            >
              Previous
            </Button>
            <Button
              size="sm"
              color="light"
              className="border-l-0 rounded-l-none  rounded-r-full bg-none"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quotes;
