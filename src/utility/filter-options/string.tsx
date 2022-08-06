import Constants from '../constant';
import Utility from '../utility';

const urlLabels = Constants.LABELS.commonUrls;
export const filterStringIs = (
  endpoint: string,
  selectedEntity: string,
  efd: string,
  columnName: string,
  selectedFilter: string,
  stringInputValue: string,
  theme: any,
  listOFFiltersInStringify: string
) => {
  const URI = encodeURIComponent(endpoint);
  let filtersInStringify = Utility.getAllFilters(
    selectedFilter,
    columnName,
    stringInputValue,
    listOFFiltersInStringify
  );
  window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${selectedEntity}&th=${theme}&efd=${efd}&filterObj=${filtersInStringify}`;
};
