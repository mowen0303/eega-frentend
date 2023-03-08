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
import { getEventList } from "redux/actions/eventAction";
import { connect } from "react-redux";


function ScoreListPage(props) {

  useEffect(() => {
    props.getEventList();
  }, []);

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={false}
        sticky
      />
      <MKBox component="section" pt={20} pb={12}>
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
                  <Grid container spacing={2} sx={{ mt: 0 }}>
                    {props.eventList && props.eventList.data && props.eventList.data.length > 0 && props.eventList.data.map(x => {
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
      <MKBox pt={{ xs: 0, lg: 3 }} pb={3}>
        <SimpleFooter />
      </MKBox>
    </>
  );
}

const mapStateToProps = (state) => ({
  eventList: state.eventReducer.eventList
})

const mapDispatchToProps = { getEventList }

export default connect(mapStateToProps, mapDispatchToProps)(ScoreListPage);
