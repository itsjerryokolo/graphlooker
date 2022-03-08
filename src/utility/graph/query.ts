import { gql } from "@apollo/client";
import pluralizer from "pluralize";

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
    return pluralStr + "s";
  } else {
    return pluralizer(normalStr);
  }
}

export const getGraphData = (
  data: { name: string; type: string, typeName: string }[],
  entity: string,
  count: number,
  skip: number
) => {
  console.log("calling me");
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
      entity: ${selectedEntity}(first:${count},skip:${skip}){
        id      
        ${queryData}
        }
    }
    `;
};

export const getGraphDataForID = (
  data: { name: string; type: string, typeName: string }[],
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
  data: { name: string; type: string, typeName: string }[],
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


//Query for Filter Menu
export const getStringFilterGraphData = (
  data: { name: string; type: string, typeName: string }[],
  entity: string,
  filterOption: string,
  attributeName: string,
  userInputValue: string,
) => {
  let queryData = ` `;
  const selectedEntity = makePluralChanges(entity);
  let columnName = attributeName.concat(filterOption);
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

  if (userInputValue === '') {

    userInputValue = 'null';
  } else {
    userInputValue = '"' + userInputValue + '"';
  }

  console.log("query", queryData);
  console.log(`
  query {
    entity: ${selectedEntity}(where: {${columnName} :${userInputValue}}){
      id      
      ${queryData}
      }
  }
  `)
  return gql`
      query {
        entity: ${selectedEntity}(where: {${columnName} :${userInputValue}}){
          id      
          ${queryData}
          }
      }
      `;
};


