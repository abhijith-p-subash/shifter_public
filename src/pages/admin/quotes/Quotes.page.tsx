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

// Header fields for the table
const header = [
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
    <div className="bg-white m-6 rounded-lg shadow-md p-4">
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
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {quote.name}
                </TableCell>
                <TableCell>{quote.email}</TableCell>
                <TableCell>{quote.phone}</TableCell>
                <TableCell>{quote.locationFrom}</TableCell>
                <TableCell>{quote.locationTo}</TableCell>
                <TableCell>{quote.date}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full 
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
  );
};

export default Quotes;
