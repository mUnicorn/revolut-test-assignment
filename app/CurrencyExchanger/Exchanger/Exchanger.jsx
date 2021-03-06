import {FormattedMessage} from "react-intl";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {styled} from "@material-ui/styles";
import ExchangeRate from "../ExchangeRate";
import WithdrawWallet from "../ExchangeWallet";
import Slides from "../Slides";

const Container = styled(Paper)({
    position: "relative",
});

const renderWallets = (symbol, bg, height) => (
    currencies,
    index,
    onChangeIndex,
    amount,
    onChange,
    onFocus,
) => (
    <Slides
        index={index}
        steps={currencies.length}
        onChangeIndex={onChangeIndex}
        bg={bg}
        height={height}
    >
        {currencies.map((currency, i) => (
            <WithdrawWallet
                key={currency}
                symbol={symbol}
                currency={currency}
                amount={(i === index) ? amount : 0}
                onFocus={onFocus}
                onChange={(i === index) ? onChange : null}
            />
        ))}
    </Slides>
);

const renderWithdrawWallets = renderWallets(
    "-", "linear-gradient(to top, rgb(43, 119, 254), rgb(6, 86, 219))", "280px",
);

const renderTransferWallets = renderWallets(
    "+", "linear-gradient(to top, rgb(43, 119, 254), rgb(6, 86, 219))", "210px",
);

const Exchanger = ({
    currencies,
    disabled,
    withdrawCurr,
    transferCurr,
    withdrawAmt,
    transferAmt,
    onWithdrawCurrChange,
    onTransferCurrChange,
    onFocusWithdrawAmt,
    onFocusTransferAmt,
    onWithdrawAmtChange,
    onTransferAmtChange,
    onExchangeClick,
}) => {
    const exchangeButton = (
        <Button
            size="large"
            disabled={disabled}
            onClick={onExchangeClick}
        >
            <FormattedMessage id="exchange" />
            {"\u00A0"}
        </Button>
    );

    const withdrawIndex = currencies.indexOf(withdrawCurr);
    const withdrawWallets = renderWithdrawWallets(
        currencies,
        withdrawIndex,
        (nextIndex) => {
            onWithdrawCurrChange(currencies[nextIndex]);
        },
        withdrawAmt,
        (amount) => {
            onWithdrawAmtChange(amount);
        },
        onFocusWithdrawAmt,
    );
    const transferIndex = currencies.indexOf(transferCurr);
    const transferWallets = renderTransferWallets(
        currencies,
        transferIndex,
        (nextIndex) => {
            onTransferCurrChange(currencies[nextIndex]);
        },
        transferAmt,
        (amount) => {
            onTransferAmtChange(amount);
        },
        onFocusTransferAmt,
    );

    return (
        <Container elevation={4}>
            <Grid container item direction="column" align="center">
                <Box position="absolute" left={0} right={0} top="5%" zIndex={1}>
                    <ExchangeRate src={withdrawCurr} dst={transferCurr} />
                </Box>
                <Box position="absolute" right={8} top={8} zIndex={2}>
                    {exchangeButton}
                </Box>
                <Grid item data-test="withdraw-wallets">
                    {withdrawWallets}
                </Grid>
                <Grid item data-test="transfer-wallets">
                    {transferWallets}
                </Grid>
            </Grid>
        </Container>
    );
};

Exchanger.propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    disabled: PropTypes.bool.isRequired,
    withdrawCurr: PropTypes.string.isRequired,
    transferCurr: PropTypes.string.isRequired,
    withdrawAmt: PropTypes.number.isRequired,
    transferAmt: PropTypes.number.isRequired,
    onFocusWithdrawAmt: PropTypes.func.isRequired,
    onFocusTransferAmt: PropTypes.func.isRequired,
    onWithdrawCurrChange: PropTypes.func.isRequired,
    onTransferCurrChange: PropTypes.func.isRequired,
    onWithdrawAmtChange: PropTypes.func.isRequired,
    onTransferAmtChange: PropTypes.func.isRequired,
    onExchangeClick: PropTypes.func.isRequired,
};

export default Exchanger;
