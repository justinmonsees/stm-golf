"use client";

import React, { createContext } from "react";

const AppContext = createContext({});

export default function AppProvider({ initData, children }) {
  return <AppContext.Provider value={initData}>{children}</AppContext.Provider>;
}
