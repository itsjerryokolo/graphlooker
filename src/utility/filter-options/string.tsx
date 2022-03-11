export const filterStringIs = (
  endpoint: string,
  selectedEntity: string,
  columnName: string,
  selectedOption: string,
  stringInputValue: string
) => {
  const URI = encodeURIComponent(endpoint);
  const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
  console.log(
    `http://localhost:3000/explore?uri=${URI}&e=${entity}&f=${selectedOption}&c=${columnName}&i=${stringInputValue}`
  );
  window.location.href = `http://localhost:3000/explore?uri=${URI}&e=${entity}&f=${selectedOption}&c=${columnName}&i=${stringInputValue}`;
};
