import axios from "axios";

const auth = {
  isAuthenticated: false,
  authenticate(cb, username, password) {
    axios.post("http://localhost:8080/login", {
      username: username,
      password: password
    })
      .then((res) => {
        console.log(typeof (res.data));
        if (res.data == true) {
          auth.isAuthenticated = true;
        } else {
          auth.isAuthenticated = false;
        }
      })
    setTimeout(cb, 100);
  }
};

export default auth;
