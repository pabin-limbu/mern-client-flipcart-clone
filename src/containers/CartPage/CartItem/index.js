import React, { useEffect, useState } from "react";
import { generatePublicUrl } from "../../../urlConfig";
import "./style.css";

function CartItem(props) {
  const [qty, setQty] = useState("");
  const { _id, name, price, img } = props.cartItems;
  const { onQuantityInc, onQuantityDec, quantity, onRemoveCartItem } = props;

  // console.log({ crt: props.cartItems });
  // console.log(qty);
  // console.log({quantity});

  useEffect(() => {
    setQty(props.cartItems.qty);
  }, [props.cartItems]);

  const onQuantityIncrement = () => {
    setQty(qty + 1); //onquantityinc is called beforesetqnt so the qnt previous value is sent to the function. which is why +1 is done.
    props.onQuantityInc(_id, qty + 1);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  };

  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={generatePublicUrl(img)} alt="" />
        </div>
        <div className="cartItemDetails">
          <div className="item-name">
            <p>{name}</p>
            <p>RS. {price}</p>
          </div>
          <div>Delivery In 0 days</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <button onClick={onQuantityDecrement}>-</button>
          <input value={quantity} readOnly />
          <button onClick={onQuantityIncrement}>+</button>
        </div>
        <button className="cartActionBtn">save for later</button>
        <button className="cartActionBtn" onClick={() => onRemoveCartItem(_id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
