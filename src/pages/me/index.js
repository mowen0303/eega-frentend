import React, { Component } from 'react';

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Kit 2 PRO React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

// Authentication pages components
import BasicLayout from "pages/Authentication/components/BasicLayout";
import Author from "pages/Blogs/Author";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { login, getUser } from 'redux/actions/userAction';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    auth: state.userReducer.auth,
})

const mapDispatchToProps = { login, getUser }

class MePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rememberMe:true,
            userName: "",
            pwd: ""
        }
    }

    componentDidMount() {

    }


    handleSetRememberMe = () => this.setState({ rememberMe: !this.state.rememberMe });

    render() {
        const {auth} = this.props;
        if(auth.data.cc_id){
            return <Author />;
        }else{
            return (
                <BasicLayout image={bgImage}>
                    <Card>
                        <MKBox
                            variant="gradient"
                            bgColor="info"
                            borderRadius="lg"
                            coloredShadow="info"
                            mx={2}
                            mt={-3}
                            p={4}
                            mb={1}
                            textAlign="center"
                        >
                            <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                EEGA会员登录
                            </MKTypography>
                        </MKBox>
                        <MKBox pt={4} pb={3} px={3}>
                            <MKTypography variant="body2" fontWeight="light" color="error" mt={1} style={{marginBottom:"1em"}}>
                                {auth.error || ""}
                            </MKTypography>
                            <MKBox component="form" role="form">
                                <MKBox mb={2}>
                                    <MKInput type="text" label="用户名" fullWidth value={this.state.userName} onChange={e => this.setState({ userName: e.target.value })} />
                                </MKBox>
                                <MKBox mb={2}>
                                    <MKInput type="password" label="密码" fullWidth value={this.state.pwd} onChange={e => this.setState({ pwd: e.target.value })} />
                                </MKBox>
                                <MKBox display="flex" alignItems="center" ml={-1}>
                                    <Switch checked={this.state.rememberMe} onChange={this.handleSetRememberMe} />
                                    <MKTypography
                                        variant="button"
                                        fontWeight="regular"
                                        color="text"
                                        onClick={this.handleSetRememberMe}
                                        sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                                    >
                                        &nbsp;&nbsp;下次自动登录
                                    </MKTypography>
                                </MKBox>
                                <MKBox mt={4} mb={1}>
                                    <MKButton
                                        variant="gradient"
                                        color="info"
                                        fullWidth
                                        onClick={() => this.props.login(this.state.userName, this.state.pwd)}
                                    >
                                        登录
                                    </MKButton>
                                </MKBox>
                            </MKBox>
                        </MKBox>
                    </Card>
                </BasicLayout>
            );
        }
        
    }
}

// export default MePage;
export default connect(mapStateToProps, mapDispatchToProps)(MePage)
