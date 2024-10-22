"use client";

import { NewListSheet } from "@/features/list/sheets/new-list-sheet";
import { UpdateListSheet } from "@/features/list/sheets/update-list-sheet";
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
      {/* <NewPresentSheet isMobile={isMobile} /> */}
      {/* <UpdatePresentSheet isMobile={isMobile} /> */}
    </>
  );
};

export default SheetProvider;
