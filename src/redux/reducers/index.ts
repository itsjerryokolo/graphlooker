import { combineReducers } from "redux";
import {
  attributesReducer,
  endpointReducer,
  entityReducer,
} from "./endpoint-reducer";
import { themeReducer } from "./theme-reducer";

export const reducers = combineReducers({
  themeSelector: themeReducer,
  graphEndpoint: endpointReducer,
  selectedEntity: entityReducer,
  allAttributes: attributesReducer,
});
