import {injectIntl} from "react-intl";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import {styled} from "@material-ui/styles";
import {WalletsContext} from "../WalletsProvider";
import Wallet from "../Wallet";

const WithdrawInput = styled(Input)({
    fontSize: 32,
});

const WithdrawWallet = ({
    amount,
    onChange,
    currency,
    intl,
    symbol,
    ...props
}) => {
    const wallets = React.useContext(WalletsContext);
    const funds = wallets.funds[currency];
    const [value, setValue] = React.useState(String(amount || ""));

    React.useEffect(() => {
        const val = (amount) ?
            intl.formatNumber(amount, {
                maximumFractionDigits: 2,
            }) :
            "";

        setValue(val);
    }, [amount]);

    const change = (event) => {
        const val = event.currentTarget.value;
        const parts = val.split(".").map((sub) => sub.replace(/[^0-9]+/g, ""));
        const fract = (parts.length > 1) ? parts.pop().slice(0, 2) : 0;
        const num = Number(`${parts.join()}.${fract}`);

        if (num || num === 0) {
            const nextAmount = Math.max(Math.min(num, funds), 0);

            if (onChange) onChange(nextAmount, event);
            setValue(nextAmount);
        }

        if (val.endsWith(".")) setValue(val);
    };

    return (
        <Wallet {...props} currency={currency}>
            <WithdrawInput
                disableUnderline
                value={value}
                onChange={change}
                style={{
                    maxWidth: 200,
                }}
                startAdornment={(
                    <InputAdornment position="start">
                        <Typography
                            variant="p"
                            component="span"
                            style={{
                                opacity: Number(Boolean(amount)),
                            }}
                        >
                            {symbol}
                        </Typography>
                    </InputAdornment>
                )}
            />
        </Wallet>
    );
};

WithdrawWallet.propTypes = {
    intl: PropTypes.shape({
        formatNumber: PropTypes.func.isRequired,
    }).isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    onChange: PropTypes.func,
};

WithdrawWallet.defaultProps = {
    onChange: () => {},
};

export default injectIntl(WithdrawWallet);
