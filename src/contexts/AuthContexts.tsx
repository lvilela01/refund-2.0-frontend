import { createContext, type ReactNode } from "react";
import { useState, useEffect } from "react";
import { api } from "../services/api";

type AuthContext = {
  isLoading: boolean
  session: null | userAPIResponse; // Recupera o estado
  save: (data: userAPIResponse) => void; // Recupera os dados de userAPIResponse
  remove: () => void
};

const LOCAL_STORAGE_KEY = "@refund"; // Guarda dados do usuário logado para manter a sessão.

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | userAPIResponse>(null);
  const [isLoading, setIsLoading] = useState(true)

  function save(data: userAPIResponse) {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}:user`,
      JSON.stringify(data.user),
    );
    // token fica separado dos dados do usuário para conseguir utilizar nas requisições.
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);

    api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`

    setSession(data);
  }

  function remove() {
    setSession(null)

    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);

    window.location.assign("/") // navegar a tela do usuário para raiz da aplicação (página inicial)
  }

  function loadUser() {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);
    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

    if (user && token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setSession({
        token,
        user: JSON.parse(user), // conversão de texto para objeto.
      });
    }

    setIsLoading(false)
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider value={{ session, save, isLoading, remove }}>
      {children}
    </AuthContext.Provider>
  );
}
