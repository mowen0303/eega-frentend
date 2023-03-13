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

function InfoPage() {
  const [announce, setAnnounce] = useState({ announce_content: "..." });
  const [noAuth, setNoAuth] = useState(false);

  useEffect(async () => {
    try {
      const url = `${Helper.host}/restAPI/announceController.php?action=getAnnounceById&id=3`;
      const res = await axios.get(url, Helper.hostHeaders);
      if (res.data.result[0]) {
        setAnnounce(res.data.result[0])
      }
    } catch (e) {
      if (e.response && e.response.data.code == 403) {
        setNoAuth(true);
      }
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
                    球会资讯
                  </MKTypography>
                  <MKTypography variant="body2" color="white" opacity={0.8}>
                    第一时间发布关于球会的最新资讯信息
                  </MKTypography>
                </MKBox>
                {
                  noAuth ?
                    <MKBox p={6}>
                      <MKTypography variant="body2" color="inherit">
                        请登录账号后查看球会资讯
                      </MKTypography>
                    </MKBox>
                    :
                    <MKBox p={{ xs: 3, md: 6 }}>
                      <div className="articleWrap" dangerouslySetInnerHTML={{ __html: announce.announce_content }}></div>
                    </MKBox>
                }


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

export default InfoPage;
