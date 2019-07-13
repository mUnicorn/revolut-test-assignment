export const WalletsContext = React.createContext({
    funds: {},
    setAmount: () => {},
});

export default class WalletsProvider extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            funds: {
                GBP: 50,
                USD: 50,
                EUR: 50,
            },
            changeFunds: this.changeFunds,
        };
    }

    changeFunds = (key, diff) => {
        this.setState((state) => ({
            funds: {
                ...state.funds,
                [key]: state.funds[key] + diff,
            },
        }));
    };

    render = () => (
        <WalletsContext.Provider value={this.state} {...this.props} />
    );
}
