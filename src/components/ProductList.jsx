import { ProductCard } from "./ProductCard";

export const ProductList = ({ products }) => {
  return (
    <div className="container-fluid d-flex d-flex m-10">
      <div className="row justify-content-center align-items-center">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};
