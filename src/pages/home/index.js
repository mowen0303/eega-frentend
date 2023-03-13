import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";
import Testimonials from "pages/LandingPages/Coworking/sections/Testimonials";
import SimpleInfoCard from "examples/Cards/InfoCards/SimpleInfoCard";
import axios from "axios";

// Routes
import routes from "routes";
import { useNavigate } from "react-router-dom";
import Helper from "helper";

// Images
// import bgImage from "assets/images/bg-coworking.jpeg";
import bgImage from "assets/images/index1.jpeg";
import { useEffect, useState } from "react";

function HomePage() {
  const navigate = useNavigate();

  const [announceArr, setAnnounceArr] = useState([
    { announce_content: "..." },
    { announce_content: "..." },
  ]);

  useEffect(async () => {
    try {
      const url = `${Helper.host}/restAPI/announceController.php?action=getAnnounceList`;
      const res = await axios.get(url, Helper.hostHeaders);
      if (res.data.result) {
        setAnnounceArr(res.data.result)
      }
    } catch (e) {

    }
  }, []);


  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={false}
        sticky
      />
      <MKBox
        minHeight="65vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.5),
              rgba(gradients.dark.state, 0.5)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            md={7}
            justifyContent={{ xs: "center", md: "start" }}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <MKBox width={"100%"}>
              <MKTypography
                variant="h1"
                color="white"
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                东方之鹰高尔夫球会
              </MKTypography>
              <MKTypography
                variant="body1"
                color="white"
                pr={{ md: 12, lg: 24, xl: 32 }}
                opacity={0.8}
                mt={1}
              >
                EEGA since 2008
              </MKTypography>
              <MKTypography
                variant="body1"
                color="white"
                pr={{ md: 12, lg: 24, xl: 32 }}
                opacity={0.8}
                style={{fontFamily:"LiSu"}}
              >
                以球会友 群鹰聚首
              </MKTypography>
            </MKBox>
            <MKBox>
              <Stack direction="row" spacing={1} mt={6} mb={3}>
                <MKButton variant="gradient" color="info" onClick={() => { navigate('/me') }}>
                  会员登录
                </MKButton>
              </Stack>
            </MKBox>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <MKBox component="section" py={{ xs: 6, md: 18 }}>
          <Container>
            <Grid container item xs={12} justifyContent="center">
              <Grid
                item
                xs={12}
                md={4}
                sx={{ ml: { xs: 0, md: "auto" }, mr: { xs: 0, md: 6 }, mb: { xs: 4, md: 0 } }}
              >
                <Stack spacing={{ xs: 4, md: 8 }}>
                  <SimpleInfoCard
                    icon="campaign"
                    title="活动通知"
                    description={announceArr[0].announce_content}
                  />
                  {/* <SimpleInfoCard
                    icon="insights"
                    title="Great Features"
                    description="People are so scared to lose that they don't even try. Like, one thing people can't say is that I'm not trying, and I'm not trying my hardest."
                  /> */}
                </Stack>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                sx={{ mr: { xs: 0, md: "auto" }, ml: { xs: 0, md: 6 }, mb: { xs: 4, md: 0 } }}
              >
                <Stack spacing={{ xs: 4, md: 8 }}>
                  <SimpleInfoCard
                    icon="contactless"
                    title="鹰会喜报"
                    description={announceArr[1].announce_content}
                  />
                  {/* <SimpleInfoCard
                    icon="sentiment_satisfied"
                    title="Modern Interface"
                    description="If everything I did failed - which it doesn't, it actually succeeds - just the fact that I'm willing to fail is an inspiration."
                  /> */}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </MKBox>
        <Testimonials />
      </Card>
      <MKBox p={{ xs: 2, md: 4 }}>
        <SimpleFooter />
      </MKBox>
    </>
  );
}

export default HomePage;
