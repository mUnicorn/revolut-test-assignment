// const API_KEY = "0b5106c26ed64c66bdc8dd1ba46473a8";
// const API_URL = "https://openexchangerates.org/api";
export const getFxRates = ({base}) => (
    // fetch(`${API_URL}/latest.json?app_id=${API_KEY}&base=${base}&symbols=USD,EUR,GBP`);
    new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                base,
                rates: {
                    EUR: (base === "EUR") ? 1 : 1 + Math.random(),
                    GBP: (base === "GBP") ? 1 : 1 + Math.random(),
                    USD: (base === "USD") ? 1 : 1 + Math.random(),
                },
            });
        }, 200);
    })
);
