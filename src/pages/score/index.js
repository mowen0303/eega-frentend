import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";
import ListCell from "components/ListCell";
import routes from "routes";
import axios from "axios";
import Helper from "helper";


function ScoreListPage() {

  const [eventArr, setEventArr] = useState();

  useEffect(async () => {
    try {
      const url = `${Helper.host}/restAPI/eventController.php?action=getEventListWithScore`;
      const res = await axios.get(url, Helper.hostHeaders);
      if (res.data.result) {
        setEventArr(res.data.result);
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
                    比赛成绩
                  </MKTypography>
                  <MKTypography variant="body2" color="white" opacity={0.8}>
                    点击比赛场次，查看成绩详情
                  </MKTypography>
                </MKBox>
                <MKBox p={{ xs: 3, md: 6 }} pt={{ xs: 0, md: 2 }}>
                  <Grid container spacing={3} sx={{ mt: 0 }}>
                    {eventArr && eventArr.length > 0 && eventArr.map(x => {
                      return (
                        <Grid item xs={12} md={6} lg={4} key={x.event_id}>
                          <MKBox mt={1}>
                            <ListCell
                              title={x.event_title}
                              description={`比赛球场：${x.courseName}`}
                              categories={[x.event_date, x.event_type == 'week' ? '周场' : '月场', `${x.event_max_participant}人`]}
                              action={{
                                type: "internal",
                                route: `/score/detail/${x.event_id}`,
                                color: "info",
                                label: "查看本场成绩",
                              }}
                            />
                          </MKBox>
                        </Grid>
                      )
                    })}
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


export default ScoreListPage;
