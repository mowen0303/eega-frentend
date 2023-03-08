import React, { useState, useEffect } from "react";
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
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";

function EventDetailPage() {

  const [currentEnrollIndex, setCurrentEnrollIndex] = useState(-1);
  const [noAuth, setNoAuth] = useState(false);
  const [event, setEvent] = useState({});
  const [participantObj, setParticipantObj] = useState(null);
  const { eventId } = useParams();
  const [show, setShow] = useState(false);
  const toggleModal = () => setShow(!show);
  const [enrollError, setEnrollError] = useState(null);
  const [modelStage, setModelStage] = useState("enroll"); // enroll / enrollOther / unEnroll
  const [enrollElement, setEnrollElement] = useState({});
  const [pin, setPIN] = useState("");

  async function getEventData() {
    try {
      const url = `${Helper.host}/restAPI/eventController.php?action=getEvent&eventId=${eventId}`;
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

  async function getParticipantData() {
    try {
      const url = `${Helper.host}/restAPI/eventController.php?action=getParticipants&event_id=${eventId}`;
      const res = await axios.get(url, Helper.hostHeaders);
      if (res.data.result) {
        let obj = {};
        res.data.result.forEach(x => {
          obj[x.participant_index] = x
        })
        setParticipantObj(obj);
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {

    }
  }

  useEffect(() => {
    getEventData();
    getParticipantData();
  }, [])

  function renderEnrollBtn() {
    let container = [];
    let elements = [];
    let groudIndex = 1;
    for (let i = 1; i <= event.event_max_participant; i++) {
      elements.push(<div key={i} className={`enrollBtn ${participantObj[i - 1] ? 'occupy' : ''}`} onClick={(e) => enroll(e, i - 1)}>{participantObj[i - 1] ? `${participantObj[i - 1].user_first_name} ${participantObj[i - 1].user_last_name}` : "+"}</div>)
      if (i % 4 == 0) {
        container.push(React.createElement("div", { className: "enrollBtnWrap", key: i }, [<div key={'a' + i} className="enrollBtnGroupTitle">第{groudIndex++}组</div>, ...elements]));
        elements = [];
      }
    }

    return container;
  }

  function enroll(e, index) {
    setCurrentEnrollIndex(index);
    setEnrollElement(e);
    if (participantObj[index] && participantObj[index].participant_user_id == global.auth.cc_id) {
      setModelStage("unEnroll");
      toggleModal()
    } else if (participantObj[index]) {
      //alert("此位置已被预定");
    } else {
      setModelStage("enroll");
      toggleModal()
    }
  }

  async function confirmEnrollForMyself() {
    try {
      const url = `${Helper.host}/restAPI/eventController.php?action=addParticipant`;
      const res = await axios.post(url, {
        participant_event_id: event.event_id,
        participant_index: currentEnrollIndex
      }, Helper.hostHeaders);
      if (res.data.result) {
        enrollElement.target.innerText = `${res.data.result.user_first_name} ${res.data.result.user_last_name}`;
        enrollElement.target.classList.add('occupy');
        participantObj[currentEnrollIndex] = res.data.result;
        setParticipantObj(participantObj);
        toggleModal();
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {
      // console.log()
      setEnrollError(e && e.response && e.response.data && e.response.data.message)
    }
  }

  async function confirmEnrollForOther() {
    try {
      console.log(pin)
      const url = `${Helper.host}/restAPI/eventController.php?action=addParticipantByPIN`;
      const res = await axios.post(url, {
        participant_event_id: event.event_id,
        participant_index: currentEnrollIndex,
        pin: pin,
      }, Helper.hostHeaders);
      if (res.data.result) {
        enrollElement.target.innerText = `${res.data.result.user_first_name} ${res.data.result.user_last_name}`;
        enrollElement.target.classList.add('occupy');
        participantObj[currentEnrollIndex] = res.data.result;
        setParticipantObj(participantObj);
        toggleModal();
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {
      // console.log()
      setEnrollError(e && e.response && e.response.data && e.response.data.message)
    }
  }

  async function deleteEnroll() {
    try {
      console.log(participantObj)
      const url = `${Helper.host}/restAPI/eventController.php?action=deleteParticipant`;
      const res = await axios.post(url, {
        participant_event_id: event.event_id
      }, Helper.hostHeaders);
      if (res.data.result) {
        enrollElement.target.innerText = "+";
        enrollElement.target.classList.remove('occupy');
        participantObj[currentEnrollIndex] = null;
        setParticipantObj(participantObj);
        toggleModal();
      } else {
        throw new Error(res.data.message);
      }
    } catch (e) {
      // console.log()
      setEnrollError(e && e.response && e.response.data && e.response.data.message)
    }
  }

  function renderModelContent() {
    if (modelStage == "enroll") {
      return (
        <div>
          <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
            <MKTypography variant="h5">比赛报名</MKTypography>
            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <MKTypography variant="body2" color="secondary" fontWeight="regular">
              点击报名按钮，即可报名本次比赛。
            </MKTypography>
            <MKTypography variant="body2" color="error" fontWeight="regular">
              {enrollError}
            </MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="space-between" p={1.5}>
            <MKButton variant="gradient" color="dark" onClick={toggleModal}>
              关闭
            </MKButton>
            <MKBox display="flex" justifyContent="space-between">
              <MKButton variant="gradient" color="info" sx={{ mr: 2 }} onClick={() => setModelStage("enrollOther")}>
                帮朋友报名
              </MKButton>
              <MKButton variant="gradient" color="info" onClick={confirmEnrollForMyself}>
                给自己报名
              </MKButton>
            </MKBox>
          </MKBox>
        </div>
      )
    } else if (modelStage == "unEnroll") {
      return (
        <div>
          <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
            <MKTypography variant="h5">取消报名</MKTypography>
            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <MKTypography variant="body2" color="secondary" fontWeight="regular">
              你确定要退出本次活动吗？
            </MKTypography>
            <MKTypography variant="body2" color="error" fontWeight="regular">
              {enrollError}
            </MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="space-between" p={1.5}>
            <MKButton variant="gradient" color="dark" onClick={toggleModal}>
              关闭
            </MKButton>
            <MKButton variant="gradient" color="info" onClick={deleteEnroll}>
              退出报名
            </MKButton>
          </MKBox>
        </div>
      )
    } else if (modelStage == "enrollOther") {
      return (
        <div>
          <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
            <MKTypography variant="h5">帮朋友报名</MKTypography>
            <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox p={2}>
            <Grid container item xs={12} lg={12} py={1} mx="auto">
              <MKInput label="请输入你朋友的PIN" fullWidth  value={pin} onChange={e=>setPIN(e.target.value)} />
            </Grid>
            <MKTypography variant="body2" color="error" fontWeight="regular">
              {enrollError}
            </MKTypography>
          </MKBox>
          <Divider sx={{ my: 0 }} />
          <MKBox display="flex" justifyContent="space-between" p={1.5}>
            <MKButton variant="gradient" color="dark" onClick={toggleModal}>
              关闭
            </MKButton>
            <MKButton variant="gradient" color="info" onClick={confirmEnrollForOther}>
              确认报名
            </MKButton>
          </MKBox>
        </div>
      )
    }
  }


  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={false}
        sticky
      />
      <MKBox component="section" pt={20} pb={0}>
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
                    {event.event_title}
                  </MKTypography>
                  <MKTypography variant="body2" color="white" opacity={0.8}>
                    比赛日期：{event.event_date}
                  </MKTypography>
                </MKBox>
                <MKBox p={6} hidden={!noAuth}>
                  <MKTypography variant="body2" color="grey" opacity={0.8}>
                    您无权查看本页面
                  </MKTypography>
                </MKBox>
                <MKBox p={{ xs: 3, md: 8 }} hidden={noAuth}>
                  <MKTypography variant="h4" color="grey" opacity={0.8}>
                    球场信息
                  </MKTypography>
                  <MKTypography variant="body2" color="grey" opacity={0.8} mt={2}>
                    · 球场名称：{event.courseName}
                  </MKTypography>
                  {
                    event.t_red &&
                    <MKTypography variant="body2" color="grey" opacity={0.8} mt={2}>
                      · Red T - Rating:{event.t_red.rating} | Slope:{event.t_red.slope} | Par:{event.t_red.par}
                    </MKTypography>
                  }
                  {
                    event.t_green &&
                    <MKTypography variant="body2" color="grey" opacity={0.8} mt={2}>
                      · Green T - Rating:{event.t_green.rating} | Slope:{event.t_green.slope} | Par:{event.t_green.par}
                    </MKTypography>
                  }
                  {
                    event.t_white &&
                    <MKTypography variant="body2" color="grey" opacity={0.8} mt={2}>
                      · White T - Rating:{event.t_white.rating} | Slope:{event.t_white.slope} | Par:{event.t_white.par}
                    </MKTypography>
                  }
                  {
                    event.t_blue &&
                    <MKTypography variant="body2" color="grey" opacity={0.8} mt={2}>
                      · Blue T - Rating:{event.t_blue.rating} | Slope:{event.t_blue.slope} | Par:{event.t_blue.par}
                    </MKTypography>
                  }
                  {
                    event.t_black &&
                    <MKTypography variant="body2" color="grey" opacity={0.8} mt={2}>
                      · Black T - Rating:{event.t_black.rating} | Slope:{event.t_black.slope} | Par:{event.t_black.par}
                    </MKTypography>
                  }
                  <MKTypography variant="h4" color="grey" opacity={0.8} mt={4}>
                    活动详情
                  </MKTypography>
                  <pre style={{ fontFamily: "Roboto,Helvetica,Arial", lineHeight: "2.2em", fontSize: "1rem", opacity: "0.8", marginTop: "1em" }}>
                    {event.event_description == "" ? "暂无活动详情信息" : event.event_description} 暂无活动详情信息
                  </pre>
                  <MKTypography variant="h4" color="grey" opacity={0.8} mt={4}>
                    比赛报名
                  </MKTypography>
                  <MKTypography variant="body2" color="grey" opacity={0.6} mt={1}>
                    请点击下方空位进行报名，比赛开始的前一天，将进行报名锁定，无法自主报名和取消报名，届时如果想报名或取消报名，请与赛事管理员联系。
                  </MKTypography>
                  <div className="enrollBtnContainer">
                    {participantObj && renderEnrollBtn()}
                  </div>
                </MKBox>
              </Card>
            </Grid>
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
                {renderModelContent()}
              </MKBox>
            </Slide>
          </Modal>
        </Container>
      </MKBox>
      <MKBox pt={{ xs: 0, lg: 3 }} pb={3}>
        <SimpleFooter />
      </MKBox>

    </>
  );
}

export default EventDetailPage;
