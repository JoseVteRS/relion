"use client";

import { NewListSheet } from "@/features/list/sheets/new-list-sheet";
import { UpdateListSheet } from "@/features/list/sheets/update-list-sheet";
import { NewPresentSheet } from "@/features/present/sheets/new-present-sheet";
import { UpdatePresentSheet } from "@/features/present/sheets/update-present-sheet";
import { useMemo } from "react";
import { useMountedState, useWindowSize } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState();
  const { width } = useWindowSize();

  const isMobile = useMemo(() => width < 768, [width]);

  if (!isMounted) return null;

  return (
    <>
      {/* List Sheets */}
      <NewListSheet isMobile={isMobile} />
      <UpdateListSheet isMobile={isMobile} />

      {/* Present Sheets */}
      <NewPresentSheet isMobile={isMobile} />
      <UpdatePresentSheet isMobile={isMobile} />
    </>
  );
};

export default SheetProvider;
