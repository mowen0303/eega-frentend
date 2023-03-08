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
import { useParams } from 'react-router';

function RankDetailPage(props) {
  const [noAuth, setNoAuth] = useState(false);
  const [rankHistoryArr, setrankHistoryArr] = useState(null);
  const [name, setName] = useState("");
  let rankIndex = 1;
  const { userId } = useParams();
  useEffect(async () => {
    try {
      const url = `${Helper.host}/restAPI/rankController.php?action=getRankHistory&userId=${userId}`;
      const res = await axios.get(url, Helper.hostHeaders);
      console.log(res.data.result)
      if (res.data.result) {
        setrankHistoryArr(res.data.result);
        if (res.data.result.length > 0) {
          setName(`${res.data.result[0].user_first_name} ${res.data.result[0].user_last_name}`);
        }
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {
      if (e.response && e.response.data && e.response.data.code == 403) {
        setNoAuth(true);
      }
      setrankHistoryArr(null)
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
                    {name} 历史成绩
                  </MKTypography>
                  <MKTypography variant="body2" color="white" opacity={0.8}>
                    最高统计最近20场比赛成绩，再取其中一半最好成绩进行计算。
                  </MKTypography>
                </MKBox>
                <MKBox p={{ xs: 3, md: 6 }}>
                  <MKTypography variant="body2" color="grey" opacity={0.8} hidden={!noAuth}>
                    您无权查看本排名
                  </MKTypography>
                  <div className="table_1_wrap">
                    <table className="table_1" hidden={rankHistoryArr == null}>
                      <thead>
                        <tr>
                          <th>日期</th>
                          <th>球场</th>
                          <th>T</th>
                          <th>(S/R/P)</th>
                          <th>毛杆</th>
                          <th>差点微分</th>
                          <th>状态</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          rankHistoryArr && rankHistoryArr.map(x => {
                            return (
                              <tr key={rankIndex}>
                                <td>{x.event_date}</td>
                                <td>{x.courseName}</td>
                                <td>{Helper.renderT(x.participant_t)}</td>
                                <td>({x.ts} / {x.tr} / {x.tp})</td>
                                <td>{x.participant_score}</td>
                                <td>{x.participant_handicap_differential}</td>
                                <td>{x.rank_history_is_used_for_calculate == 1 && <div dangerouslySetInnerHTML={{ __html: `<span class="label label-green">有效</span>` }} />}</td>
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
      <MKBox p={{ xs: 2, md: 4 }}>
        <SimpleFooter />
      </MKBox>
    </>
  );
}

export default RankDetailPage;
