export const API_URL = "https://api.exchangeratesapi.io";
export const getFxRates = ({base}) => (
    fetch(`${API_URL}/latest?base=${base}`)
);
