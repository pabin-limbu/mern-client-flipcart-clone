import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getproductBySlug, getProductPage } from "../../../actions";
import "./style.css";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card";

function ProductStore(props) {
  const [priceRange, setPriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,
  });
  const product = useSelector((state) => state.product);
  // console.log(product.productsByPrice);
  const dispatch = useDispatch();
  useEffect(() => {
    const { match } = props;
    dispatch(getproductBySlug(match.params.slug));
  }, []);
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            className="card"
            key={index}
            headerLeft={`${props.match.params.slug} mobile Under ${priceRange[key]}`}
            headerRight={<button>View all</button>} 
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product, index) => {
                return (
                  <Link
                    style={{ display: "block" }}
                    className="productContainer"
                    key={index}
                    to={`/${product.slug}/${product._id}/p`}
                  >
                    <div className="productimgContainer">
                      <img
                        src={generatePublicUrl(product.productPictures[0].img)}
                        alt="img"
                      />
                    </div>
                    <div className="productinfo">
                      <div style={{ margin: "5px 0" }}>{product.name}</div>
                      <div>
                        <span>4.3</span>&nbsp;
                        <span>123</span>
                      </div>
                      <div className="productPrice">{product.price}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        );
      })}
    </>
  );
}

export default ProductStore;
