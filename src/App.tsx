import { Routes } from "./routes/Index";

import { AuthProvider } from "./contexts/AuthContexts";

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
