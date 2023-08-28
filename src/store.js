import {applyMiddleware,combineReducers,legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { savingdetailsReducer } from "./app/redux/reducer";


const rootReducer = combineReducers({
  savingdetails: savingdetailsReducer,

});

const middleware=[thunk];
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleware)));

export default store;
