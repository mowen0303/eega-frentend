import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import Helper from "helper";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import axios from "axios";

import { connect } from "react-redux";
import { logout, updateMyProfile, updateMyPin } from "redux/actions/userAction";


function Profile(props) {

  const [checked, setChecked] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const currentChannelName = props.profile.data;

  const [pwd0, setPwd0] = useState("");
  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [errorInfo, setErrorInfo] = useState("");

  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);

  useEffect(() => {
    if (currentChannelName) {
      setFirstName(currentChannelName.user_first_name || "");
      setLastName(currentChannelName.user_last_name || "");
      setEmail(currentChannelName.user_email || "");
      setPhone(currentChannelName.user_phone || "");
      setMonth(currentChannelName.user_month || "");
      setDay(currentChannelName.user_day || "");
    }
  }, [currentChannelName]); // listen only to currentChannelName changes

  async function updatePwd() {
    try {
      setErrorInfo("");
      const url = `${Helper.host}/restAPI/userController.php?action=updateMyPwd`;
      const res = await axios.post(url, {
        pw0: pwd0,
        pw1: pwd1,
        pw2: pwd2
      }, Helper.hostHeaders);
      if (res.data.message == "Success") {
        alert("密码修改成功,请用新密码登录账号。");
        setPwd0("");
        setPwd1("");
        setPwd2("");
        toggleModal();
        props.logout();
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {
      setErrorInfo(e && e.response && e.response.data && e.response.data.message)
    }
  }

  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container sx={{ m: 0, pl: 2, pr: 2 }}>
        <Grid container item xs={12} justifyContent="center" mx="auto">
          <MKBox mt={{ xs: -16, md: -20 }} textAlign="center">
            {
              props.profile.data.user_avatar && <MKAvatar src={`${Helper.host}${props.profile.data.user_avatar}`} size="xxl" shadow="xl" />
            }
          </MKBox>
        </Grid>
        <Grid container item xs={12} justifyContent="center" mx="auto" >
          <MKBox component="section" py={12}>
            <Container sx={{ m: 0, p: 0 }}>
              <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
                <MKTypography variant="h3" mb={1}>
                  {props.profile.data.user_first_name} {props.profile.data.user_last_name}
                </MKTypography>
              </Grid>
              <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
                <MKTypography variant="body" mb={1}>
                  PIN: {props.profile.data.user_pin}
                </MKTypography>
              </Grid>
              <Grid container item justifyContent="center" xs={10} lg={7} mx="auto" textAlign="center">
                <MKTypography variant="body2" mb={1}>
                  <MKButton variant="gradient" color="dark" onClick={props.updateMyPin}>
                    更新PIN
                  </MKButton>
                </MKTypography>
              </Grid>
              <Grid container item xs={12} lg={10} sx={{ mx: "auto" }} p={0}>
                <MKBox width="100%" component="form" method="post">
                  <MKBox pt={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <MKInput variant="standard" label="名" fullWidth value={firstName} onChange={e => setFirstName(e.target.value)} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <MKInput variant="standard" label="姓" fullWidth value={lastName} onChange={e => setLastName(e.target.value)} />
                      </Grid>
                      <Grid item xs={12}>
                        <MKInput variant="standard" type="email" label="电子邮件" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
                      </Grid>
                      <Grid item xs={12}>
                        <MKInput variant="standard" type="tel" label="手机" fullWidth value={phone} onChange={e => setPhone(e.target.value)} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <MKInput variant="standard" label="生日（月）" fullWidth value={month} onChange={e => setMonth(e.target.value)} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <MKInput variant="standard" label="生日（日）" fullWidth value={day} onChange={e => setDay(e.target.value)} />
                      </Grid>
                      <Grid item xs={12}>
                        <MKTypography variant="body2" mb={1}>
                          头像
                        </MKTypography>
                        <input
                          type="file"
                          name="myImage"
                          onChange={(event) => {
                            setSelectedImage(event.target.files[0]);
                          }}
                        />
                      </Grid>
                    </Grid>
                    <MKTypography variant="body2" fontWeight="light" color="error" mt={1} sx={{ mt: 5 }}>
                      {props.profile.error || ""}
                    </MKTypography>
                    <Grid container item justifyContent="center" xs={12} my={2}>
                      <MKButton type="button" variant="gradient" color="dark" fullWidth sx={{ mt: 2 }} onClick={() => props.updateMyProfile({
                        user_last_name: lastName,
                        user_first_name: firstName,
                        user_phone: phone,
                        user_email: email,
                        user_month: month,
                        user_day: day,
                        user_avatar: selectedImage
                      })}>
                        更新信息
                      </MKButton>
                      <MKButton type="button" variant="gradient" color="dark" fullWidth sx={{ mt: 2 }} onClick={() => {
                        setErrorInfo("");
                        toggleModal();
                      }
                      }>
                        修改密码
                      </MKButton>
                      <MKButton type="button" variant="gradient" color="error" fullWidth sx={{ mt: 2 }} onClick={() => props.logout()}>
                        退出登录
                      </MKButton>
                    </Grid>
                  </MKBox>
                </MKBox>
              </Grid>
            </Container>
          </MKBox>
        </Grid>
        <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
          <Slide direction="down" in={show} timeout={500}>
            <MKBox
              position="relative"
              width="360px"
              display="flex"
              flexDirection="column"
              borderRadius="xl"
              bgColor="white"
              shadow="xl"
            >
              <div>
                <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
                  <MKTypography variant="h5">修改密码</MKTypography>
                  <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
                </MKBox>
                <Divider sx={{ my: 0 }} />
                <MKBox p={2}>
                  <Grid container item xs={12} lg={12} py={1} mx="auto">
                    <MKInput type="password" label="原密码" fullWidth value={pwd0} onChange={e => setPwd0(e.target.value)} />
                  </Grid>
                  <Grid container item xs={12} lg={12} py={1} mx="auto">
                    <MKInput type="password" label="新密码" fullWidth value={pwd1} onChange={e => setPwd1(e.target.value)} />
                  </Grid>
                  <Grid container item xs={12} lg={12} py={1} mx="auto">
                    <MKInput type="password" label="确认新密码" fullWidth value={pwd2} onChange={e => setPwd2(e.target.value)} />
                  </Grid>
                  <MKTypography variant="body2" color="error" fontWeight="regular">
                    {errorInfo}
                  </MKTypography>
                </MKBox>
                <Divider sx={{ my: 0 }} />
                <MKBox display="flex" justifyContent="space-between" p={1.5}>
                  <MKButton variant="gradient" color="dark" onClick={toggleModal}>
                    关闭
                  </MKButton>
                  <MKButton variant="gradient" color="info" onClick={updatePwd}>
                    确认
                  </MKButton>
                </MKBox>
              </div>
            </MKBox>
          </Slide>
        </Modal>
      </Container>
    </MKBox>
  );
}

const mapStateToProps = (state) => ({
  auth: state.userReducer.auth,
  profile: state.userReducer.profile
})

const mapDispatchToProps = { logout, updateMyProfile, updateMyPin }

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
