import axios, { AxiosResponse } from 'axios';
import { User } from '../models/user.model';

const baseUrl = '/auth';

export const login = (data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<{ token: string; user: User }>> => {
  return axios.post<{ token: string; user: User }>(`${baseUrl}/login`, data);
};

export const signup = (data: Partial<User>): Promise<AxiosResponse<any>> => {
  return axios.post(`${baseUrl}/signup`, data);
};
