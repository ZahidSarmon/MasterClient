import type { NavigationGuard } from 'vue-router';
import tokenService from './tokenService';
import _ from 'lodash';
import agent from './httpClient';
import { RefreshResponse } from './models/refresh';

export const authGuard: NavigationGuard = async (to, from, next) => {
  // const token = tokenService.getToken();
  // const isExpired = tokenService.isExpired(token);

  // let pages:any[] = [];
  // const pagesParent = tokenService.getPages();
  // if(pagesParent){
  //   const pagesChilds = _.flatMap(pagesParent,({ childs }) => childs.map((ele) => ({ ...ele })));
  //   pages = [...pagesParent,...pagesChilds];
  // }

  // if(!token){
  //   next('/login');
  // }

  // if(pages && _.map(pages,i=>i.pageUrl).includes(to.path) || to.path=="/home"){
  //   next();
  // }else{
  //   next('/not-found');
  // }

  next();
};