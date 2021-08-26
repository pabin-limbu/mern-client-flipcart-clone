import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions";
import getQueryParams from "../../../utils/getQueryParams";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Card from "../../../components/UI/Card";

function ProductPage(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;
  useEffect(() => {
    const params = getQueryParams(props.location.search);

    const payLoad = {
      params,
    };

    dispatch(getProductPage(payLoad));
  }, []);
  return (
    <div style={{ margin: "0 10px" }}>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a
              key={index}
              style={{ display: "block" }}
              href={banner.navigateTo}
            >
              <img src={banner.img} />
            </a>
          ))}
      </Carousel>

      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {page.products &&
          page.products.map((product, index) => {
            return (
              <Card
                key={index}
                // style={{ width: "400px", height: "200px", margin: "0 5px" }}
              >
                <img src={product.img} alt="" width="200px" height="200px" />
              </Card>
            );
          })}
      </div>

      {/* {JSON.stringify(product.page)} */}
    </div>
  );
}

export default ProductPage;
