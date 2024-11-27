/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getById,
  updateById,
} from "../../../../core/firebase/firebase.service";
import { Quote, Status } from "../../../../interface/quotes";
import moment from "moment";
import { useLoader } from "../../../../core/context/LoaderContext";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurify from "dompurify";
import { MdModeEdit } from "react-icons/md";
import { useModal } from "../../../../core/context/ModalContext";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const STATUS_STYLES = {
  [Status.PENDING]: "bg-yellow-200 text-yellow-800",
  [Status.COMPLETED]: "bg-green-200 text-green-800",
  [Status.IN_PROGRESS]: "bg-blue-200 text-blue-800",
  [Status.CANCELLED]: "bg-red-200 text-red-800",
  [Status.QUOTE_SENT]: "bg-purple-200 text-purple-800",
};

const schema = z.object({
  message: z.string().optional(),
  price: z
    .string()
    .regex(/^\d+$/, "Price must contain only numbers")
    .min(1, "Price is required"),
  status: z.nativeEnum(Status).optional(),
});

type FormData = z.infer<typeof schema>;

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const renderStatusBadge = (status: Status) => (
  <span
    className={`px-2 py-1 text-xs rounded-full uppercase ${
      STATUS_STYLES[status] || ""
    }`}
  >
    {status}
  </span>
);

const QuotesDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const fetchCalled = useRef(false);
  const [quoteData, setQuoteData] = useState<Quote | null>(null);
  const { showLoader, hideLoader } = useLoader();
  const [editPrice, setEditPrice] = useState(false);
  const { showModal } = useModal();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const fetchQuote = async () => {
    if (!id) {
      toast.error("Quote not found");
      return;
    }

    try {
      showLoader();
      const { data } = await getById<Quote>("quotes", id);
      setQuoteData(data);

      if (data && data.status) {
        setValue("status", data.status);
      }
      if (data && data.price) {
        setValue("price", data.price);
      }
      if (data && data.message) {
        setValue("message", data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch quote");
    } finally {
      hideLoader();
    }
  };

  const openEditTab = () => {
    if (quoteData && quoteData.price) {
      setValue("price", quoteData.price);
    }
    if (quoteData && quoteData.message) {
      setValue("message", quoteData.message);
    }
    setEditPrice(true);
  };

  const generatePDF = async () => {
    if (!quoteData) {
      toast.error("No quote data available to generate PDF");
      return;
    }

    try {
      // Fetch the template
      const response = await fetch("/templates/quote-template.html");
      let template = await response.text();

      // Replace placeholders with dynamic data
      template = template
        .replace("{{name}}", quoteData.name || "--")
        .replace("{{email}}", quoteData.email || "--")
        .replace("{{phone}}", quoteData.phone || "--")
        .replace("{{locationFrom}}", quoteData.locationFrom || "--")
        .replace("{{locationTo}}", quoteData.locationTo || "--")
        .replace(
          "{{quoteDate}}",
          moment(quoteData.date).format("DD, MMMM YYYY")
        )
        .replace("{{date}}", moment().format("DD, MMMM YYYY"))
        .replace("{{price}}", quoteData.price?.toString() || "--");

      // Create a hidden container for the populated template
      const tempContainer = document.createElement("div");
      tempContainer.innerHTML = template;
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      document.body.appendChild(tempContainer);

      // Generate PDF
      const canvas = await html2canvas(tempContainer, { scale: 1.5 }); // Scale adjusted for clarity
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Quote_${quoteData.name}_${quoteData.id}.pdf`);

      // Clean up
      document.body.removeChild(tempContainer);

      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF: ", error);
      toast.error("Failed to generate PDF");
    }
  };

  const cancelQuote = async () => {
    if (!id) {
      toast.error("Quote not found");
      return;
    }

    try {
      const confirmed = await showModal(
        "failure",
        "Are you sure you want to delete this item?"
      );
      if (confirmed) {
        showLoader();
        await updateById<Quote>("quotes", id, {
          status: Status.CANCELLED,
          updated_at: moment().toISOString()
        });
        await fetchQuote();
        toast.success("Quote cancelled successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel quote");
    } finally {
      hideLoader();
    }
  };

  const updateComplete = async () => {
    try {
      if (quoteData) {
        await updateById<Quote>("quotes", quoteData.id, {
          status: Status.COMPLETED,
          updated_at: moment().toISOString()
        });
        await fetchQuote();
        toast.success("Quote completed successfully");
      }
    } catch (error) {
      toast.error("Failed to complete quote");
      console.error(error);
    }
  };

  const onSubmit = debounce(async (data: FormData) => {
    if (!id) {
      toast.error("Quote not found");
      return;
    }

    try {
      showLoader();
      const sanitizedData = {
        price: DOMPurify.sanitize(data.price),
        message: DOMPurify.sanitize(data.message || ""),
        status: DOMPurify.sanitize(Status.IN_PROGRESS),
        updated_at: moment().toISOString()
      };

      await updateById("quotes", id, sanitizedData);
      await fetchQuote();
      setEditPrice(false);
      toast.success("Price updated successfully");
      reset();
    } catch (error) {
      console.error("Error updating quote: ", error);
      toast.error("An error occurred while updating the quote.");
    } finally {
      hideLoader();
    }
  }, 500);

  useEffect(() => {
    if (!fetchCalled.current) {
      fetchCalled.current = true;
      fetchQuote();
    }
  }, [id]);

  if (!quoteData) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold mb-4">Quote Details</h1>
      <div className="">
        <div className="flex flex-wrap gap-2 mb-2 md:justify-end p-2">
          {quoteData.price && (
            <Button onClick={generatePDF}>Download PDF</Button>
          )}
          {/* <Button color="primary" disabled={!quoteData.price}>
            Send Quote
          </Button> */}

          <Button
            color="success"
            disabled={!quoteData.price || quoteData.status === Status.CANCELLED || quoteData.status === Status.COMPLETED}
            onClick={updateComplete}
          >
            Complete
          </Button>
          <Button color="failure" onClick={cancelQuote} disabled={quoteData.status === Status.CANCELLED || quoteData.status === Status.COMPLETED}>
            Cancel Quote
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-28 md:mb-0">
  <div className="p-4 bg-white rounded-lg shadow w-full relative">
    {quoteData.price && quoteData.status !== Status.COMPLETED && quoteData.status !== Status.CANCELLED && (
      <Button
        color="light"
        size="xs"
        className="absolute right-2 top-2"
        onClick={openEditTab}
      >
        <MdModeEdit className="w-4 h-4" />
      </Button>
    )}
    <div className="space-y-4">
      {[
        { label: "Quote ID", value: quoteData.id },
        { label: "Name", value: quoteData.name },
        { label: "Email", value: quoteData.email },
        { label: "Phone", value: quoteData.phone },
        { label: "Status", value: renderStatusBadge(quoteData.status) },
        { label: "Location From", value: quoteData.locationFrom },
        { label: "Location To", value: quoteData.locationTo },
        {
          label: "Date",
          value: moment(quoteData.date).format("DD, MMMM YYYY"),
        },
        quoteData.price && {
          label: "Price",
          value: (
            <span className="font-bold text-red-600">
              Rs {quoteData.price}/-
            </span>
          ),
        },
        quoteData.price && {
          label: "Message",
          value: quoteData.message || "--",
        },
      ]
        .filter(Boolean) // Filter out falsy values like `false` or `undefined`
        .map((item, index) => {
          // Type assertion ensures TypeScript knows the structure of `item`
          const { label, value } = item as { label: string; value: string | JSX.Element };
          return (
            <div className="flex items-center" key={index}>
              <span className="mr-2">{label}:</span>
              <p>{value || "--"}</p>
            </div>
          );
        })}
    </div>
  </div>

  {(!quoteData.price || editPrice) && (
    <div className="p-4 rounded-lg shadow w-full bg-white">
      <h2 className="text-xl mb-2">Price Details</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div>
          <Label htmlFor="price" value="Price" />
          <TextInput
            id="price"
            type="text"
            placeholder="Price"
            {...register("price")}
            color={errors.price ? "failure" : "primary"}
            helperText={errors.price?.message}
          />
        </div>
        <div>
          <Label htmlFor="message" value="Message" />
          <Textarea
            id="message"
            placeholder="Leave a comment..."
            rows={4}
            {...register("message")}
            color={errors.message ? "failure" : "primary"}
            helperText={errors.message?.message}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="submit" color="primary">
            Submit
          </Button>
          {quoteData.price && (
            <Button
              outline
              color="light"
              onClick={() => setEditPrice(false)}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default QuotesDetailsPage;
