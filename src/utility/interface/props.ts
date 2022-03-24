export interface ErrorMassageProps {
  message: string;
  endpoint: string | any;
}
export interface ListItemProps {
  entity: string;
}
export interface DataBoardProps {
  drawerOpen: boolean;
}

export interface GraphDataTableProps {
  drawerOpen: boolean;
}
export interface FilterMenuProps {
  attributeName: string;
  attributeDataType: string;
}
export interface PrimaryMenuProps {
  attributeName: string;
  attributeType: string;
  attributeDataType: string;
}
export interface StringFilterMenuProps {
  attributeName: string;
}
export interface NumberFilterMenuProps {
  attributeName: string;
}
export interface TimeFilterMenuProps {
  attributeName: string;
}
export interface LoaderProps {
  theme: string;
  error: string | any;
  endpoint: string | any;
}
