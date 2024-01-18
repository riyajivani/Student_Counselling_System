import { createContext, useCallback, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
     
     const storeLS = (userdata) => {
          return localStorage.setItem("userdata", JSON.stringify(userdata));
     }


     return <AuthContext.Provider value={storeLS}>
          {children}
     </AuthContext.Provider>

}

export const useAuth = () => {
     const authContextValue = useContext(AuthContext);

     if (!authContextValue) {
          throw new Error("useAuth used outside the provider");
     }
     return authContextValue;
}