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
import MKAvatar from "components/MKAvatar";
import { useNavigate, useParams } from "react-router-dom";

function ScoreDetailPage() {
  const [noAuth, setNoAuth] = useState(false);
  const [scoreArr, setScoreArr] = useState(null);
  const [event, setEvent] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [orderBy, setOrderBy] = useState("participant_score");
  const navigate = useNavigate();
  const { eventId } = useParams();
  let rankIndex = 1;

  function getIcon(watchLabel) {
    let icon = "";
    if (sortBy == "asc") {
      icon = "▴";
    } else {
      icon = "▾";
    }
    if (watchLabel == orderBy) {
      return icon;
    } {
      return "▸";
    }
  }

  async function getData(orderBy, sortBy) {
    try {
      setOrderBy(orderBy);
      setSortBy(sortBy);
      const url = `${Helper.host}/restAPI/eventController.php?action=getEventScore&eventId=${eventId}&orderBy=${orderBy}&sort=${sortBy}`;
      const res = await axios.get(url, Helper.hostHeaders);
      if (res.data.result) {
        setScoreArr(res.data.result);
        if (res.data.result.length > 0) {
          let event = res.data.result[0];
          setEvent({
            event_title: event.event_title,
            event_date: event.event_date,
          })
        }
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {
      if (e.response.data.code == 403) {
        setNoAuth(true);
      }
      setScoreArr(null)
    }
  }

  useEffect(() => {
    getData(orderBy, sortBy);
  }, [])


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
                    差点排名
                  </MKTypography>
                  <MKTypography variant="body2" color="white" opacity={0.8}>
                    最高统计最近20场比赛成绩，再取其中一半最好成绩进行计算。
                  </MKTypography>
                </MKBox>
                <MKBox p={{ xs: 3, md: 6 }}>
                  <MKTypography variant="body2" color="grey" opacity={0.8} hidden={!noAuth}>
                    您无权查看本页面
                  </MKTypography>
                  <div className="table_1_wrap">
                    <table className="table_1" hidden={scoreArr == null}>
                      <thead>
                        <tr>
                          <th style={{width:'150px'}}>排名</th>
                          <th>头像</th>
                          <th>姓名</th>
                          <th>T (S/R/P)</th>
                          <th><div className="a2" onClick={() => getData("participant_score", sortBy == "asc" ? "desc" : "asc")}>毛杆 <span>{getIcon("participant_score")}</span></div></th>
                          <th>差点微分</th>
                          <th>差点指数</th>
                          <th><div className="a2" onClick={() => getData("participant_net_score", sortBy == "asc" ? "desc" : "asc")}>净杆 <span>{getIcon("participant_net_score")}</span></div></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          scoreArr && scoreArr.map(x => {
                            return (
                              <tr key={rankIndex}>
                                <td>{rankIndex++}</td>
                                <td><MKAvatar src={`${Helper.host}${x.user_avatar}`} alt="Burce Mars" size="s" shadow="xl" /></td>
                                <td>{x.user_first_name} {x.user_last_name}</td>
                                <td>{x.participant_t} ({x.ts}/{x.tr}/{x.tp})</td>
                                <td>{x.participant_score}</td>
                                <td>{x.participant_handicap_differential}</td>
                                <td><a className="a1" onClick={() => navigate(`/score/history/${x.participant_id}`)}>{x.participant_handicap_index}</a></td>
                                <td>{x.participant_net_score}</td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>

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

export default ScoreDetailPage;
