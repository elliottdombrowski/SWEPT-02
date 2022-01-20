import decode from 'jwt-decode';

class AuthService {
  getProfile(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/snow');
    return decode(this.getToken());
  };

  loggedIn() {
    const token = localStorage.getItem('id_token');
    if (!token) {
      return false;
    } else {
      return token;
    }
  };

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  getToken() {
    return localStorage.getItem('id_token');
  };

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/sweeper');
  };

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('uuid');
    window.location.assign('/');
  };
};

export default new AuthService();