import axios, { AxiosError, AxiosResponse } from "axios";
import toasterService from "./toasterService";
import preLoader from "./preLoader";
import tokenService from "./tokenService";

axios.defaults.baseURL = "https://localhost:6001/master/api/";

axios.interceptors.response.use(
  (response) => {
    preLoader.hide();
    return response;
  },
  (error: AxiosError) => {
    preLoader.hide();
    if (error && error.response) {
      let responseModel;
      switch (error.response.status) {
        case 400:
          responseModel = JSON.parse(JSON.stringify(error.response.data));
          if (responseModel && responseModel.errorMessage) {
            toasterService.warn(`${responseModel.errorMessage}`);
          } else {
            toasterService.warn(`${responseModel.title}`);
          }
          break;
        case 401:
          toasterService.error("You're Unauthorized!.");
          break;
        case 403:
          toasterService.error("Forbidden!!");
          break;
        case 404:
          toasterService.error("Not Found!!");
          break;
        case 405:
          toasterService.error("Method not allowed!!");
          break;
        case 500:
          toasterService.error(`Server Error!!${error.message}`);
          break;
      }
    }else if(error){
      toasterService.error(`${error.message}`);
    }
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response && response.data;

const httpClient = {
  async get<T>(url: string, params: {} = {},isLoader:boolean=true){
    if(isLoader) preLoader.show();
    return axios
        .get<T>(url, { params: params })
        .then(responseBody)
        .catch();
  },
  async post<T>(url: string, body: {},headers: {} = {},isLoader:boolean=true) {
    if(isLoader) preLoader.show();
    return axios
        .post<T>(url, body,headers)
        .then(responseBody)
        .catch();
  },
  put<T>(url: string, body: {},isLoader:boolean=true){
    if(isLoader) preLoader.show();
    return axios
        .put<T>(url, body)
        .then(responseBody)
        .catch();
  },
  delete<T>(url: string, params: {} = {},data:{}={},isLoader:boolean=true) {
    if(isLoader) preLoader.show();
    return axios
      .delete<T>(url, { params: params,data:data})
      .then(responseBody)
      .catch();
  },
};

export default httpClient;
