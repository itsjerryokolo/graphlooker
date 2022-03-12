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
  data: { name: string; type: string; typeName: string }[],
  entity: string,
  count: number,
  skip: number
) => {
  let queryData = ` `;
  const selectedEntity = makePluralChanges(entity);
  let orderByColumnName = 'id';

  for (let index = 0; index < data.length; ++index) {
    const element = data[index];
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

  for (let index = 0; index < data.length; ++index) {
    const element = data[index];
    if (
      element.name === 'timestamp' ||
      element.name === 'createdAt' ||
      element.name === 'updatedAt' ||
      element.name === 'createdAtTimestamp' ||
      element.name === 'updatedAtTimestamp' ||
      element.name === 'blockNumber' ||
      element.name === 'accrualBlockNumber' ||
      element.name === 'blockTimestamp' ||
      element.name === 'blockTime' ||
      element.name === 'block' ||
      element.name === 'mintedAtTimestamp' ||
      element.name === 'initTimestamp' ||
      element.name === 'dayStartTimestamp' ||
      element.name === 'preparedTimestamp' ||
      element.name === 'hourStartTimestamp'
    ) {
      orderByColumnName = element.name;
      console.log(orderByColumnName);
      break;
    } else if (element.typeName === 'Int') {
      orderByColumnName = element.name;
      console.log(orderByColumnName);
    }
  }

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
  data: { name: string; type: string; typeName: string }[],
  entity: string,
  filterID: string
) => {
  let queryData = ` `;
  const selectedEntity = makePluralChanges(entity);
  for (let index = 0; index < data.length; ++index) {
    const element = data[index];
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
  data: { name: string; type: string; typeName: string }[],
  entity: string,
  sortType: string,
  attributeName: string
) => {
  let queryData = ` `;
  const selectedEntity = makePluralChanges(entity);
  for (let index = 0; index < data.length; ++index) {
    const element = data[index];
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
  data: { name: string; type: string; typeName: string }[],
  entity: string,
  filterOption: string,
  attributeName: string,
  userInputValue: string
) => {
  let queryData = ` `;
  const selectedEntity = makePluralChanges(entity);
  let columnName = attributeName.concat(filterOption);
  for (let index = 0; index < data.length; ++index) {
    const element = data[index];
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

  return gql`
      query {
        entity: ${selectedEntity}(first:100, where: {${columnName} :${userInputValue}}){
          id      
          ${queryData}
          }
      }
      `;
};
