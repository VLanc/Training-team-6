export class AuthServeces {
  // private isAuthentificated = false;

   login() {
     window.localStorage.setItem('login', 'true');
   }

   logout() {
     // this.isAuthentificated = false;
     window.localStorage.clear();
   }

   isLoggedIn(): boolean {
     return window.localStorage.getItem('login') == 'true';
   }
}
