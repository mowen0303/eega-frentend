import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";
import 'style/css.css'
import routes from "routes";
import axios from "axios";
import Helper from "helper";

function SponsorPage() {
  const [content, setContent] = useState("");

  useEffect(async () => {
    try {
      const url = `${Helper.host}/restAPI/sponsorController.php?action=getSponsor`;
      const res = await axios.get(url, Helper.hostHeaders);
      if (res.data.result) {
        let sponsor_content = res.data.result.sponsor_content;
        sponsor_content = sponsor_content.replaceAll(`src="/upload/article`,`src="${Helper.host}/upload/article`)
        setContent(sponsor_content)
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {

    }
  }, [])


  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={false}
        sticky
      />
      <MKBox component="section" pt={20} pb={3}>
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <Card>
                <MKBox
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                  p={3}
                  mt={-3}
                  mx={2}
                >
                  <MKTypography variant="h3" color="white">
                    赞助荣誉榜
                  </MKTypography>
                  <MKTypography variant="body2" color="white" opacity={0.8}>
                    感谢每一位赞助商对活动的大力支持。
                  </MKTypography>
                </MKBox>
                <MKBox p={{ xs: 3, md: 6 }}>
                  <div className="articleWrap" dangerouslySetInnerHTML={{__html:content}}></div>
                </MKBox>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </MKBox>
      <MKBox p={{ xs: 2, md: 4 }}>
        <SimpleFooter />
      </MKBox>
    </>
  );
}

export default SponsorPage;
