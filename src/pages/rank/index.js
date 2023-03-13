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
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function RankPage() {
  const [noAuth, setNoAuth] = useState(false);
  const [rankArr, setRankArr] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate();
  let rankIndex = 1;

  async function getData(val) {
    try {
      const url = `${Helper.host}/restAPI/rankController.php?action=getRank&type=${val}`;
      const res = await axios.get(url, Helper.hostHeaders);
      if (res.data.result) {
        setRankArr(res.data.result);
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {
      if (e && e.response && e.response.data.code == 403) {
        setNoAuth(true);
      }
      setRankArr(null)
    }
  }

  useEffect(async () => {
    getData(activeTab);
  }, [])

  const handleTabType = (event, newValue) => {
    getData(newValue);
    setActiveTab(newValue);
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
                    差点指数排名
                  </MKTypography>
                  <MKTypography variant="body2" color="white" opacity={0.8}>
                    累积四场有效成绩后才会有差点指数。最高统计近期20场比赛成绩，再取其中一半最好成绩进行计算。
                  </MKTypography>
                </MKBox>
                <MKBox p={{ xs: 3, md: 6 }}>
                  {
                    noAuth ?
                      <MKTypography variant="body2" color="light" opacity={0.8}>
                        您无权查看本页面
                      </MKTypography>
                      :
                      <MKBox>
                        <Grid container item justifyContent="start" xs={12} lg={5} mx="auto" mb={4}>
                          <AppBar position="static">
                            <Tabs value={activeTab} onChange={handleTabType}>
                              <Tab label="本年度会员排名" />
                              <Tab label="历届所有会员排名" />
                            </Tabs>
                          </AppBar>
                        </Grid>
                        <div className="table_1_wrap">
                          <table className="table_1">
                            <thead>
                              <tr>
                                <th>排名</th>
                                <th>头像</th>
                                <th>姓名</th>
                                <th>身份</th>
                                <th>差点指数</th>
                                <th>统计场数</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                rankArr ?
                                  rankArr.map(x => {
                                    return (
                                      <tr key={rankIndex} className={x.rank_user_id == global.auth.cc_id ? "my" : ""}>
                                        <td>{rankIndex++}</td>
                                        <td><MKAvatar src={`${Helper.host}${x.user_avatar}`} alt="Burce Mars" size="s" shadow="xl" /></td>
                                        <td>{x.user_first_name} {x.user_last_name}</td>
                                        <td>{Helper.renderUserType(x.user_category_id, x.user_category_title)}</td>
                                        <td><a className="a1" onClick={() => navigate(`/rank/detail/${x.user_id}`)}>{x.rank_handicap_index}</a></td>
                                        <td>{x.rank_history_count}</td>
                                      </tr>
                                    )
                                  })
                                  :
                                  <tr>
                                    <td colSpan={6} style={{padding:"3em",textAlign:"center"}}>暂无排名数据</td>
                                  </tr>
                              }
                            </tbody>
                          </table>
                        </div>
                      </MKBox>
                  }
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

export default RankPage;
