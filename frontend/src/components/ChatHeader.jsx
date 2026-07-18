
import { useChatStore } from "../store/useChatStore";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();

  if (!selectedUser) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>
        <div>
          <h3 className="font-medium text-slate-200">{selectedUser.fullName}</h3>
          {/* Optional: online/offline status, wire this up once you track online users */}
          {/* <p className="text-xs text-slate-400">Online</p> */}
        </div>
      </div>

      {/* Close button to deselect the current chat */}
      <button
        onClick={() => setSelectedUser(null)}
        className="btn btn-ghost btn-sm btn-circle"
        aria-label="Close chat"
      >
        ✕
      </button>
    </div>
  );
}

export default ChatHeader;