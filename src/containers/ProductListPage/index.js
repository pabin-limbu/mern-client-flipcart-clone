import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getproductBySlug } from "../../actions";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";
import ProductStore from "./ProductStore";
import getQueryParams from "../../utils/getQueryParams";
import ProductPage from "./ProductPage";
import ClothingAndAccessories from "./ClotingAndAccessories";
function ProductListPage(props) {
  const renderproduct = () => {
    console.log(props);
    const params = getQueryParams(props.location.search);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props}></ProductStore>;
        break;
      case "page":
        content = <ProductPage {...props}></ProductPage>;
        break;

      default:
        content = <ClothingAndAccessories {...props}></ClothingAndAccessories>;
    }

    return content;
  };

  return <Layout>{renderproduct()}</Layout>;
}

export default ProductListPage;
