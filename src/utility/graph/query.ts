import { gql } from "@apollo/client";

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

export const getGraphData = (
  data: { name: string; type: string }[],
  entity: string,
  count: number
) => {
  let queryData = ` `;
  const selectedEntity = entity + "s";
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
      ${selectedEntity}(first:${count}){
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
  const selectedEntity = entity + "s";
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
        ${selectedEntity}(where:{id:"${filterID}"}){
          id      
          ${queryData}
          }
      }
      `;
};
