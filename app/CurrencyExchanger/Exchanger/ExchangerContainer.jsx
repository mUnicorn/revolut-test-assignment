import {FxRatesContext} from "../FxRatesProvider";
import {WalletsContext} from "../WalletsProvider";
import Exchanger from "./Exchanger";

const ExchangerContainer = () => {
    const {rates, getRatesPolling} = React.useContext(FxRatesContext);
    const {funds, changeFunds} = React.useContext(WalletsContext);
    const currencies = Object.keys(funds);
    const [state, setState] = React.useState({
        withdrawCurr: currencies[0],
        transferCurr: currencies[1],
        amount: 0,
        changing: null,
    });

    const changeRates = rates[state.withdrawCurr];
    const changeRate = (changeRates && changeRates[state.transferCurr]);

    const withdrawAmt = (state.changing === "transfer" && changeRate) ?
        state.amount / changeRate :
        state.amount;

    const transferAmt = (state.changing === "withdraw" && changeRate) ?
        state.amount * changeRate :
        state.amount;

    React.useEffect(() => {
        getRatesPolling({base: state.withdrawCurr});
    }, [state.withdrawCurr]);

    const exchange = () => {
        changeFunds(state.withdrawCurr, -withdrawAmt);
        changeFunds(state.transferCurr, transferAmt);
        setState({...state, amount: 0});
    };

    const disabled = (
        !changeRate ||
        !withdrawAmt ||
        (state.withdrawCurr === state.transferCurr)
    );

    const onChangeWithdrawCurr = (withdrawCurr) => {
        setState({...state, withdrawCurr});
    };

    const onChangeTransferCurr = (transferCurr) => {
        setState({...state, transferCurr});
    };

    const onChangeWithdrawAmt = (amount) => {
        setState({...state, amount, changing: "withdraw"});
    };

    const onChangeTransferAmt = (amount) => {
        setState({...state, amount, changing: "transfer"});
    };

    const onFocusWithdrawAmt = () => {
        setState({...state, amount: withdrawAmt, changing: "withdraw"});
    };

    const onFocusTransferAmt = () => {
        setState({...state, amount: transferAmt, changing: "transfer"});
    };

    return (
        <Exchanger
            disabled={disabled}
            currencies={currencies}
            withdrawCurr={state.withdrawCurr}
            transferCurr={state.transferCurr}
            withdrawAmt={withdrawAmt}
            transferAmt={transferAmt}
            onWithdrawCurrChange={onChangeWithdrawCurr}
            onTransferCurrChange={onChangeTransferCurr}
            onFocusWithdrawAmt={onFocusWithdrawAmt}
            onFocusTransferAmt={onFocusTransferAmt}
            onWithdrawAmtChange={onChangeWithdrawAmt}
            onTransferAmtChange={onChangeTransferAmt}
            onExchangeClick={exchange}
        />
    );
};

export default ExchangerContainer;
