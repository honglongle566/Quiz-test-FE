import "antd/dist/antd.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/style/index.scss";
import "antd/dist/antd.min.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./slices/store";
import "./i18n/i18n";
import axios from "axios";
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
reportWebVitals();
