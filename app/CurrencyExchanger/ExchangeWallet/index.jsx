import {injectIntl} from "react-intl";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import {styled} from "@material-ui/styles";
import {WalletsContext} from "../WalletsProvider";
import Wallet from "../Wallet";

const ExchangeInput = styled(Input)({
    fontSize: 32,
});

const formatOpts = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
};

const WithdrawWallet = ({
    amount,
    currency,
    intl,
    symbol,
    onFocus,
    onChange,
    ...props
}) => {
    const {funds} = React.useContext(WalletsContext);
    const [state, setState] = React.useState({
        value: String(amount),
        selection: {
            start: 0,
            end: 0,
        },
    });

    const ref = React.useRef();
    const keepSelection = () => (
        Promise.resolve().then(() => {
            if (ref.current) {
                ref.current.setSelectionRange(state.selection.start, state.selection.end);
            }
        })
    );

    keepSelection();

    React.useEffect(() => {
        const value = (amount) ?
            intl.formatNumber(amount, formatOpts) :
            "";

        const changed = value !== state.value;
        const typingFract = state.value.endsWith(".");

        if (changed && !typingFract) {
            setState({...state, value});
            keepSelection();
        }
    }, [amount, state.value]);

    const change = (event) => {
        const {target} = event;
        const {value} = target;
        const intSep = intl.formatNumber(1111, formatOpts).replace(/1/g, "");
        const fractSep = intl.formatNumber(1.1, formatOpts).replace(/1/g, "");

        const strNum = value
            .replace(new RegExp(`\\${intSep}`, "g"), "")
            .replace(new RegExp(`\\${fractSep}`, "g"), ".");

        const num = Number(strNum);
        const nextState = {
            ...state,
            selection: {
                start: target.selectionStart,
                end: target.selectionEnd,
            },
        };

        if (num <= funds[currency]) {
            nextState.value = (num) ?
                intl.formatNumber(num, formatOpts) :
                value;

            if (onChange) onChange(num);
        }

        setState(nextState);
    };

    const adornment = (
        <InputAdornment position="start">
            <Typography
                variant="h5"
                component="span"
                style={{opacity: Number(Boolean(amount))}}
            >
                {symbol}
            </Typography>
        </InputAdornment>
    );

    return (
        <Wallet {...props} data-test="wallet" currency={currency}>
            <ExchangeInput
                disableUnderline
                value={state.value || ""}
                inputRef={ref}
                style={{maxWidth: 200}}
                startAdornment={adornment}
                onFocus={onFocus}
                onChange={change}
                data-test="input"
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
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
};

WithdrawWallet.defaultProps = {
    onFocus: () => {},
    onChange: () => {},
};

export default injectIntl(WithdrawWallet);
