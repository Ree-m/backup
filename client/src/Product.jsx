import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/product.css";
import { API_URL } from "./constants";

const Product = ({ product, _id, name, brand, quantity, price, image }) => {
  const [refresh, setRefresh] = useState(false);

  const onClick = () => {
    setRefresh(true);
  };

  return (
    <div className="product center">
      <div className="product-image">
        <Link to={`/product/${_id}`}>
          <img
            onClick={onClick}
            src={`${API_URL}/${image}`}
            alt={`Image of ${name}`}
          />
        </Link>
      </div>
      <div className="product-title">
        <Link to={`/product/${_id}`}>
          <h2 onClick={onClick} className="title-small capital">
            [{brand}] {name}
          </h2>
        </Link>
      </div>

      <div className="product-details">
        <span>${price}</span>
      </div>
    </div>
  );
};

export default Product;
