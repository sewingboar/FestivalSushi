import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./components/app";
import ErrorBoundary from "./components/error-handler/error-boundary";
import SushiStoreService from "./services/sushi-store-service";
import { SushiServiceProvider } from "./components/context";

import store from "./store";

const sushiService = new SushiStoreService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <SushiServiceProvider value={sushiService}>
        <Router>
          <App />
        </Router>
      </SushiServiceProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById("root")
);
