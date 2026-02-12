"use client";
import { Provider } from "react-redux";
import reduxStore from "./store";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return <Provider store={reduxStore}>{children}</Provider>;
};
