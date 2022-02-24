import { EndpointActionTypes } from "../../utility/redux/action-types";

export const setGraphEndpoint = (endpoint: string) => {
  return {
    type: EndpointActionTypes.SET_ENDPOINT,
    payload: endpoint,
  };
};

export const setGraphEntity = (entity: string) => {
  return {
    type: EndpointActionTypes.SET_ENTITY,
    payload: entity,
  };
};
