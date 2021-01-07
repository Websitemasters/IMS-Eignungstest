import axios from "axios";

const auth = {
  isAuthenticated: false,
  authenticate(cb, username, password) {
    axios.get(`http://localhost:8080/api/admin/login?username=${username}&password=${password}`)
      .then((res) => {
        console.log(res.data);
        if (res.data === true) {
          auth.isAuthenticated = true;
          setTimeout(cb, 100);
        } else {
          auth.isAuthenticated = false;
          setTimeout(cb, 100);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  },
  signout(cb) {
    auth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

export default auth;