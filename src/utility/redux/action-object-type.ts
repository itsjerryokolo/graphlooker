export interface SubgraphNetworkActionObjectTypes {
  type: string;
  payload: string;
}
export interface ThemeActionObjectTypes {
  type: string;
  payload: string;
}
export interface EndpointActionObjectTypes {
  type: string;
  payload: string;
}
export interface EntityActionObjectTypes {
  type: string;
  payload: { entity: string; efd: string };
}
export interface AttributesActionObjectTypes {
  type: string;
  payload: { name: string; type: string; typeName: string }[];
}
export interface LoadingActionObjectTypes {
  type: boolean;
  payload: boolean;
}
export interface QueryActionObjectTypes {
  type: string;
  payload: any;
}

export interface listOfEntityActionObjectTypes {
  type: string;
  payload: { entity: string; efd: string };
}
