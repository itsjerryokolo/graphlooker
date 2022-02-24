import { combineReducers } from "redux";
import { endpointReducer, entityReducer } from "./endpoint-reducer";
import { themeReducer } from "./theme-reducer";

export const reducers = combineReducers({
  themeSelector: themeReducer,
  graphEndpoint: endpointReducer,
  selectedEntity: entityReducer,
});
