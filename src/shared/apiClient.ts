import { config } from "@/config/env";
import axios, { AxiosHeaders, type AxiosResponse, type CustomParamsSerializer, type ParamsSerializerOptions, type RawAxiosRequestHeaders } from "axios";

export const axiosClient = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    "Content-Type": "application/json",
  },
}); 

export type ApiClientConfig = {
  url?: string;
  headers?: RawAxiosRequestHeaders | AxiosHeaders;
  params?: unknown;
  paramsSerializer?: ParamsSerializerOptions | CustomParamsSerializer;
  data?: unknown;
}
export const apiClient = {
  request<T>(config: ApiClientConfig): Promise<AxiosResponse<T>> {
    return axiosClient.request<T>(config);
  },
  get<T>(url: string, config?: ApiClientConfig): Promise<AxiosResponse<T>> {
    return axiosClient.get<T>(url, config);
  },
  post<T>(url: string, data?: unknown, config?: ApiClientConfig): Promise<AxiosResponse<T>> {
    return axiosClient.post<T>(url, data, config);
  },
  put<T>(url: string, data?: unknown, config?: ApiClientConfig): Promise<AxiosResponse<T>> {
    return axiosClient.put<T>(url, data, config);
  },
  delete<T>(url: string, config?: ApiClientConfig): Promise<AxiosResponse<T>> {
    return axiosClient.delete<T>(url, config);
  },
}