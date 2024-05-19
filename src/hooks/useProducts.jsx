import useData from './useData';

export const useProducts = () => {
  const { data, loading, error } = useData('/products');
  const products = data ? data.sort((a, b) => a.selling_price - b.selling_price) : [];

  return { products, loading, error };
};

export const useProduct = (id) => {
  const { data, loading, error } = useData(`/products/${id}`);
  const product = data || null;

  return { product, loading, error };
};

