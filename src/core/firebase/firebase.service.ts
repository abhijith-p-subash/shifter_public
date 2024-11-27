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
): Promise<{
  success: boolean;
  data: T[];
  count: number;
  limit: number;
  error: Error | null;
}> => {
  const colRef = collection(db, collectionName);
  const limit_in = options.limit || 1000;

  let q = query(colRef);
  if (options.filters) {
    q = query(
      q,
      ...options.filters.map((f) => where(f.field, f.operator, f.value))
    );
  }
  if (options.sort) {
    q = query(q, orderBy(options.sort.field, options.sort.direction));
  }
  if (options.offset) {
    q = query(q, startAfter(options.offset as DocumentSnapshot));
  }
  q = query(q, limit(limit_in));

  try {
    const totalCountSnapshot = await getDocs(q);
    const totalCount = totalCountSnapshot.size;
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];

    return {
      success: true,
      data,
      count: totalCount,
      limit: limit_in,
      error: null,
    };
  } catch (error) {
    return { success: false, data: [], count: 0, limit: limit_in, error: error as Error };
  }
};

// Get a document by ID
export const getById = async <T>(
  collectionName: string,
  id: string
): Promise<{ success: boolean; data: T | null; error: Error | null }> => {
  try {
    const snapshot = await getDoc(doc(db, collectionName, id));
    return snapshot.exists()
      ? {
          success: true,
          data: { id: snapshot.id, ...snapshot.data() } as T,
          error: null,
        }
      : { success: false, data: null, error: null };
  } catch (error) {
    return { success: false, data: null, error: error as Error };
  }
};

// Create a new document
export const create = async <T extends WithFieldValue<DocumentData>>(
  collectionName: string,
  data: T
): Promise<{
  success: boolean;
  data: (T & { id: string }) | null;
  error: Error | null;
}> => {
  try {
    const colRef = collection(db, collectionName);
    const docRef = await addDoc(colRef, data);
    return { success: true, data: { ...data, id: docRef.id }, error: null };
  } catch (error) {
    return { success: false, data: null, error: error as Error };
  }
};

// Update a document by ID
export const updateById = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<{
  success: boolean;
  data: Partial<T> | null;
  error: Error | null;
}> => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
    return { success: true, data, error: null };
  } catch (error) {
    return { success: false, data: null, error: error as Error };
  }
};

// Bulk update documents
export const updateBulk = async <T>(
  collectionName: string,
  ids: string[],
  data: Partial<T>
): Promise<
  { success: boolean; data: Partial<T> | null; error: Error | null }[]
> => {
  const results = await Promise.all(
    ids.map(async (id) => {
      try {
        await updateById(collectionName, id, data);
        return { success: true, data, error: null };
      } catch (error) {
        return { success: false, data: null, error: error as Error };
      }
    })
  );
  return results;
};

// Delete a document by ID
export const deleteById = async (
  collectionName: string,
  id: string
): Promise<{ success: boolean; error: Error | null }> => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error as Error };
  }
};

// Bulk delete documents
export const deleteBulk = async (
  collectionName: string,
  ids: string[]
): Promise<{ success: boolean; id: string; error: Error | null }[]> => {
  const deletePromises = ids.map(async (id) => {
    try {
      await deleteById(collectionName, id);
      return { success: true, id, error: null };
    } catch (error) {
      return { success: false, id, error: error as Error };
    }
  });

  return Promise.all(deletePromises);
};
