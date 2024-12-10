import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const loadingRef = useRef(null);
  const productPerPage = 10;
  const [isLoading, setIloading] = useState(false);
  useEffect(() => {
    // Fetching products
    const productFetch = async () => {
      try {
        setIloading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=${productPerPage}&skip=${
            productPerPage * page
          }`
        );
        if (!response.ok) {
          throw new Error("Something wrong");
        }

        const data = await response.json();
        const productsList = data.products;
        if (productsList.length === 0) {
          setHasMore(false);
        } else {
          setProducts([...productsList]);

          setPage((prevPage) => prevPage + 1);
          console.log("products", page, products);
        }
      } catch (error) {
        throw new Error(error);
      } finally {
        setIloading(false);
      }
      // console.log("data", productsList);
      // setProducts([...productsList]);
    };

    // Observe checking
    const onObserve = (item) => {
      const trackLoading = item[0];
      console.log(item);
      if (trackLoading.isIntersecting && hasMore) {
        productFetch();
        // setHasMore(false);
      }
    };
    const observer = new IntersectionObserver(onObserve);

    // Checking is observe available or not
    if (observer && loadingRef.current) observer.observe(loadingRef.current);

    // Cleanup
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore, page]);
  console.log("products", products);
  return (
    <>
      <div className="container-fluid d-flex d-flex m-10">
        <div className="row justify-content-center align-items-center">
          {products?.map((item) => (
            <div key={item.id} className="card m-3" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src={item.images[0]}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">${item.price}</p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        {hasMore && (
          <svg
            ref={loadingRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
          >
            <circle
              fill="#46FF0B"
              stroke="#46FF0B"
              strokeWidth="7"
              r="15"
              cx="40"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="1.3"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.4"
              ></animate>
            </circle>
            <circle
              fill="#46FF0B"
              stroke="#46FF0B"
              strokeWidth="7"
              r="15"
              cx="100"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="1.3"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="-.2"
              ></animate>
            </circle>
            <circle
              fill="#46FF0B"
              stroke="#46FF0B"
              strokeWidth="7"
              r="15"
              cx="160"
              cy="65"
            >
              <animate
                attributeName="cy"
                calcMode="spline"
                dur="1.3"
                values="65;135;65;"
                keySplines=".5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
                begin="0"
              ></animate>
            </circle>
          </svg>
        )}
      </div>
    </>
  );
}

export default App;
