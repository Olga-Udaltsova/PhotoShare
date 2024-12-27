import { CreatePost } from "./CreatePost";
import { Home } from "./Home";
import { Notifications } from "./Notifications";
import { MyProfile } from "./MyProfile";
import { Search } from "./Search";

export const SidebarItems = () => (
  <>
    <Home />
    <Search />
    <Notifications />
    <CreatePost />
    <MyProfile />
  </>
);
