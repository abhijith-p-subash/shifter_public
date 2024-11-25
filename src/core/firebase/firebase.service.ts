/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  WithFieldValue,
  DocumentData,
  WhereFilterOp,
  startAfter,
  DocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase.config";

// Get all documents from a collection with optional filters, sorting, and limits
export const getAll = async <T>(
  collectionName: string,
  options: {
    filters: { field: string; operator: WhereFilterOp; value: any }[];
    sort: { field: string; direction: "asc" | "desc" };
    limit: number;
    offset?: any;
  }
): Promise<{ data: T[]; count: number; limit: number }> => {
  const colRef = collection(db, collectionName);
  const limit_in = options.limit ? options.limit : 1000;
  // Apply filters, sorting, and limits if provided
  let q = query(colRef);
  if (options?.filters) {
    q = query(
      q,
      ...options.filters.map((f) => where(f.field, f.operator, f.value))
    );
  }
  if (options?.sort) {
    q = query(q, orderBy(options.sort.field, options.sort.direction));
  }

  // if(options.offset){ 
  //   console.log("offset", options.offset);
  //   q = query(q, startAfter(options.offset));  
  // }

  if (options.offset) {
    console.log("offset", options.offset);
    q = query(q, startAfter(options.offset as DocumentSnapshot));
  }

  if (limit_in) {
    q = query(q, limit(limit_in));
  }

  console.log("q", q);


  const totalCountQuery = query(
    q,
    ...(options.filters.map((f) => where(f.field, f.operator, f.value)) || []),
    limit(1000)
  );
  const totalCountSnapshot = await getDocs(totalCountQuery);
  const totalCount = totalCountSnapshot.size;

  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as T[];
  return { data: data, count: totalCount, limit: options.limit };
};

// Get a document by ID
export const getById = async <T>(
  collectionName: string,
  id: string
): Promise<T | null> => {
  const docRef = doc(db, collectionName, id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists()
    ? ({ id: snapshot.id, ...snapshot.data() } as T)
    : null;
};

// Create a new document
export const create = async <T extends WithFieldValue<DocumentData>>(
  collectionName: string,
  data: T
): Promise<string> => {
  const colRef = collection(db, collectionName);
  const docRef = await addDoc(colRef, data);
  return docRef.id;
};

// Update a document by ID
export const updateById = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
};

// Update multiple documents
export const updateBulk = async <T>(
  collectionName: string,
  ids: string[],
  data: Partial<T>
): Promise<void[]> => {
  return Promise.all(ids.map((id) => updateById(collectionName, id, data)));
};

// Delete a document by ID
export const deleteById = async (
  collectionName: string,
  id: string
): Promise<void> => {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
};

// Delete multiple documents
export const deleteBulk = async (
  collectionName: string,
  ids: string[]
): Promise<void[]> => {
  return Promise.all(ids.map((id) => deleteById(collectionName, id)));
};
