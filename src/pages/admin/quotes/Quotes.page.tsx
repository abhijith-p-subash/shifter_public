import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Pagination,
} from "flowbite-react";

import { useEffect, useState } from "react";
import { getAll } from "../../../core/firebase/firebase.service";
import { Quote, Status } from "../../../interface/quotes";
import moment from "moment";

// Header fields for the table
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

  // Function to handle page change
  const onPageChange = (page: number) => setCurrentPage(page);

  // Fetch all quotes from Firestore
  const fetchAllQuotes = async () => {
    try {
      const quotesData = await getAll<Quote>("quotes", {
        sort: { field: "created_at", direction: "desc" },
        limit: 10,
      });
      setQuotes(quotesData);
      console.log("QUOTES", quotesData);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllQuotes();
  }, []);

  return (
    <div className="m-6">
     <div className="text-2xl font-bold">
      Quotes
     </div>
      <div className="bg-white rounded-lg shadow-md p-4 my-4">
      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            {header.map((head, index) => (
              <TableHeadCell key={index}>{head}</TableHeadCell>
            ))}
          </TableHead>
          <TableBody className="divide-y">
            {quotes.map((quote, index) => (
              <TableRow
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                 <TableCell>{index + 1 || '--'}</TableCell>
                <TableCell className="whitespace-nowrap font-medium  dark:text-white">
                  {quote.name}
                </TableCell>
                <TableCell>{quote.email || '--'}</TableCell>
                <TableCell>{quote.phone || '--'}</TableCell>
                <TableCell>{quote.locationFrom || '--'}</TableCell>
                <TableCell>{quote.locationTo || '--'}</TableCell>
                <TableCell>{moment(quote.date).format('DD MMM YYYY') || '--'}</TableCell>
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
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    Edit
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="m-6">
        <Pagination
          layout="table"
          currentPage={currentPage}
          totalPages={100} // Replace with actual total number of pages
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </div>
    </div>
  );
};

export default Quotes;
