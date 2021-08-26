import { cartConstants } from "./constants";
import store from "../store";

import axiosInstance from "../helpers/axios";

export const addToCart = (product, newQty) => {
  return async (dispatch) => {
    console.log("ADD to cart CALLED");
    const {
      cart,
      cart: { cartItems },
      auth,
    } = store.getState();

    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty + newQty)
      : 1;
    cartItems[product._id] = { ...product, qty };

    if (auth.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const payLoad = { cartItems: [{ product: product._id, quantity: qty }] };

      const res = await axiosInstance.post("/user/cart/addtocart", payLoad);
      if (res.status === 201) {
        dispatch(getCartItems());
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    dispatch({
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems: cartItems },
    });
  };
};



export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
      const res = await axiosInstance.post(`/user/cart/removeItem`, { payload });
      if (res.status === 202) {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: cartConstants.REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};


export const updateCart = () => {
  return async (dispatch) => {
    console.log(localStorage.getItem("cart"));
    console.log("Action : function updateCart");
    const { auth, cart } = store.getState();

    const cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

    // if (cartItems == null) {
    //   console.log("nothhing");
    //   dispatch({ type: cartConstants.RESTE_CART });
    // }

    if (!auth.authenticate) {
      if (cartItems) {
        console.log("we have cart items");
        console.log({ cartItems });
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      } else {
        return;
      }
    }

    if (auth.authenticate) {
      if (cartItems) {
        console.log("cart found");
        const dbCart = await axiosInstance.post("/user/cart/getCartItems");
        if (dbCart.status == 200) {
          console.log({ dbCart });
        }

        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            console.log(dbCart.data.cartItems[key]);

            return {
              quantity: cartItems[key].qty + dbCart.data.cartItems[key].qty,
              product: cartItems[key]._id,
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          const res = await axiosInstance.post("/user/cart/addtocart", payload);
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
      }
    }
  };
};

const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axiosInstance.post("/user/cart/getCartItems");
      if (res.status === 200) {
        const { cartItems } = res.data;
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {}
  };
};

export { getCartItems };
