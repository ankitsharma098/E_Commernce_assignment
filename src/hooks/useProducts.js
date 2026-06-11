import { useQuery } from '@tanstack/react-query';
import {
  fetchAllProducts,
  fetchProductById,
  fetchProductsByCategory,
  fetchCategories,
} from '../services/api';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}

export function useProductsByCategory(category) {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 30,
  });
}
