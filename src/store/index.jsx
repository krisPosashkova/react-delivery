import { configureStore } from '@reduxjs/toolkit'
import  products  from './reducers/products'
import  form  from './reducers/form'

export const store = configureStore({
  reducer: {
    products: products,
    form: form,
  }
})
