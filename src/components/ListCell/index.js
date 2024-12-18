import { Fragment } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Helper from "helper";
import { useNavigate } from "react-router-dom";

function ListCell({ image, title, description, categories, action, status }) {
  const navigate = useNavigate();

  return (
    <Card style={{ border: "1px solid #eee",cursor:"pointer" }} onClick={() => { navigate(action.route) }} className="listCard">
      <MKBox position="relative" borderRadius="lg" mx={2} mt={2}>
        <MKBox
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top={0}
          sx={{
            backgroundImage: `url(${image})`,
            transform: "scale(0.94)",
            filter: "blur(12px)",
            backgroundSize: "cover",
          }}
        />
      </MKBox>
      <MKTypography display="inline" variant="h5" fontWeight="bold" sx={{ml:3}} style={{height:"2.5em"}}>
        {title}
      </MKTypography>
      <MKBox p={3} mt={-2}>
        {categories.length > 0 && (
          <MKTypography
            display="block"
            variant="body2"
            color="text"
            fontWeight="regular"
            mb={0.75}
          >
            {categories.map((category) => (
              <Fragment key={category}>{category}&nbsp;&bull;&nbsp;</Fragment>
            ))}
            {Helper.renderEventStatus(status)}
          </MKTypography>
        )}
        <MKBox>
          <MKTypography variant="body2" component="p" color="text">
            {description}
          </MKTypography>
        </MKBox>
      </MKBox>
    </Card>
  );
}

// Setting default props for the SimpleBookingCard
ListCell.defaultProps = {
  categories: [],
};

// Typechecking props for the SimpleBookingCard
ListCell.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListCell;
