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
import MKButton from "components/MKButton";

function MemberPage() {
  const navigate = useNavigate();
  const [noAuth, setNoAuth] = useState(true);
  const [noAuthText, setNoAuthText] = useState("...");
  const [memberArr, setMemberArr] = useState(null);
  const [amount, setAmount] = useState(null);
  const [sortBy, setSortBy] = useState("desc");
  const [orderBy, setOrderBy] = useState("group");

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

  async function getData(newOrderBy, previousOrderBy, currentSortBy) {
    try {
      let sortBy = "asc";
      if (newOrderBy == previousOrderBy && currentSortBy == "asc") {
        sortBy = "desc";
      }
      setOrderBy(newOrderBy);
      setSortBy(sortBy);

      const url = `${Helper.host}/restAPI/userController.php?action=getMembers&orderBy=${newOrderBy}&sort=${sortBy}`;
      const res = await axios.get(url, Helper.hostHeaders);
      if (res.data.result) {
        setMemberArr(res.data.result);
        setNoAuth(false);
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {
      let amount = await getAmountOfUser();
      if (e.response.data.code == 403) {
        setNoAuth(true);
        setNoAuthText(`当前共有 ${amount} 名注册会员，详细会员名单请登录后查看。`);
      }
      setMemberArr(null)
    }
  }

  useEffect(async () => {
    getData('group', orderBy, sortBy);
  }, [])

  async function getAmountOfUser() {
    try {
      const url = `${Helper.host}/restAPI/userController.php?action=getAmountOfUser`;
      const res = await axios.get(url, Helper.hostHeaders);
      return res.data.result.amount;
    } catch (e) {

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
                    会员
                  </MKTypography>
                  <MKTypography variant="body2" color="white" opacity={0.8}>
                    本俱乐部所有会员列表
                  </MKTypography>
                </MKBox>
                <MKBox p={{ xs: 3, md: 6 }}>
                  {
                    noAuth ?
                      <div>
                        <MKTypography variant="body2" color="text">
                          {noAuthText}
                        </MKTypography>
                        <MKButton variant="gradient" color="info" onClick={() => { navigate('/me') }} style={{ marginTop: '20px', display: noAuthText == "..." ? "none" : "block"}}>
                          登录
                        </MKButton>
                      </div>
                      :
                      <div className="table_1_wrap">
                        <table className="table_1" hidden={memberArr == null}>
                          <thead>
                            <tr>
                              <th><div className="a2" onClick={() => getData("userId", orderBy, sortBy)}>编号 <span>{getIcon("userId")}</span></div></th>
                              <th>头像</th>
                              <th><div className="a2" onClick={() => getData("lastName", orderBy, sortBy)}>姓 <span>{getIcon("lastName")}</span></div></th>
                              <th><div className="a2" onClick={() => getData("firstName", orderBy, sortBy)}>名 <span>{getIcon("firstName")}</span></div></th>
                              <th><div className="a2" onClick={() => getData("group", orderBy, sortBy)}>会员状态 <span>{getIcon("group")}</span></div></th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              memberArr && memberArr.map(x => {
                                return (
                                  <tr key={x.user_id} className={x.user_id == global.auth.cc_id ? "my" : ""}>
                                    <td>{x.user_id}</td>
                                    <td style={{padding:"1em"}}>
                                      <div style={{width:"54px",height:"54px",borderRadius:"100px",overflow:"hidden"}}>
                                        <img src={`${Helper.host}${x.user_avatar}`} style={{height:"100%",width:"100%",objectFit:"cover"}}/>
                                      </div>
                                    </td>
                                    <td>{x.user_last_name}</td>
                                    <td>{x.user_first_name}</td>
                                    <td>{Helper.renderUserType(x.user_category_id, x.user_category_title)}</td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </table>
                      </div>
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

export default MemberPage;
