export default class Helper {

  static host = window.location.hostname == "localhost" ? 'http://localhost' : window.location.origin;
  // static host = 'http://localhost';
  static hostHeaders = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    withCredentials:true,
  };
  
}