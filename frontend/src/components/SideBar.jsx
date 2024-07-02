import Conversations from "./Conversations";
import SearchInput from "./SearchInput";
import LogOutButton from "./LogOutButton";

const SideBar = () => {
  return (
    <div className="border-r border-teal-700 p-4 flex flex-col">
      <SearchInput/>
      <div className="divider px-3"></div>
      <Conversations/>
      <LogOutButton/>
    </div>
  );
};

export default SideBar;
