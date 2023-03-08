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

function MemberPage() {
  const [noAuth, setNoAuth] = useState(false);
  const [memberArr, setMemberArr] = useState(null);
  const navigate = useNavigate();
  let rankIndex = 1;

  useEffect(async () => {
    try {
      const url = `${Helper.host}/restAPI/userController.php?action=getMembers`;
      const res = await axios.get(url, Helper.hostHeaders);
      if (res.data.result) {
        setMemberArr(res.data.result);
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {
      if (e.response.data.code == 403) {
        setNoAuth(true);
      }
      setMemberArr(null)
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
                    会员
                  </MKTypography>
                  <MKTypography variant="body2" color="white" opacity={0.8}>
                    本俱乐部所有会员列表
                  </MKTypography>
                </MKBox>
                <MKBox p={{ xs: 3, md: 6 }}>
                  <MKTypography variant="body2" color="grey" opacity={0.8} hidden={!noAuth}>
                    您无权查看本页面
                  </MKTypography>
                  <div className="table_1_wrap">
                    <table className="table_1" hidden={memberArr == null}>
                      <thead>
                        <tr>
                          <th>头像</th>
                          <th>姓名</th>
                          <th>会员状态</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          memberArr && memberArr.map(x => {
                            return (
                              <tr key={x.user_id}>
                                <td><MKAvatar src={`${Helper.host}${x.user_avatar}`} alt="Burce Mars" size="s" shadow="xl" /></td>
                                <td>{x.user_first_name} {x.user_last_name}</td>
                                <td>{Helper.renderUserType(x.user_category_id,x.user_category_title)}</td>
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

export default MemberPage;
