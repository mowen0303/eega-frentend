import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import typography from "assets/theme/base/typography";

function SimpleFooter({ company, light }) {
  const { href, name } = company;
  const { size } = typography;

  return (
    <Container>
      <MKBox
        width="100%"
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <MKBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          color={light ? "white" : "text"}
          fontSize={size.sm}
        >
          Copyright &copy; {new Date().getFullYear()} EEGA, made by
          <Link href={href} target="_blank">
            <MKTypography variant="button" fontWeight="medium" color={light ? "white" : "dark"}>
              &nbsp;{name}&nbsp;
            </MKTypography>
          </Link>
          for a better web.
        </MKBox>
        <MKBox
          component="ul"
          sx={({ breakpoints }) => ({
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            listStyle: "none",
            mt: 3,
            mb: 0,
            p: 0,
            [breakpoints.up("lg")]: {
              mt: 0,
            },
          })}
        />
      </MKBox>
    </Container>
  );
}

// Setting default values for the props of SimpleFooter
SimpleFooter.defaultProps = {
  company: { href: "http://www.v-tec.ca/", name: "v-tec" },
  light: false,
};

// Typechecking props for the SimpleFooter
SimpleFooter.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  light: PropTypes.bool,
};

export default SimpleFooter;
