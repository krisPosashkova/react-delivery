import { createSlice } from "@reduxjs/toolkit";
import { products } from '../../products'

const initialState = {
  products: products,
  basketProducts: [],
  ammountProducts: 0,
  countProduct: 0,
  product: null,
  isProductInBasket: false,
  isShowPopUp: false,
  isChecked: true,
  isForm: true,
}

export const productsSlise = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProductsBasket: (state, payload) => {
      state.basketProducts.push(payload.payload)
      state.countProduct = state.basketProducts.length;
      state.ammountProducts = state.basketProducts.reduce((acc, current) => {
        return acc + current.price;
      }, 0)
      state.isProductInBasket = false
    },

    removeProductsBasket: (state, payload) => {
      state.basketProducts = state.basketProducts.filter((item) => {
        return item.idx !== payload.payload
      })

      state.basketProducts = state.basketProducts.filter((item) => {
        return item.id !== payload.payload
      })
      state.countProduct = state.basketProducts.length;
      state.ammountProducts = state.basketProducts.reduce((acc, current) => {
        return acc + current.price;
      }, 0)
      state.isProductInBasket = true
    },

    getProduct: (state, payload) => {
      state.product = state.products.find((item) => {
        return item.id === payload.payload
      })
    },

    setIsProductInBasket: (state, payload) => {
      state.isProductInBasket = state.basketProducts.some(item => item.id === payload.payload);
    },

    registerOrdering: (state) => {
      if (state.basketProducts.length) {
        state.isShowPopUp = true;
        state.basketProducts = [];
        state.ammountProducts = 0;
        state.countProduct = 0;
      }
    },

    closePopUp: (state) => {
      state.isShowPopUp = false;
    },

    changeCheckbox: (state) => {
      state.isChecked = !state.isChecked;
    },

    changeForm: (state) => {
      state.isForm = !state.isForm
    },
  }
})
export const { addProductsBasket, removeProductsBasket, getProduct, setIsProductInBasket, registerOrdering, closePopUp, changeCheckbox, changeForm } = productsSlise.actions;

export default productsSlise.reducer;
