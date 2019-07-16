import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@material-ui/core/MobileStepper";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {styled} from "@material-ui/styles";
import {FormattedMessage} from "react-intl";

const StyledMobileStepper = styled(MobileStepper)({
    backgroundColor: "transparent",
    width: "100%",
});

const Slides = ({
    index,
    onChangeIndex,
    steps,
    bg,
    height,
    ...props
}) => (
    <Box
        data-test="slides"
        style={{background: bg, height}}
        display="flex"
        flexDirection="column"
    >
        <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
            <SwipeableViews
                enableMouseEvents
                {...props}
                index={index}
                onChangeIndex={onChangeIndex}
            />
        </Box>
        <Box display="flex" alignItems="center">
            <StyledMobileStepper
                variant="dots"
                position="static"
                steps={steps}
                activeStep={index}
                backButton={(
                    <Button
                        data-test="back-button"
                        onClick={() => {
                            onChangeIndex((steps + (index - 1)) % steps);
                        }}
                    >
                        <FormattedMessage id="back" />
                    </Button>
                )}
                nextButton={(
                    <Button
                        data-test="next-button"
                        onClick={() => {
                            onChangeIndex((index + 1) % steps);
                        }}
                    >
                        <FormattedMessage id="next" />
                    </Button>
                )}
            />
        </Box>
    </Box>
);

Slides.propTypes = {
    index: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func.isRequired,
    steps: PropTypes.number.isRequired,
    bg: PropTypes.string,
    height: PropTypes.string,
};

Slides.defaultProps = {
    bg: "transparent",
    height: "auto",
};

export default Slides;
