import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Kit 2 PRO React themes
import theme from "assets/theme";
import CoworkingPage from "layouts/pages/landing-pages/coworking";
import RankDetailPage from "pages/rank/rankDetail";
import ScoreDetailPage from "pages/score/scoreDetail";
import ScoreHistoryPage from "pages/score/scoreHistory";
import EventDetailPage from "pages/event/eventDetail";
import PicDetailPage from "pages/pic/picDetail";
import MePage from "pages/me";
import 'style/css.css'

// Material Kit 2 PRO React routes
import routes from "routes";

import { connect } from 'react-redux';
import {isLogin} from './redux/actions/userAction';

function App(props) {
    const { pathname } = useLocation();

    // Setting page scroll to 0 when changing the route
    useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        props.isLogin();
    }, [pathname]);

    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                return <Route exact path={route.route} element={route.component} key={route.name} />;
            }

            return null;
        });


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                {getRoutes(routes)}
                <Route path="/" element={<CoworkingPage />} />
                <Route exact path="/event/detail/:eventId" element={<EventDetailPage />} />
                <Route exact path="/rank/detail/:userId" element={<RankDetailPage />} />
                <Route exact path="/score/detail/:eventId" element={<ScoreDetailPage />} />
                <Route exact path="/score/history/:participantId" element={<ScoreHistoryPage />} />
                <Route exact path="/pic/detail/:eventId" element={<PicDetailPage />} />
                <Route exact path="/me" element={<MePage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </ThemeProvider>
    );
}

const mapStateToProps = (state) => ({
    auth: state.userReducer.auth,
})

const mapDispatchToProps = { isLogin }

export default connect(mapStateToProps,mapDispatchToProps)(App);
