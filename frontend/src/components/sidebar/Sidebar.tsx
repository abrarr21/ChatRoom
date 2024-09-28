import Conversation from "./Conversation";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
  return (
    <div>
      <SearchInput />
      <div className="divider px-3" />
      <Conversation />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
