"use client";

import { NewListSheet } from "@/features/list/sheets/new-list-sheet";
import { UpdateListSheet } from "@/features/list/sheets/update-list-sheet";
import { NewPresentSheet } from "@/features/present/sheets/new-present-sheet";
import { UpdatePresentSheet } from "@/features/present/sheets/update-present-sheet";
import { useMountedState } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      {/* List Sheets */}
      <NewListSheet />
      <UpdateListSheet />

      {/* Present Sheets */}
      <NewPresentSheet />
      <UpdatePresentSheet />
    </>
  );
};

export default SheetProvider;
