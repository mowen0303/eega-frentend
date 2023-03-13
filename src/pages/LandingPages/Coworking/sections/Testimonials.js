/*
=========================================================
* Material Kit 2 PRO React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
// import Stack from "@mui/material/Stack";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import image from "assets/images/logo.jpg";

function Testimonials() {
  // const image = "/assets/images/logo.jpg";

  return (
    <MKBox component="section" position="relative" py={6}>
      <Container sx={{ maxWidth: "100% !important",p:0 }}>
        <Grid container item xs={12} md={10} sx={{ mx: "auto" }}>
          <MKBox variant="gradient" bgColor="dark" borderRadius="lg" width="100%" py={6}>
            <Grid container>
              <Grid item xs={12} md={6} xl={4} sx={{ position: "relative", px: 6 }}>
                <MKBox
                  component="img"
                  src={image}
                  alt="image"
                  borderRadius="md"
                  maxWidth="300px"
                  width="100%"
                  position="relative"
                  mt={-12}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={5}
                xl={4}
                sx={{
                  position: "relative",
                  px: { xs: 3, md: 2 },
                  mt: { xs: 3, md: 0 },
                  my: { xs: 0, md: "auto" },
                  color: ({ palette: { white } }) => white.main,
                }}
              >
                <Icon fontSize="large">format_quote</Icon>
                <MKTypography
                  variant="body2"
                  color="white"
                  fontWeight="light"
                  mb={2}
                  sx={{ fontSize: "1.125rem" }}
                >
                  东方之鹰高尔夫球会，由多伦多华人企业家，专业人士和各界英才组成。
                  鹰会汇聚了多伦多一众知名高尔夫球高手，以及痛并快乐着的鹰友。
                </MKTypography>
                <MKTypography variant="button" fontWeight="bold" color="white">
                  <p>欢迎球友加入鹰会大家庭</p>
                  <p>联系我们：eega2022@hotmail.com</p>
                </MKTypography>
              </Grid>
              <Grid item xs={1} />
              <Grid
                item
                xs={12}
                xl={2}
                sx={{ px: { xs: 6, xl: 0 }, my: { xs: 0, xl: "auto" }, lineHeight: 1 }}
              >
                <MKTypography variant="h3" color="white" mt={{ xs: 6, xl: 0 }} mb={1}>
                  500 +
                </MKTypography>
                <MKTypography component="p" variant="button" color="white" opacity={0.8} mb={2}>
                  鹰会成立至今已有15年，累计参与人数500+
                </MKTypography>
              </Grid>
            </Grid>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Testimonials;
