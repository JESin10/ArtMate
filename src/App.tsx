import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Page from "./page/Page";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Fragment>
        <BrowserRouter>
          <Page />
        </BrowserRouter>
      </React.Fragment>
    </QueryClientProvider>
  );
}
