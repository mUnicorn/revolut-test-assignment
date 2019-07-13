import {IntlProvider} from "react-intl";
import Container from "@material-ui/core/Container";
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import FxRatesProvider from "../FxRatesProvider";
import WalletsProvider from "../WalletsProvider";
import ExchangerContainer from "../Exchanger";
import en from "../i18n/en.json";

const theme = createMuiTheme({
    overrides: {
        MuiChip: {
            outlined: {
                height: 40,
                borderRadius: 6,
                border: "2px solid rgb(42, 115, 239)",
                backgroundColor: "rgb(10, 82, 203)",
            },
        },
        MuiInputBase: {
            input: {
                height: "48px",
                fontSize: 48,
                fontWeight: 100,
                color: "#fff",
                padding: 0,
                textShadow: "1px 2px 4px rgba(0, 0, 0, 0.4)",
            },
        },
        MuiTypography: {
            root: {
                color: "#fff",
            },
            h3: {
                fontWeight: 100,
                textShadow: "1px 2px 4px rgba(0, 0, 0, 0.4)",
            },
            subtitle1: {
                fontWeight: 100,
                textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
            },
            body1: {
                fontSize: 20,
                fontWeight: 100,
            },
        },
        MuiMobileStepper: {
            dotActive: {
                backgroundColor: "#fff",
            },
        },
        MuiButton: {
            root: {
                color: "#fff",
            },
        },
    },
});

const CurrencyExchangerApp = () => (
    <IntlProvider locale="en" messages={en}>
        <ThemeProvider theme={theme}>
            <FxRatesProvider>
                <WalletsProvider>
                    <Container maxWidth="xs">
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            direction="column"
                            minHeight="90vh"
                        >
                            <ExchangerContainer />
                        </Box>
                    </Container>
                </WalletsProvider>
            </FxRatesProvider>
        </ThemeProvider>
    </IntlProvider>
);

export default CurrencyExchangerApp;
