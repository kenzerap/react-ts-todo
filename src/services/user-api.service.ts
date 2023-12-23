import axios, { AxiosResponse } from 'axios';
import { User } from '../models/user.model';

const baseUrl = 'user';

export const getUsers = (): Promise<AxiosResponse<User[]>> => {
  return axios.get<User[]>(`/${baseUrl}/list`);
};

export const deleteUser = (userId: string): Promise<AxiosResponse<any>> => {
  return axios.delete(`/${baseUrl}/${userId}`);
};
