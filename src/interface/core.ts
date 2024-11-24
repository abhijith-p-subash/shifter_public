
import { WhereFilterOp } from "firebase/firestore";

export interface Filters {
    field: string;
    operator: WhereFilterOp;
    value: unknown;
  }