import axios, { AxiosResponse } from 'axios';
import { User } from '../models/user.model';

const baseUrl = 'user';

interface ResponseWithMessage {
  message: string;
  user: User;
}

export const getUsers = (): Promise<AxiosResponse<User[]>> => {
  return axios.get<User[]>(`/${baseUrl}/list`);
};

export const getUserById = (userId: string): Promise<AxiosResponse<User>> => {
  return axios.get<User>(`/${baseUrl}/${userId}`);
};

export const updateUser = (
  userId: string,
  user: User
): Promise<AxiosResponse<ResponseWithMessage>> => {
  return axios.put<ResponseWithMessage>(`/${baseUrl}/${userId}`, user);
};

export const deleteUser = (userId: string): Promise<AxiosResponse<any>> => {
  return axios.delete(`/${baseUrl}/${userId}`);
};
