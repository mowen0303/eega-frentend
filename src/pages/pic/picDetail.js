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
import { useNavigate, useParams } from "react-router-dom";

function PicDetailPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [noAuth, setNoAuth] = useState(false);

  useEffect(async () => {
    getEventData();
  }, [])

  async function getEventData() {
    try {
      const url = `${Helper.host}/restAPI/eventController.php?action=getEventReview&eventId=${eventId}`;
      const res = await axios.get(url, Helper.hostHeaders);
      if (res.data.result) {
        setEvent(res.data.result);
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {
      if (e.response && e.response.data.code == 403) {
        setNoAuth(true);
      }
      setEvent({})
    }
  }

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
                    {event.event_title}活动照片
                  </MKTypography>
                  <MKTypography variant="body2" color="white" opacity={0.8}>
                    {event.event_date}
                  </MKTypography>
                </MKBox>
                <MKBox p={{ xs: 3, md: 6 }} pt={{ xs: 0, md: 2 }}>
                  <Grid container spacing={3} sx={{ mt: 0 }}>
                    <MKBox p={6} hidden={!noAuth}>
                      <MKTypography variant="body2" color="grey" opacity={0.8}>
                        您无权查看本页面
                      </MKTypography>
                    </MKBox>
                    <MKBox p={{ xs: 3, md: 6 }} hidden={noAuth}>
                      <div className="articleWrap" dangerouslySetInnerHTML={{__html:event.event_review_content}}></div>
                    </MKBox>
                  </Grid>
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

export default PicDetailPage;
