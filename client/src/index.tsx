import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import './index.css';


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router>
          <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
