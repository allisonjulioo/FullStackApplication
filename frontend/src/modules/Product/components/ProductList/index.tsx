import { AnimatePresence } from 'framer-motion';
import { Product } from 'modules/Product/types';
import { ProductCard } from '../ProductCard';
import { Grid } from './styles';

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <AnimatePresence>
      <Grid>
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </Grid>
    </AnimatePresence>
  );
};
