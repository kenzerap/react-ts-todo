import axios from 'axios';
import { Product } from '../models/product.model';

const baseUrl = 'product';

export const getProducts = () => {
  return axios.get<Product[]>(`/${baseUrl}/list`);
};

export const createProduct = (product: Product) => {
  return axios.post(`/${baseUrl}`, product);
};

export const updateProduct = (productId: string, product: Product) => {
  return axios.put(`/${baseUrl}/${productId}`, product);
};

export const deleteProduct = (productId: string) => {
  return axios.delete(`/${baseUrl}/${productId}`);
};
