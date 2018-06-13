import {User} from '../../entities/user.entity';

export class AuthService {
  private isAutheticated = false;

  login(user: User) {
    this.isAutheticated = true;
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.isAutheticated = false;
    window.localStorage.clear();
  }

  isLoggedIn(): boolean {
    return this.isAutheticated;
  }
}
