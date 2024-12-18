export interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  locationFrom: string;
  locationTo: string;
  date: string;
  created_at: string;
  updated_at: string;
  status: Status;
  price?: string
  message?: string
}

export enum Status {
  PENDING = "pending",
  COMPLETED = "completed",
  IN_PROGRESS = "in-progress",
  CANCELLED = "cancelled",
  QUOTE_SENT = "quote-sent",
}

export interface GetAllQuotes {
  data: Quote[];
  count: number;
  limit: number;
  offset: number;
}
