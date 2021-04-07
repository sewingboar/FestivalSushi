import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducers";

const store = createStore(reducer, composeWithDevTools(applyMiddleware()));
export default store;
