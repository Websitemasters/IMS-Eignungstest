const auth = {
  isAuthenticated: false,
  authenticate(cb, name, vorname) {
    if (name !== "admin" || vorname !== "12345") {
      auth.isAuthenticated = false;
    } else {
      auth.isAuthenticated = true;
    }
    setTimeout(cb, 100);
  },
  signout(cb) {
    auth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

export default auth;