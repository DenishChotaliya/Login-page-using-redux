import { createSlice } from "@reduxjs/toolkit";
import { destroyCookie } from "nookies";
import axios from "axios";

const api = `https://658192d63dfdd1b11c43a201.mockapi.io/CRUD`
const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()

const initialState = {
  user: {},
  isAuth: false,
  isLoading: true,
  isError: null,
  rol: null,
};
const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitialData: (state, action) => {
      const { rol } = action.payload;
      state.user = action.payload;
      state.isAuth = true;
      state.rol = rol;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    logOut: (state) => {
      destroyCookie(null, "rol");
      state.user = null;
      state.isAuth = false;
      state.isLoading = false;
      state.isError = null;
      state.rol = null;
    },
    logIn: (state, action) => {
      const { rol } = action.payload;
      state.user = action.payload;
      state.isAuth = true;
      state.rol = rol;
      document.cookie = `rol=${btoa(rol)}; expires=${expires}; path=/`;
    },
  },
});
export const { setLoading, logIn, logOut, setInitialData } = AuthSlice.actions;
export default AuthSlice.reducer;

export const initialData = () => async (dispatch) => {
  try {
    const data = { rol: "" };
    const rol = "rol=";
    const  decodedCookie= decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      // while (c.charAt(0) === " ") {
      //   c = c.substring(1);
      // }
      if (c.indexOf(rol) === 0) {
        data.rol = atob(c.substring(rol.length, c.length));
      }
    }
    if (data.rol !== "") {
      const res = await axios.get(api);
      const filterUser = res.data.filter((users) => users.rol === data.rol);
      if (filterUser.length !== 0) {
        dispatch(setInitialData(filterUser[0]));
      } else {
        console.log(`Name Not Found`);
        dispatch(logOut());
      }
    }
  } finally {
    dispatch(setLoading(false));
  }
};
