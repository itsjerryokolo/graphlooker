import {
  EndpointActionObjectTypes,
  EntityActionObjectTypes,
} from "../../utility/redux/action-object-type";
import { EndpointActionTypes } from "../../utility/redux/action-types";

const ENDPOINT_INITIAL_STATE = {
  endpoint: "",
};

const ENTITY_INITIAL_STATE = {
  entity: "",
};

export const endpointReducer = (
  state = ENDPOINT_INITIAL_STATE,
  { type, payload }: EndpointActionObjectTypes
) => {
  switch (type) {
    case EndpointActionTypes.SET_ENDPOINT:
      return { ...state, endpoint: payload };
    default:
      return state;
  }
};
export const entityReducer = (
  state = {},
  { type, payload }: EntityActionObjectTypes
) => {
  switch (type) {
    case EndpointActionTypes.SET_ENTITY:
      return { ...state, entity: payload };
    default:
      return state;
  }
};
