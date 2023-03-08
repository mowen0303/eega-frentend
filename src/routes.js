import Icon from "@mui/material/Icon";

// Pages
import SignInBasicPage from "layouts/authentication/sign-in/basic";
import HomePage from "pages/home";
import EventListPage from "pages/event";
import ScoreListPage from "pages/score";
import RankPage from "pages/rank";
import MemberPage from "pages/member";
import SponsorPage from "pages/sponsor";
import PicPage from "pages/pic";

const routes = [
  {
    name: "首页",
    icon: <Icon>home</Icon>,
    route: "/",
    component: <HomePage />,
  },
  {
    name: "会员",
    icon: <Icon>people_alt_icon</Icon>,
    route: "/member",
    component: <MemberPage />,
  },
  {
    name: "比赛报名",
    icon: <Icon>sports_golf</Icon>,
    route: "/event",
    component: <EventListPage />,
  },
  {
    name: "比赛成绩",
    icon: <Icon>star_rate</Icon>,
    route: "/score",
    component: <ScoreListPage />,
  },
  {
    name: "差点排名",
    icon: <Icon>emoji_events</Icon>,
    route: "/rank",
    component: <RankPage />,
  },
  {
    name: "赞助荣誉榜",
    icon: <Icon>workspace_premium</Icon>,
    route: "/sponsor",
    component: <SponsorPage />,
  },
  {
    name: "活动照片",
    icon: <Icon>view_day</Icon>,
    route: "/pic",
    component: <PicPage />,
  },
  {
    name: "我的账号",
    icon: <Icon>account_box</Icon>,
    route: "/me",
    component: <SignInBasicPage />,
  },
];

export default routes;
