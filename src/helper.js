import MKBadge from "components/MKBadge";

export default class Helper {

  static host = window.location.hostname == "localhost" ? 'http://localhost' : window.location.origin;
  // static host = 'http://localhost';
  static hostHeaders = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    withCredentials:true,
  };

  static renderT = (t) => {
    switch(t){
      case 'red':
        return <MKBadge badgeContent={t} color="error" container />
      case 'green':
        return <MKBadge badgeContent={t} color="success" container />
      case 'white':
        return <MKBadge badgeContent={t} color="light" container />
      case 'blue':
        return <MKBadge badgeContent={t} color="info" container />
      case 'black':
        return <MKBadge badgeContent={t} color="dark" container />
      default:
        return t
    }
  }

  static renderUserType = (userCategoryId,title) => {
    switch(userCategoryId){
      case 1:
        return <MKBadge badgeContent={title} color="error" container />
      case 2:
        return <MKBadge badgeContent={title} color="success" container />
      case 3:
        return <MKBadge badgeContent={title} color="dark" container />
      case 14:
        return <MKBadge badgeContent={title} color="light" container />
      case 15:
        return <MKBadge badgeContent={title} color="warning" container />
      default:
        return title
    }
  }

  static renderEventStatus = (title) => {
    switch(title){
      case "已结束":
        return <MKBadge badgeContent={title} color="light" container />
      case "今日比赛":
        return <MKBadge badgeContent={title} color="success" container />
      case "报名已锁定":
        return <MKBadge badgeContent={title} color="warning" container />
      case "开放报名":
        return <MKBadge badgeContent={title} color="info" container />
      case "未开放":
        return <MKBadge badgeContent={title} color="error" container />
      default:
        return title
    }
  }
  
}