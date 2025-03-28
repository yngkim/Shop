import { configureStore, createSlice } from "@reduxjs/toolkit";

let serverName = createSlice({
  name: "serverName",
  initialState: "user",
  reducers: {
    changeName(state) {
      state.serverName = state.serverName + "test";
    },
  },
});

let userName = createSlice({
  name: "userName",
  initialState: { name: "kim", age: 20 },
  reducers: {
    agePlusOne(state) {
      state.age = state.age + 1;
    },
  },
});
export let { agePlusOne } = userName.actions;

let stock = createSlice({
  name: "stock",
  initialState: [10, 11, 12],
});

let userCart = createSlice({
  name: "userCart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 1, name: "Grey Yordan", count: 1 },
    { id: 2, name: "your mom", count: 1 },
  ],
  reducers: {
    addOne(state, action) {
      let id = state.findIndex((a) => {
        return a.id == action.payload;
      });
      state[id].count += 1;
      // state[action.payload].count += 1;
    },
    subtractOne(state, action) {
      state[action.payload].count -= 1;
    },
    addCart(state, action) {
      let existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.count += parseInt(action.payload.count);
      } else {
        state.push(action.payload);
      }
    },
    deleteCart(state, action) {
      state.splice(action.payload, 1);
    },
  },
});
export let { addOne, subtractOne, addCart, deleteCart } = userCart.actions;

export default configureStore({
  reducer: {
    userName: userName.reducer,
    stock: stock.reducer,
    userCart: userCart.reducer,
  },
});
