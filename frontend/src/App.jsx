
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { 
  Routes,
  Route, 
    Navigate
  } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { Link } from "react-router-dom";
import PageLoader from "./components/PageLoader";

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <PageLoader />;

  return (
  
  <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center relative overflow-hidden">

      {/* GRID OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#d4af370d_1px,transparent_1px),linear-gradient(to_bottom,#d4af370d_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* GOLD GLOW — top left */}
      <div className="absolute top-0 -left-4 size-96 bg-[#d4af37] opacity-10 blur-[120px] rounded-full" />

      {/* DEEP GOLD GLOW — bottom right */}
      <div className="absolute bottom-0 -right-4 size-96 bg-[#b8932e] opacity-10 blur-[120px] rounded-full" />

      {/* CENTER NAVY GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1a1f4e] opacity-30 blur-[100px] rounded-full" />

      {/* ROUTES — inside the wrapper, above the decorators */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={ authUser ? <ChatPage /> : <Navigate to="/login" /> } />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" /> } />
          <Route path="/register" element={!authUser ? <RegisterPage /> : <Navigate to="/" /> } />
        </Routes>

        <Toaster/>

      </div>

    </div>
  );
}

export default App;


