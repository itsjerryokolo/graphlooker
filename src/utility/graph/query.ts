import { gql } from '@apollo/client';
import Constants from '../constant';
import { Allfilters, ColumnProps } from '../interface/props';
import Utility from '../utility';

const label = Constants.FILTERLABELS.dataTypeLabels;
const commonLables = Constants.LABELS.commonLables;
const regex = Constants.REGEX;

export const queryToGetDeploymentId = gql`
  query {
    _meta {
      deployment
    }
  }
`;
export const getNetworkName = (DeploymentId: any) => {
  return gql`
    query {
      indexingStatuses(subgraphs:["${DeploymentId}"]) {
        chains {
          network
        }
      }
    }
  `;
};

export const getAllEntities = gql`
  query {
    __schema {
      queryType {
        fields {
          name
          type {
            name
          }
        }
      }
    }
  }
`;

export const getAllAttributes = (entity: any) => {
  // entity = Utility.getProperEntity(entity);
  return gql`
        query{
          __type(name:"${entity?.entity}"){
            name
          fields{
            name
            type{
              name
              ofType{
                name
                kind
              }
            }
          }
        }
        }
    `;
};

export const getGraphDataForID = (columnNames: ColumnProps[], entity: any, filterID: string) => {
  let queryData = ` `;
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === commonLables.ID) {
      continue;
    }
    if (
      element.type === label.LIST ||
      element.type === label.OBJECT ||
      element.type === label.NON_NULL
    ) {
      queryData = queryData + `${element.name} { ${commonLables.ID} } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  return gql`
      query {
        entity: ${entity},(where:{id:"${filterID}"}){
          id      
          ${queryData}
          }
      }
      `;
};

/*
function to get Query based on last ID and applied filter.

columnNames = name of perticular column in table .
entity = selected entity.
filterOption = applied filter ex: is, isNot
attributeName = attribute name or column name.
userInputValue = user input for specific filter
skip = number of records to skip
sortType = sorting type : asc or desc
count = required number of records
whereId = ID from where we need data
errorMsg = specific error msg
*/

export const getStringFilterGraphData = (
  columnNames: ColumnProps[],
  efd: any,
  skip: number,
  count: number,
  whereId: string,
  errorMsg: string,
  listOfFilters: Allfilters[]
) => {
  let attributeName: string = ``;
  let sortType: string = ``;
  let queryData = ` `;
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === commonLables.ID) {
      continue;
    }
    if (
      (element.type === label.LIST ||
        element.type === label.OBJECT ||
        element.type === label.NON_NULL) &&
      !errorMsg
    ) {
      queryData = queryData + `${element.name} { ${commonLables.ID} } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  let filterQuery = ``;
  listOfFilters?.forEach((filters) => {
    if (filters.filterName === commonLables.UNDERSCORE_IS) {
      filters.filterName = commonLables.EMPTY;
    }
    if (filters.filterName && filters.filterName.includes(',')) {
      if (typeof filters.inputValue === 'string') {
      }
      if (filters.inputValue.length) {
        filterQuery = `${filterQuery} ${filters.columnName}_gte :${filters.inputValue[0]}, ${filters.columnName}_lte :${filters.inputValue[1]}`;
      }
    } else if (
      typeof filters.inputValue === 'string' &&
      regex.CHECK_NUMBER_REGEX.test(filters.inputValue)
    ) {
      filters.inputValue = Number(filters.inputValue);
    } else if (filters.inputValue === 'true' || filters.inputValue === 'false') {
      filters.inputValue = filters.inputValue === 'true';
    } else if (filters.columnName && filters.filterName === 'sort') {
      attributeName = filters.columnName;
      sortType = filters.inputValue;
    } else {
      filters.inputValue =
        commonLables.DOUBLE_QUOTES + filters.inputValue + commonLables.DOUBLE_QUOTES;
    }
    if (
      (filters.columnName &&
        filters.filterName !== 'sort' &&
        filters.filterName &&
        !filters.filterName.includes(',')) ||
      filters.filterName === ''
    ) {
      filterQuery = `${filterQuery} ${
        filters.columnName && filters.columnName.concat(filters.filterName)
      } :${filters.inputValue}`;
    }
  });
  //if sort type is undefined set to desc by default
  if (sortType === commonLables.UNDEFINED) {
    sortType = commonLables.DESC;
  }

  //if columnName or attribute is not present
  let sortQuery =
    !(attributeName === 'undefined') && attributeName
      ? `orderBy:${attributeName}, orderDirection: ${sortType}`
      : ``;

  return gql`
      query {
        entity: ${efd}(first:${count}, skip:${skip},${sortQuery},where: {${filterQuery}, id_gt:"${whereId}"}){
          id      
          ${queryData}
          }
      }
      `;
};

/*
function to get Query based on last ID and skip.

columnNames = name of perticular column in table .
entity = selected entity.
attributeName = attribute name or column name.
skip = number of records to skip
count = required number of records
whereId = ID from where we need data
errorMsg = specific error msg
*/

export const getDataQuery = (
  columnNames: ColumnProps[],
  entity: any,
  count: number,
  skip: number,
  globalQuery: string,
  whereId: any,
  errorMsg: string
) => {
  // let selectedEntity = entity && entity.charAt(0).toLowerCase() + entity.slice(1); To-D0: No need of this varible after adding entity ofr data(efd)
  //selectedEntity = Utility.makePluralChanges(selectedEntity);
  let orderByColumnName = 'id';
  orderByColumnName = Utility.getColumnNameForOptimizeQuery(columnNames);

  let queryData = ` `;

  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === commonLables.ID) {
      continue;
    }
    if (
      (element.type === label.LIST ||
        element.type === label.OBJECT ||
        element.type === label.NON_NULL) &&
      !errorMsg
    ) {
      queryData = queryData + `${element.name} { ${commonLables.ID} } `;
    } else if (element.type !== label.OBJECT) {
      queryData = queryData + `${element.name} `;
    }
  }

  return gql`
    query {
      entity: ${entity}(first:${count}, skip:${skip}, orderBy: ${orderByColumnName}, 
        orderDirection: desc, where: {id_gt:"${whereId}" } ){
        id      
        ${queryData}
        }
    }
    `;
};

/*
function to get Query based on last ID and sort type : asc, desc.

columnNames = name of perticular column in table .
entity = selected entity.
sortType = sorting type : asc or desc
attributeName = attribute name or column name.
skip = number of records to skip
count = required number of records
whereId = ID from where we need data
errorMsg = specific error msg
*/

export const getSortedDataQuery = (
  columnNames: ColumnProps[],
  efd: any,
  sortType: string | (string | null)[] | null | number,
  attributeName: string | (string | null)[] | null | number,
  skip: number,
  count: number,
  whereId: string,
  errorMsg: string
) => {
  let queryData = ` `;
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === commonLables.ID) {
      continue;
    }
    if (
      (element.type === label.LIST ||
        element.type === label.OBJECT ||
        element.type === label.NON_NULL) &&
      !errorMsg
    ) {
      queryData = queryData + `${element.name} { ${commonLables.ID} } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  return gql`
    query {
      entity: ${efd}(first:${count}, skip:${skip}, orderBy: ${attributeName}, orderDirection: ${sortType}, where: {id_gt:"${whereId}" }){
        id
        ${queryData}
      }
    }
    `;
};
