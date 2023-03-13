import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { useNavigate } from "react-router-dom";

function SimpleInfoCard({ color, icon, title, description, direction, eventObj }) {

  const navigate = useNavigate();

  let alignment = "flex-start";

  if (direction === "center") {
    alignment = "center";
  } else if (direction === "right") {
    alignment = "flex-end";
  }

  return (
    <MKBox
      display="flex"
      flexDirection="column"
      alignItems={alignment}
      textAlign={direction}
      p={direction === "center" ? 2 : 0}
      lineHeight={1}
    >
      <MKBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="3rem"
        height="3rem"
        borderRadius="xl"
        variant="gradient"
        color="white"
        bgColor={color}
        coloredShadow={color}
      >
        {typeof icon === "string" ? <Icon fontSize="small">{icon}</Icon> : icon}
      </MKBox>
      <MKTypography display="block" variant="5" fontWeight="bold" mt={2.5} mb={1.5}>
        {title}
      </MKTypography>
      <div dangerouslySetInnerHTML={{__html:description}} style={{fontSize:"0.8em"}}></div>
      {
        eventObj &&
        <MKTypography display="block" variant="body2" mt={1.5} mb={1.5}>
          <a className="a1" onClick={()=>navigate(`event/detail/${eventObj.event_id}`)}>下一场比赛，将于 {eventObj.event_date} 在 {eventObj.courseName} 举行，比赛人数上限为 {eventObj.event_max_participant} 人。</a>
        </MKTypography>
      }
    </MKBox>
  );
}

// Setting default props for the SimpleInfoCard
SimpleInfoCard.defaultProps = {
  color: "info",
  direction: "left",
};

// Typechecking props for the SimpleInfoCard
SimpleInfoCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["left", "right", "center"]),
};

export default SimpleInfoCard;
