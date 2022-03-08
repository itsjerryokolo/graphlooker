
export const filterNumberIs = (endpoint: string, selectedEntity: string,
  columnName: string, selectedOption: string, numberInputValue: string) => {
    
    const URI = encodeURIComponent(endpoint);
    const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
    console.log(
        `http://localhost:3000/explore?uri=${URI}&e=${entity}&f=${selectedOption}&c=${columnName}&i=${numberInputValue}`
    );
    window.location.href = `http://localhost:3000/explore?uri=${URI}&e=${entity}&f=${selectedOption}&c=${columnName}&i=${numberInputValue}`;
}