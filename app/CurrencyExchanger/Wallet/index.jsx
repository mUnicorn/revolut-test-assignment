import {FormattedMessage, FormattedNumber} from "react-intl";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {WalletsContext} from "../WalletsProvider";

const Wallet = ({currency, children}) => {
    const wallets = React.useContext(WalletsContext);
    const funds = wallets.funds[currency];

    return (
        <Grid
            container
            wrap="nowrap"
            alignItems="baseline"
            justify="space-around"
        >
            <Grid item>
                <Box>
                    <Typography
                        noWrap
                        gutterBottom
                        variant="h3"
                        component="p"
                        align="left"
                        data-test="wallet-currency"
                    >
                        {currency}
                    </Typography>
                    <Typography
                        noWrap
                        gutterBottom
                        variant="subtitle1"
                        component="p"
                        align="left"
                    >
                        <FormattedMessage
                            id="youHaveFunds"
                            values={{
                                funds: <FormattedNumber
                                    style="currency"
                                    value={funds}
                                    currency={currency}
                                    data-test="wallet-funds"
                                />,
                            }}
                        />
                    </Typography>
                </Box>
            </Grid>
            <Grid item>{children}</Grid>
        </Grid>
    );
};

Wallet.propTypes = {
    currency: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Wallet;
