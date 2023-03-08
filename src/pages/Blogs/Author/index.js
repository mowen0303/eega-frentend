import React, { Component } from 'react';
import Card from "@mui/material/Card";
import MKBox from "components/MKBox";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import Profile from "pages/Blogs/Author/sections/Profile";
import routes from "routes";
import bgImage from "assets/images/city-profile.jpg";
import { getUser } from "redux/actions/userAction";
import { connect } from "react-redux";
import SimpleFooter from "examples/Footers/SimpleFooter";


const mapStateToProps = (state) => ({
  auth: state.userReducer.auth,
  profile: state.userReducer.profile
})

const mapDispatchToProps = { getUser }

class Author extends Component {

  // props.getUser(props.auth.data.cc_id);

  constructor(props) {
    super(props);
    this.state = {
      rememberMe: true,
      userName: "",
      pwd: ""
    }
  }

  componentDidMount() {
    this.props.getUser(this.props.auth.data.cc_id);
  }

  render() {
    return (
      <>
        <DefaultNavbar
          routes={routes}
          action={false}
          transparent
          light
        />
        <MKBox bgColor="white">
          <MKBox
            minHeight="25rem"
            width="100%"
            sx={{
              backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                `${linearGradient(
                  rgba(gradients.dark.main, 0.8),
                  rgba(gradients.dark.state, 0.8)
                )}, url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "grid",
              placeItems: "center",
            }}
          />
          <Card
            sx={{
              p: 2,
              mx: { xs: 2, lg: 3 },
              mt: -8,
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <Profile />
          </Card>
          <MKBox p={{ xs: 2, md: 4 }}>
            <SimpleFooter />
          </MKBox>
        </MKBox>
      </>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Author);