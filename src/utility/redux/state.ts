interface ThemeSelector {
  theme: string;
}
export interface ThemeState {
  themeSelector: ThemeSelector;
}
interface GraphEndpoint {
  endpoint: string;
}
export interface EndpointState {
  graphEndpoint: GraphEndpoint;
}
interface SelectedEntity {
  entity: string;
}
export interface EntityState {
  selectedEntity: SelectedEntity;
}
