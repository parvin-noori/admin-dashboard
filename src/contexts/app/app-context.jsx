import { useContext, useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import appReducer from './app-reducer'
import { useTranslation } from "react-i18next";

const AppContext = createContext();
const initialState = {
  language: localStorage.getItem("language") || "fa",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const {i18n}=useTranslation()

  const changeLanguage = (language) => {
    dispatch({ type: "CHANGE_LANGUAGE", payload: language });
  };

  useEffect(()=>{
i18n.changeLanguage(state.language);
localStorage.setItem('language',state.language)
document.body.dataset.direction=state.language==='fa'?'rtl':'ltr'
  },[state.language])

  return (
    <AppContext.Provider value={{ ...state, changeLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext=() => useContext(AppContext);

export { useAppContext, AppProvider };
