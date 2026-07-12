
import { useAuthStore } from "../store/useAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <button onClick={logout} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Logout
      </button>
    </div>
  );
}
export default ChatPage;
