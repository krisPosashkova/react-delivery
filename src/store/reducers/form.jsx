import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCheckedCheckbox: false,
  isShowForm: true,
  login: '',
  password: '',
  loginRegistr: '',
  passwordRegistr: '',
  errors: {},
  isShowPopUp: false,
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {

    changeCheckboxForm: (state) => {
      state.isCheckedCheckbox = !state.isCheckedCheckbox;
    },

    changeFormModal: (state) => {
      state.isShowForm = !state.isShowForm
    },

    setLogin: (state, action) => {
      state.login = action.payload;
    },

    setPassword: (state, action) => {
      state.password = action.payload;
    },

    setLoginRegistr: (state, action) => {
      state.loginRegistr = action.payload;
    },

    setPasswordRegistr: (state, action) => {
      state.passwordRegistr = action.payload;
    },

    setErrors: (state, action) => {
      state.errors = action.payload;
    },

    registrFormSubmit: (state) => {
      state.loginRegistr = '';
      state.passwordRegistr = '';
      state.isCheckedCheckbox = false;
      state.isShowPopUp = true;
      state.isShowForm = true;
    },

    loginFormSubmit: (state) => {
      state.login = '';
      state.password = '';
      state.isCheckedCheckbox = false;
    },
    
    closePopUp: (state) => {
      state.isShowPopUp = false;
    },
  }
})
export const { changeCheckboxForm, closePopUp, changeFormModal, registrFormSubmit, loginFormSubmit, setLoginRegistr, setPasswordRegistr, setLogin, setPassword, setErrors, getUserData } = formSlice.actions

export default formSlice.reducer