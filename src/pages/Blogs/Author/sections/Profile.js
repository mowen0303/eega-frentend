import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import Helper from "helper";

import { connect } from "react-redux";
import { logout, updateMyProfile, updateMyPin } from "redux/actions/userAction";


function Profile(props) {

  const [checked, setChecked] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const currentChannelName = props.profile.data;

  useEffect(() => {
    if (currentChannelName) {
      setFirstName(currentChannelName.user_first_name);
      setLastName(currentChannelName.user_last_name);
      setEmail(currentChannelName.user_email);
      setPhone(currentChannelName.user_phone);
    }
  }, [currentChannelName]); // listen only to currentChannelName changes

  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container sx={{ m: 0, pl: 2, pr: 2 }}>
        <Grid container item xs={12} justifyContent="center" mx="auto">
          <MKBox mt={{ xs: -16, md: -20 }} textAlign="center">
            <MKAvatar src={`${Helper.host}${props.profile.data.user_avatar}`} alt="Burce Mars" size="xxl" shadow="xl" />
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
                <MKBox width="100%" component="form" method="post" autocomplete="off">
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
                      <Grid item xs={12}>
                      <MKTypography variant="body2" mb={1}>
                        头像
                      </MKTypography>
                        <input
                          type="file"
                          name="myImage"
                          onChange={(event) => {
                            console.log(event.target.files[0]);
                            setSelectedImage(event.target.files[0]);

                            // let fileReader = new FileReader();
                            // fileReader.readAsDataURL(event.target.files[0]);
                            // fileReader.onload = (event) => {
                            //     setSelectedImage(event.target.result);
                            // }
                            
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
                        user_avatar:selectedImage
                      })}>
                        更新信息
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
