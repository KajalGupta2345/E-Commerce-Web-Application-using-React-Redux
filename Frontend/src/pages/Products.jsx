import { lazy, Suspense } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteProduct from "../utils/useInfiniteProduct";
const ProductTemplate = lazy(() => import("../components/productTemplate"));

const Products = () => {
  const { products, fetchproducts, hasMore } = useInfiniteProduct();
  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 md:px-10 py-8 rounded-xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-600">
        Our Products
      </h2>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchproducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center", color: "gray", marginTop: "10px" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="grid gap-10 grid-cols-1 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:p-4 mx-auto max-w-7xl">
          {products.map((product) => (
            <Suspense
              key={product.id}
              fallback={
                <h1 className="text-center text-blue-500 text-3xl">
                  LOADING...
                </h1>
              }
            >
              <ProductTemplate product={product} />
            </Suspense>
          ))}
          ;
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Products;
