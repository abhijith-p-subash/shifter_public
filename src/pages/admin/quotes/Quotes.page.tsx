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
  const [currentPage, setCurrentPage] = useState(1);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const onPageChange = (page: number) => setCurrentPage(page);

  const fetchAllQuotes = async () => {
    try {
      const quotesData = await getAll<Quote>("quotes", {
        sort: { field: "created_at", direction: "desc" },
        limit: 10,
      });
      setQuotes(quotesData);
    } catch (error) {
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
          />
          <Select id="filter" required className="w-full sm:w-[200px] rounded-md">
            <option value="">Filter</option>
            <option value="in-progress">In-Progress</option>
            <option value="quote-sent">Quote Sent</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          
          </Select>
          <Button color="primary" className="w-full sm:w-auto">
            Apply
          </Button>
          <Button outline color="primary" className="w-full sm:w-auto">
            Clear
          </Button>
        </div>

        {/* Table View (Large Screens) */}
        <div className="hidden md:block overflow-x-auto">
          <Table hoverable>
            <TableHead>
              {header.map((head, index) => (
                <TableHeadCell key={index}>{head}</TableHeadCell>
              ))}
            </TableHead>
            <TableBody className="divide-y">
              {quotes.map((quote, index) => (
                <TableRow key={index} className="bg-white dark:bg-gray-800">
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
                    <a
                      href="#"
                      className="font-medium text-cyan-600 hover:underline"
                    >
                      Edit
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Card View (Small Screens) */}
        <div className="block md:hidden">
          {quotes.map((quote, index) => (
            <div
              key={index}
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
                <strong>Date:</strong> {moment(quote.date).format("DD MMM YYYY") || "--"}
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
          ))}
        </div>

        {/* Pagination */}
        <div className="m-6">
          <Pagination
            layout="table"
            currentPage={currentPage}
            totalPages={100}
            onPageChange={onPageChange}
            showIcons
          />
        </div>
      </div>
    </div>
  );
};

export default Quotes;
