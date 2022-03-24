import { ethers } from 'ethers';
import Constants from './constant';
import pluralizer from 'pluralize';

const urlLabels = Constants.LABELS.commonUrls;
const dataTypeLabel = Constants.FILTERLABELS.dataTypeLabels;
const entityArray = Constants.FILTERLABELS.checkProperEntityName;
const txHashRegex = /[0-9A-Fa-f]{6}/g;
const checkIsNumber = /^\d*(\.\d+)?$/;

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

  public static verifyAddress = (
    row: any,
    columnName: string,
    columnType: string,
    endpoint: string,
    theme: string
  ) => {
    let inputValue = row[`${columnName}`];
    let address = ethers.utils.isAddress(inputValue);

    if (columnType === dataTypeLabel.OBJECT) {
      Utility.checkAttributeIsEntity(inputValue.__typename, inputValue.id, endpoint, theme);
    } else if (columnName === 'id') {
      let splitNumber = inputValue.split('-');
      let addressID = splitNumber[0].toString();
      if (checkIsNumber.test(addressID)) {
        return false;
      } else {
        let openCloseSnackbar = Utility.checkAddressValidity(columnName, addressID, columnType);
        return openCloseSnackbar;
      }
    } else if (
      address ||
      (inputValue && inputValue.length === 66 && txHashRegex.test(inputValue))
    ) {
      let openCloseSnackbar = Utility.checkAddressValidity(columnName, inputValue, columnType);
      return openCloseSnackbar;
    }
  };

  public static checkAttributeIsEntity = (
    entity: string,
    id: string,
    endpoint: string,
    theme: any
  ) => {
    const URI = encodeURIComponent(endpoint);
    const selectedEntity = entity.charAt(0).toLowerCase() + entity.slice(1);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${selectedEntity}&th=${theme}&id=${id}`;
  };

  public static checkAddressValidity = (entity: string, id: string, type: string) => {
    let verifyAddress = ethers.utils.isAddress(id);
    const re = /[0-9A-Fa-f]{6}/g; // 0x + 64 bytes

    if (verifyAddress) {
      window.open(
        `${urlLabels.ADDRESS_URL}${id}`,
        '_blank' // <- This is what makes it open in a new window.
      );
    } else if (id && id.length === 66 && re.test(id)) {
      window.open(
        `${urlLabels.TNX_URL}${id}`,
        '_blank' // <- This is what makes it open in a new window.
      );
    } else {
      return true;
    }
  };

  public static getTimestampColumns = (columnName: string) => {
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
    } else if (columnName.includes('createTime')) {
      return true;
    } else if (columnName === 'createdAt') {
      return true;
    }
  };

  public static getProperEntity = (entity: string) => {
    let newEntity = entity;
    // eslint-disable-next-line array-callback-return
    entityArray.map((item) => {
      if (item === entity) {
        newEntity = entity.toUpperCase();
      }
    });
    return newEntity;
  };

  public static getIntUptoTwoDecimal = (row: any, inputValue: string) => {
    let convertedInt = parseFloat(row[`${inputValue}`]);
    if (convertedInt % 1 !== 0) {
      return true;
    }
  };

  //Function to make of entities plural
  public static makePluralChanges = (normalStr: string) => {
    let pluralStr = pluralizer(normalStr);
    if (pluralStr === normalStr) {
      return pluralStr + 's';
    } else if (pluralStr[pluralStr.length - 1] === pluralStr[pluralStr.length - 1].toUpperCase()) {
      pluralStr = pluralStr.slice(0, -1) + pluralStr.charAt(pluralStr.length - 1).toLowerCase();
      return pluralStr;
    } else {
      return pluralStr;
    }
  };

  public static linkToAddressAndTxHash = (row: any, columnName: string, columnType: string) => {
    if (columnType === dataTypeLabel.OBJECT) {
      return true;
    } else if (columnName === 'id') {
      let splitNumber = row[`${columnName}`].split('-');
      let num = splitNumber[0].toString();
      if (checkIsNumber.test(num)) {
        return false;
      } else {
        return true;
      }
    } else if (ethers.utils.isAddress(row[`${columnName}`])) {
      return true;
    } else if (txHashRegex.test(row[`${columnName}`]) && row[`${columnName}`].length === 66) {
      return true;
    }
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
