module.exports = {
    clearMocks: true,
    setupFiles: ["./jest.setup.js"],
    moduleNameMapper: {
        "^lodash/debounce$": "../../../testing/debounce-mock",
    },
    transform: {
        "\\.jsx?$": "babel-jest",
    },
};
