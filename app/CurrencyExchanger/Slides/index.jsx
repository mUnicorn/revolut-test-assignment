import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@material-ui/core/MobileStepper";
import Box from "@material-ui/core/Box";
import {styled} from "@material-ui/styles";

const StyledMobileStepper = styled(MobileStepper)({
    backgroundColor: "transparent",
});

const Slides = ({
    index,
    onChangeIndex,
    steps,
    bg,
    height,
    ...props
}) => (
    <Box style={{background: bg, height}} display="flex" flexDirection="column">
        <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
            <SwipeableViews
                enableMouseEvents
                {...props}
                index={index}
                onChangeIndex={onChangeIndex}
            />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
            <StyledMobileStepper
                variant="dots"
                position="static"
                steps={steps}
                activeStep={index}
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
