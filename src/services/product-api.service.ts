import axios, { AxiosResponse } from 'axios';
import { Product } from '../models/product.model';

const baseUrl = 'product';

export const getProducts = (): Promise<AxiosResponse<Product[]>> => {
  return axios.get<Product[]>(`/${baseUrl}/list`);
};

export const getProductById = (
  productId: string
): Promise<AxiosResponse<Product>> => {
  return axios.get<Product>(`/${baseUrl}/${productId}`);
};

export const createProduct = (
  product: Product
): Promise<AxiosResponse<Product>> => {
  return axios.post(`/${baseUrl}`, product);
};

export const updateProduct = (
  productId: string,
  product: Product
): Promise<AxiosResponse<Product>> => {
  return axios.put(`/${baseUrl}/${productId}`, product);
};

export const deleteProduct = (
  productId: string
): Promise<AxiosResponse<any>> => {
  return axios.delete(`/${baseUrl}/${productId}`);
};
