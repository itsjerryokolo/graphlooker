import { gql } from '@apollo/client';
import pluralizer from 'pluralize';
import Constants from '../constant';

const label = Constants.FILTERLABELS.dataTypeLabels;

export const getAllEntities = gql`
  query {
    __schema {
      queryType {
        fields {
          name
        }
      }
    }
  }
`;

export const getAllAttributes = (entity: string) => {
  return gql`
        query{
          __type(name:"${entity}"){
            name
          fields{
            name
            type{
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

//Function to make of entities plural
function makePluralChanges(normalStr: string) {
  let pluralStr = pluralizer(normalStr);
  if (pluralStr === normalStr) {
    return pluralStr + 's';
  } else {
    return pluralizer(normalStr);
  }
}

export const getGraphData = (
  columnNames: { name: string; type: string; typeName: string }[],
  entity: string,
  count: number,
  skip: number
) => {
  let queryData = ` `;
  const selectedEntity = makePluralChanges(entity);
  let orderByColumnName = 'id';
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === 'id') {
      continue;
    }
    if (
      element.type === label.LIST ||
      element.type === label.OBJECT ||
      element.type === label.NON_NULL
    ) {
      queryData = queryData + `${element.name} { id } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  orderByColumnName = getColumnNameForOptimizeQuery(columnNames);

  return gql`
    query {
      entity: ${selectedEntity}(first:${count},skip:${skip}, orderBy:${orderByColumnName}, orderDirection: desc){
        id      
        ${queryData}
        }
    }
    `;
};

export const getGraphDataForID = (
  columnNames: { name: string; type: string; typeName: string }[],
  entity: string,
  filterID: string
) => {
  let queryData = ` `;
  const selectedEntity = makePluralChanges(entity);
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === 'id') {
      continue;
    }
    if (
      element.type === label.LIST ||
      element.type === label.OBJECT ||
      element.type === label.NON_NULL
    ) {
      queryData = queryData + `${element.name} { id } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  return gql`
      query {
        entity: ${selectedEntity}(where:{id:"${filterID}"}){
          id      
          ${queryData}
          }
      }
      `;
};

export const getSortedGraphData = (
  columnNames: { name: string; type: string; typeName: string }[],
  entity: string,
  sortType: string,
  attributeName: string
) => {
  let queryData = ` `;
  const selectedEntity = makePluralChanges(entity);
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === 'id') {
      continue;
    }
    if (
      element.type === label.LIST ||
      element.type === label.OBJECT ||
      element.type === label.NON_NULL
    ) {
      queryData = queryData + `${element.name} { id } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  return gql`
      query {
        entity: ${selectedEntity}(first:100, orderBy: ${attributeName}, orderDirection: ${sortType} ){
          id      
          ${queryData}
          }
      }
      `;
};

//Query for Filter Menu
export const getStringFilterGraphData = (
  columnNames: { name: string; type: string; typeName: string }[],
  entity: string,
  filterOption: string,
  attributeName: string,
  userInputValue: string
) => {
  let queryData = ` `;
  const selectedEntity = makePluralChanges(entity);
  attributeName = attributeName.concat(filterOption);
  let orderByColumnName = 'id';
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index];
    if (element.name === 'id') {
      continue;
    }
    if (
      element.type === label.LIST ||
      element.type === label.OBJECT ||
      element.type === label.NON_NULL
    ) {
      queryData = queryData + `${element.name} { id } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  if (userInputValue === '') {
    userInputValue = 'null';
  } else {
    userInputValue = '"' + userInputValue + '"';
  }

  orderByColumnName = getColumnNameForOptimizeQuery(columnNames);

  return gql`
      query {
        entity: ${selectedEntity}(first:100,orderBy:${orderByColumnName}, orderDirection: desc,where: {${attributeName} :${userInputValue}}){
          id      
          ${queryData}
          }
      }
      `;
};

const getColumnNameForOptimizeQuery = (columnNames: any) => {
  let columnName = 'id';
  for (let index = 0; index < columnNames.length; ++index) {
    const element = columnNames[index].name;
    if (element.includes('date')) {
      columnName = element;
      break;
    } else if (element.includes('timestamp')) {
      columnName = element;
      break;
    } else if (element.includes('createdAt')) {
      columnName = element;
      break;
    } else if (element.includes('updatedAt')) {
      columnName = element;
      break;
    } else if (element.includes('blockNumber')) {
      columnName = element;
      break;
    } else if (element.includes('accrualBlockNumber')) {
      columnName = element;
      break;
    } else if (element.includes('blockTimestamp')) {
      columnName = element;
      break;
    } else if (element.includes('blockTime')) {
      columnName = element;
      break;
    } else if (element.includes('block')) {
      columnName = element;
      break;
    } else if (element.includes('mintedAtTimestamp')) {
      columnName = element;
      break;
    } else if (element.includes('initTimestamp')) {
      columnName = element;
      break;
    } else if (element.includes('dayStartTimestamp')) {
      columnName = element;
      break;
    } else if (element.includes('preparedTimestamp')) {
      columnName = element;
      break;
    } else if (element.includes('hourStartTimestamp')) {
      columnName = element;
      break;
    } else {
      columnName = 'id';
    }
  }
  return columnName;
};
