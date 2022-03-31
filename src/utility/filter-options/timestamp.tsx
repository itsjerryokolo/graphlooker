import moment from 'moment';
import Constants from '../constant';

const urlLabels = Constants.LABELS.commonUrls;

export default class Timestamp {
  public static perviousMenu = (
    inputNumber: any,
    unitsOfTime: string,
    endpoint: string,
    selectedEntity: string,
    theme: string,
    columnName: string
  ) => {
    let units = String(unitsOfTime.toLowerCase());
    console.log(inputNumber, units);
    let todayUnixNumber = moment().subtract(inputNumber, units).unix();

    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&f=_gt&i=${todayUnixNumber}&c=${columnName}`;
  };
}
