import {getFxRates} from "./api";

export const FxRatesContext = React.createContext({
    rates: {},
    errors: {},
    polling: {},
    getRatesPolling: () => {},
});

export default class FxRatesProvider extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            rates: {},
            polling: {},
            getRatesPolling: this.getRatesPolling,
        };
    }

    getRates = ({base}) => {
        getFxRates({base})
            .then(({rates}) => {
                this.setState((state) => ({
                    rates: {...state.rates, [base]: rates},
                }));
            })
            .catch((error) => {
                this.setState({error});
            })
            .finally(() => {
                this.setState({loading: false});
            });
    };

    getRatesPolling = (...args) => {
        this.getRates(...args);
    };

    render = () => (
        <FxRatesContext.Provider value={this.state} {...this.props} />
    );
}
