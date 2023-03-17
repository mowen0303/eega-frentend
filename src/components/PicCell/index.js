import { Fragment } from "react";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import product1 from "assets/images/products/product-1-min.jpg";
import Helper from "helper";
import { useNavigate } from "react-router-dom";

function PicCell({ image, title,date, description, categories, action }) {
  const navigate = useNavigate();
  return (
    <Card style={{cursor:"pointer"}} onClick={() => { navigate(action) }} >
      <MKBox position="relative" borderRadius="lg" mx={2} mt={-3}>
        <MKBox
          component="img"
          src={image ? Helper.host+image : product1}
          alt={title}
          borderRadius="lg"
          shadow="md"
          width="100%"
          position="relative"
          zIndex={1}
          height={210}
          style={{objectFit:"cover"}}
        />
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
      <MKBox p={3} mt={-2}>
        {categories.length > 0 && (
          <MKTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="regular"
            mb={0.75}
          >
            {categories.map((category) => (
              <Fragment key={category}>{category}&nbsp;&bull;&nbsp;</Fragment>
            ))}
          </MKTypography>
        )}
        <MKTypography display="block" variant="h5" fontWeight="bold" height={50} style={{overflow:"hidden"}}>
          {title}
        </MKTypography>
        <MKBox mt={1} mb={0}>
          <MKTypography variant="body2" component="p" color="text" height={50} style={{overflow:"hidden"}}>
            {description}
          </MKTypography>
          <MKTypography variant="body2" color="text" mt={1}>
            {date}
          </MKTypography>
        </MKBox>
      </MKBox>
    </Card>
  );
}

// Setting default props for the PicCell
PicCell.defaultProps = {
  categories: [],
};

// Typechecking props for the PicCell
PicCell.propTypes = {
  image: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  action: PropTypes.string.isRequired,
};

export default PicCell;
