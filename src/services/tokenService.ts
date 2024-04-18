import _ from 'lodash';
import localStore from './localStore';
import { LoginDTO, ModuleBaseUrl } from './models/login';
import {UserPage} from '../components/common/model';
import { AppConstants } from '@/shared/appConstants';

class TokenService {
    getJwtUser() {
      return localStore.getItem(AppConstants.LOCAL_STORAGE_KEY_USER);
    }
  
    setJwtUser(login:LoginDTO) {
      localStore.setItem(AppConstants.LOCAL_STORAGE_KEY_USER, login);
    }
  
    removeJwtUser() {
      localStore.removeItem(AppConstants.LOCAL_STORAGE_KEY_USER);
    }

    getToken(){
      const user = localStore.getItem(AppConstants.LOCAL_STORAGE_KEY_USER);
      if(user) return user.token;
      return undefined;
    }

    setToken(token:string){
      const user = localStore.getItem(AppConstants.LOCAL_STORAGE_KEY_USER);
      if(user){
        user.token = token;
        this.setJwtUser(user);
      }
    }

    getUserEmail(){
      //const user = localStore.getItem(AppConstants.LOCAL_STORAGE_KEY_USER);
      //if(user) return user.email;
      return "admin@mail.com";
    }

    setPages(pages:UserPage[]){
      if(localStore.getItem(AppConstants.LOCAL_STORAGE_KEY_PAGES)){
        localStore.removeItem(AppConstants.LOCAL_STORAGE_KEY_PAGES);
      }
      localStore.setItem(AppConstants.LOCAL_STORAGE_KEY_PAGES, pages);
    }

    getPages():UserPage[]{
      return localStore.getItem(AppConstants.LOCAL_STORAGE_KEY_PAGES);
    }

    isAuthorized(){
      return !this.isExpired(this.getToken());
    }

    isExpired(token:string | undefined | null) {
      if(!token) return true;

      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
    
      const { exp } = JSON.parse(jsonPayload);
      const expired = Date.now() >= exp * 1000;

      return expired;
    }
  }
  
  export default new TokenService();