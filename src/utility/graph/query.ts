import { gql } from "@apollo/client";
import pluralizer from 'pluralize';

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
  if (pluralStr == normalStr) {
    return pluralStr + 's';
  } else {
    return (pluralizer(normalStr));
  }
}


export const getGraphData = (
  data: { name: string; type: string }[],
  entity: string,
  count: number
) => {
  let queryData = ` `;
  const selectedEntity = makePluralChanges(entity);
  for (let index = 0; index < data.length; ++index) {
    const element = data[index];
    if (element.name === "id") {
      continue;
    }
    if (
      element.type === "LIST" ||
      element.type === "OBJECT" ||
      element.type === "NON_NULL"
    ) {
      queryData = queryData + `${element.name} { id } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  console.log("query", queryData);
  return gql`
    query {
      entity: ${selectedEntity}(first:${count}){
        id      
        ${queryData}
        }
    }
    `;
};


export const getGraphDataForID = (
  data: { name: string; type: string }[],
  entity: string,
  filterID: string
) => {
  let queryData = ` `;
  const selectedEntity = makePluralChanges(entity);
  for (let index = 0; index < data.length; ++index) {
    const element = data[index];
    if (element.name === "id") {
      continue;
    }
    if (
      element.type === "LIST" ||
      element.type === "OBJECT" ||
      element.type === "NON_NULL"
    ) {
      queryData = queryData + `${element.name} { id } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  console.log("query", queryData);
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
  data: { name: string; type: string }[],
  entity: string,
  sortType: string,
  attributeName: string
) => {
  let queryData = ` `;
  const selectedEntity = makePluralChanges(entity);
  for (let index = 0; index < data.length; ++index) {
    const element = data[index];
    if (element.name === "id") {
      continue;
    }
    if (
      element.type === "LIST" ||
      element.type === "OBJECT" ||
      element.type === "NON_NULL"
    ) {
      queryData = queryData + `${element.name} { id } `;
    } else {
      queryData = queryData + `${element.name} `;
    }
  }

  console.log("query", queryData);
  return gql`
      query {
        entity: ${selectedEntity}(first:100, orderBy: ${attributeName}, orderDirection: ${sortType} ){
          id      
          ${queryData}
          }
      }
      `;
};


