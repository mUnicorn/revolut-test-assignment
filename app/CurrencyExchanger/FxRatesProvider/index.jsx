import debounce from "lodash/debounce";
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
            polling: null,
            getRatesPolling: debounce(this.getRatesPolling, 600),
        };
    }

    getRates = ({base}) => {
        getFxRates({base})
            .then((res) => res.json())
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

        const {polling} = this.state;

        clearTimeout(polling);

        const newPolling = setInterval(() => {
            this.getRates(...args);
        }, 10000);

        this.setState({
            polling: newPolling,
        });
    };

    render = () => (
        <FxRatesContext.Provider value={this.state} {...this.props} />
    );
}
