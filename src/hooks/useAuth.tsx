import { use } from "react";

import { AuthContext } from "../contexts/AuthContexts";

export function useAuth() {
  const context = use(AuthContext)

  return context
}
