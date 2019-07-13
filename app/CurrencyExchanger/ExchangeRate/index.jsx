import {FormattedNumber} from "react-intl";
import Chip from "@material-ui/core/Chip";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import {FxRatesContext} from "../FxRatesProvider";

const ExchageRate = ({src, dst}) => {
    const {rates} = React.useContext(FxRatesContext);
    const dstValue = (rates[src] && rates[src][dst]) ?
        rates[src][dst] :
        null;

    return (
        <Fade in={dstValue}>
            <Chip
                variant="outlined"
                label={(
                    <Typography>
                        <FormattedNumber
                            value={1}
                            style="currency"
                            currency={src}
                        />
                        {"\u00A0=\u00A0"}
                        <FormattedNumber
                            value={dstValue}
                            style="currency"
                            currency={dst}
                        />
                    </Typography>
                )}
            />
        </Fade>
    );
};

ExchageRate.propTypes = {
    src: PropTypes.string.isRequired,
    dst: PropTypes.string.isRequired,
};

export default ExchageRate;
