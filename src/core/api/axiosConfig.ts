/* eslint-disable id-denylist */
import axios, { AxiosInstance, AxiosPromise } from "axios";
import { USER_TOKEN_KEY } from "../constants";
import logger from "../utils/logger";
import { store } from "src/core/redux/store";
import { setToastrMessage } from "../redux/slices/toastrSlice";
import { loggerEvent } from "../logging/supervisor";
import strings from "src/translations/translations";

export const baseURL = process.env.AEROBOARD_CORE_URL;
interface IApiMethodProps {
  url: string;
  name: string;
  data?: object;
  withToken?: boolean;
  // eslint-disable-next-line no-unused-vars
  onUploadProgressChange?: (p: any) => void;
  content_type?: string;
}

export default class API {
  public static getInstance() {
    if (!this.instance) {
      this.instance = new API();
    }
    return this.instance;
  }

  // eslint-disable-next-line no-use-before-define
  private static instance: API;
  private AuthToken!: string | null;
  private axios: AxiosInstance | undefined;
  private headers!: {
    Authorization?: string;
    "Content-Type"?: string;
    Accept?: string;
  };

  private constructor() {
    this.InitialToken();
    this.CreateAxiosInstance(false, "");
  }

  public CreateAxiosInstance(withToken: boolean, name: string) {
    this.axios = axios.create({
      timeout: 30000,
      maxRedirects: 5,
      headers: this.getHeaders(withToken),
    });

    this.axios.interceptors.request.use(
      function (config: any) {
        const newConfig = { ...config };
        newConfig.metadata = { startTime: new Date(), reqName: name };
        return newConfig;
      },
      function (error) {
        logger.error(error);
        return Promise.reject(error);
      }
    );

    this.axios.interceptors.response.use(
      function (config: any) {
        const newRes = { ...config };
        newRes.config.metadata.endTime = new Date();
        newRes.duration =
          newRes.config.metadata.endTime - newRes.config.metadata.startTime;

        if (
          newRes.request.responseURL &&
          newRes.duration &&
          newRes.config.metadata.reqName
        ) {
          loggerEvent(newRes.config.metadata.reqName, {
            duration: newRes.duration,
          });
        }

        return newRes;
      },
      function (error) {
        const status = error?.response?.status;
        const newError = { ...error };
        newError.config.metadata.endTime = new Date();
        newError.duration =
          newError.config.metadata.endTime - newError.config.metadata.startTime;

        if (
          status < 500 &&
          status !== 403 &&
          status !== 404 &&
          error?.response?.data?.error?.detail
        ) {
          let detail = error?.response?.data?.error?.detail;
          if (typeof detail !== "string")
            detail = strings.error.unknown_problem_occured;
          store.dispatch(
            setToastrMessage({
              message: detail,
              type: "error",
            })
          );
        }
        logger.error(error);
        return Promise.reject(error.response || error);
      }
    );
  }

  public InitialToken() {
    const userToken = null;
    if (userToken) {
      this.AuthToken = userToken;
    } else this.AuthToken = null;
  }

  public destroy() {
    this.AuthToken = null;
  }

  public setAuthToken(name = "") {
    const _user_token = localStorage?.getItem(USER_TOKEN_KEY);
    this.AuthToken = _user_token ?? "";
    this.CreateAxiosInstance(true, name);
  }

  public handleAuthTokenInHeader(withToken: boolean, name: string) {
    if (withToken) {
      this.setAuthToken(name);
    } else {
      this.CreateAxiosInstance(false, name);
    }
  }

  public getHeaders(withToken = false): any {
    this.headers = {};
    if (this.AuthToken && withToken) {
      this.headers.Authorization = `Bearer ${this.AuthToken}`;
    }
    return this.headers;
  }

  public axiosWrapper<T>(axiosArgument: any): AxiosPromise<T> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      this.axios(axiosArgument)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
  }

  public PostMethod<T>(props: IApiMethodProps): AxiosPromise<T> {
    const { url, name, data, withToken, onUploadProgressChange } = props;
    this.handleAuthTokenInHeader(!!withToken, name);

    const options: {
      headers: any;
      maxContentLength?: number;
      maxBodyLength?: number;
    } = {
      headers: props.content_type
        ? { ...this.headers, "Content-Type": props.content_type }
        : this.headers,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    };

    return this.axiosWrapper<T>({
      method: "POST",
      url,
      headers: this.headers,
      data,
      config: options,
      onUploadProgress: (progressEvent: any) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onUploadProgressChange?.(percentCompleted);
      },
    });
  }

  public GetMethod<T>(props: IApiMethodProps): AxiosPromise<T> {
    const { url, name, data, withToken } = props;
    this.handleAuthTokenInHeader(!!withToken, name);

    return this.axiosWrapper<T>({
      method: "GET",
      url,
      headers: this.headers,
      data,
    });
  }

  public PatchMethod<T>(props: {
    url: string;
    data?: object;
  }): AxiosPromise<T> {
    const { url, data } = props;
    this.setAuthToken();
    return this.axiosWrapper<T>({
      method: "PATCH",
      url,
      headers: this.headers,
      data,
    });
  }
}
