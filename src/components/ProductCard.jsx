/* eslint-disable react/prop-types */

export const ProductCard = ({ product }) => {
  console.log("ttt".product);
  return (
    <div className="card m-3" style={{ width: "18rem" }}>
      <img className="card-img-top" src={product.images} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">${product.price}</p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  );
};
