import {FxRatesContext} from "../FxRatesProvider";
import {WalletsContext} from "../WalletsProvider";
import Exchanger from "./Exchanger";

const ExchangerContainer = () => {
    const {rates, getRatesPolling} = React.useContext(FxRatesContext);
    const {funds, changeFunds} = React.useContext(WalletsContext);
    const currencies = Object.keys(funds);

    const [withdrawAmt, setWithdrawAmt] = React.useState(0);
    const [withdrawCurr, setWithdrawCurr] = React.useState(currencies[0]);
    const [transferCurr, setTransferCurr] = React.useState(currencies[1]);

    const changeRates = rates[withdrawCurr];
    const changeRate = changeRates && changeRates[transferCurr];
    const transferAmt = (changeRate) ?
        withdrawAmt * changeRate :
        0;

    const setTransferAmt = (amount) => {
        setWithdrawAmt(amount / changeRate);
    };

    React.useEffect(() => {
        getRatesPolling({base: withdrawCurr});
    }, [withdrawCurr]);

    const exchange = () => {
        changeFunds(withdrawCurr, -withdrawAmt);
        changeFunds(transferCurr, transferAmt);
        setWithdrawAmt(0);
    };

    const disabled = (
        !changeRate ||
        !withdrawAmt ||
        (withdrawCurr === transferCurr)
    );

    return (
        <Exchanger
            currencies={currencies}
            withdrawCurr={withdrawCurr}
            transferCurr={transferCurr}
            disabled={disabled}
            withdrawAmt={withdrawAmt}
            transferAmt={transferAmt}
            onWithdrawCurrChange={setWithdrawCurr}
            onTransferCurrChange={setTransferCurr}
            onWithdrawAmtChange={setWithdrawAmt}
            onTransferAmtChange={setTransferAmt}
            onExchangeClick={exchange}
        />
    );
};

export default ExchangerContainer;
