import { ethers } from 'ethers';
import Constants from './constant';

const urlLabels = Constants.LABELS.commonUrls;

export default class Utility {
  public static getColumnNameForOptimizeQuery = (columnNames: any) => {
    let columnName = 'id';
    for (let index = 0; index < columnNames.length; ++index) {
      const element = columnNames[index].name;
      const datatype = columnNames[index].typeName;
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
      } else if (datatype === 'Int') {
        columnName = element;
      }
    }
    return columnName;
  };
}

export const sortData = (sortedData: object[]) => {
  sortedData = sortedData.map((item: object) => {
    let arr = Object.entries(item);

    arr.forEach((itm: any) => {
      if (typeof itm[1] === 'object') {
        itm[0] = `${itm[0]}_id`;
        itm[1] = itm[1]?.id;
      }
    });

    let fixedObj = Object.fromEntries(arr);
    return fixedObj;
  });

  return sortedData;
};

export const getProperEntity = (entity: string) => {
  if (entity === 'Nft') {
    return entity.toUpperCase();
  } else {
    return entity;
  }
};

export const checkAttributeIsEntity = (
  entity: string,
  id: string,
  endpoint: string,
  theme: any
) => {
  const URI = encodeURIComponent(endpoint);
  const selectedEntity = entity.charAt(0).toLowerCase() + entity.slice(1);
  window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${selectedEntity}&th=${theme}&id=${id}`;
};

export const checkAddressValidity = (entity: string, id: string, type: string) => {
  let verifyAddress = ethers.utils.isAddress(id);
  const re = /[0-9A-Fa-f]{6}/g; // 0x + 64 bytes

  if (verifyAddress) {
    window.open(
      `${urlLabels.ADDRESS_URL}${id}`,
      '_blank' // <- This is what makes it open in a new window.
    );
    return false;
  } else if (id && id.length === 66 && re.test(id)) {
    window.open(
      `${urlLabels.TNX_URL}${id}`,
      '_blank' // <- This is what makes it open in a new window.
    );
    return false;
  } else {
    return true;
  }
};

export const getTimestampColumns = (columnName: string) => {
  if (columnName.includes('date')) {
    return true;
  } else if (columnName.includes('timestamp')) {
    return true;
  } else if (columnName.includes('createdAtTimestamp')) {
    return true;
  } else if (columnName.includes('updatedAtTimestamp')) {
    return true;
  } else if (columnName.includes('hourStartUnix')) {
    return true;
  } else if (columnName === 'createdAt') {
    return true;
  }
};
