
// import { useChatStore } from "../store/useChatStore";
// import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
// import ProfileHeader from "../components/ProfileHeader";
// import ActiveTabSwitch from "../components/ActiveTabSwitch";
// import ChatsList from "../components/ChatsList";
// import ContactList from "../components/ContactList";

// import ChatContainer from "../components/ChatContainer";
// import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

// function ChatPage() {
//   const { activeTab, selectedUser } = useChatStore()

//   return (
//     <div className="relative w-full max-w-7xl md:h-[850px] h-[600px]">
//       <BorderAnimatedContainer>
//       {/* LEFT SIDE */}
//       <div className="w-80 bg-[#9090a0] backdrop-blur-sm flex flex-col">
//         <ProfileHeader />
//         <ActiveTabSwitch />

//         <div className="flex-1 overflow-y-auto p-4 space-y-2">
//           {activeTab === "chats" ? <ChatsList /> : <ContactList />}
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex-1 flex flex-col bg-[#9090a0] backdrop-blur-sm">
//         {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
//       </div>
//       </BorderAnimatedContainer>  
//       </div>
//   );
// }
    
// export default ChatPage;











import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-7xl md:h-[850px] h-[600px]">
      <BorderAnimatedContainer>
        <div className="w-full h-full flex flex-col md:flex-row">

          {/*
            LEFT SIDE (sidebar)
            - Mobile: only visible when NO chat is selected (WhatsApp-style)
            - Desktop (md+): always visible, fixed width, alongside the chat panel
          */}
          <div
            className={`
              w-full md:w-80 bg-[#9090a0] backdrop-blur-sm flex-col
              ${selectedUser ? "hidden" : "flex"} md:flex
            `}
          >
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/*
            RIGHT SIDE (chat panel)
            - Mobile: only visible when a chat IS selected
            - Desktop (md+): always visible next to the sidebar
          */}
          <div
            className={`
              flex-1 flex-col bg-[#9090a0] backdrop-blur-sm
              ${selectedUser ? "flex" : "hidden"} md:flex
            `}
          >
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>

        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;



