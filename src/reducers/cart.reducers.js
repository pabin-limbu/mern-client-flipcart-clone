import { cartConstants } from "../actions/constants";

const initState = {
  cartItems: {
    // 123: {
    //   _id: 123,
    //   name:"something"
    // },
    //using object over array as we are able to create key using object.ane with key we can easily find object.
  },
  updatingCart: false,
  error: null,
};

export default (state = initState, action) => {

  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST:
      state = {
        ...state,
        updatingCart: true,
      };
      break;

    case cartConstants.ADD_TO_CART_SUCCESS:
      state = { ...state, cartItems: action.payload.cartItems };
      break;
    case cartConstants.ADD_TO_CART_FAILURE:
      state = { ...state, updatingCart: false, error: action.payload.error };
      break;
    case cartConstants.RESTE_CART:
      console.log(initState);
      state = {
        ...initState,
      };
      // state = {
      //   cartItems: {
      //     // 123: {
      //     //   _id: 123,
      //     //   name:"something"
      //     // },
      //     //using object over array as we are able to create key using object.ane with key we can easily find object.
      //   },
      //   updatingCart: false,
      //   error: null,
      // };
      break;
  }

  return state;
};
