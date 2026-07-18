
import { useChatStore } from "../store/useChatStore";
function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full [background:linear-gradient(45deg,#0a0e27,#12162e_50%,#0a0e27)_padding-box,conic-gradient(from_var(--border-angle),#2a2d45_80%,_#d4af37_86%,_#f0d878_90%,_#d4af37_94%,_#2a2d45)_border-box] rounded-2xl border border-transparent animate-border flex overflow-hidden">
      {children}
    </div>
  );
}
export default BorderAnimatedContainer;


