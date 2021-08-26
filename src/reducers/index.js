//root reducer

import { combineReducers } from "redux";
import categoryReducer from "./category.reducers";
import productReducer from "./product.reducers";
import authReducer from "./auth.reducers";
import cartReducers from "./cart.reducers";
import userRecuders from "./user.reduceers";

const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducers,
  user: userRecuders,
});

export default rootReducer;
