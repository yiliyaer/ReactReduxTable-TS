import { combineReducers } from "redux";
import { dataTableReducer } from "./dataTableReducer";

const reducers = combineReducers({
    dataTable: dataTableReducer
})

export default reducers;