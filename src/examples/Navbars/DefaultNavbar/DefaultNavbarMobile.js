import { useState } from "react";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import MKBox from "components/MKBox";
import Icon from "@mui/material/Icon";
import DefaultNavbarDropdown from "examples/Navbars/DefaultNavbar/DefaultNavbarDropdown";
import { connect } from 'react-redux';

function DefaultNavbarMobile(props) {

  const { routes, open } = props;

  const [collapse, setCollapse] = useState("");

  const handleSetCollapse = (name) => (collapse === name ? setCollapse(false) : setCollapse(name));

  const renderNavbarItems = routes.map(
    ({ name, icon, collapse: routeCollapses, href, route, collapse: navCollapse }) => (
      <DefaultNavbarDropdown
        key={name}
        name={name}
        icon={icon}
        collapseStatus={name === collapse}
        onClick={() => handleSetCollapse(name)}
        href={href}
        route={route}
        collapse={Boolean(navCollapse)}
      >
      </DefaultNavbarDropdown>
    )
  );

  return (
    <Collapse in={Boolean(open)} timeout="auto" unmountOnExit>
      <MKBox width="calc(100% + 1.625rem)" my={2} ml={-2}>
        {renderNavbarItems}
        <DefaultNavbarDropdown
          key={'user'}
          name={props.auth.data.cc_id ? `${props.auth.data.user_first_name} ${props.auth.data.user_last_name}` : "登录"}
          icon={<Icon>account_box</Icon>}
          route={"/me"}
        >
        </DefaultNavbarDropdown>
      </MKBox>
    </Collapse>
  );
}

// Typechecking props for the DefaultNavbarMobile
DefaultNavbarMobile.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  open: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.userReducer.auth,
})

export default connect(mapStateToProps,null)(DefaultNavbarMobile);;
