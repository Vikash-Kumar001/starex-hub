import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary"/>
              </div>
              <h1 className="md:text-lg text-base font-bold">Starex Hub</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link to={"/settings"} className={`btn btn-sm gap-2 transition-colors`}>
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Themes</span>
            </Link>

            {!authUser && (
              <Link to={"/login"} className={`btn btn-sm gap-2 transition-colors`}>
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            {authUser && (
              <>
                <Link to={"/chat"} className={`btn btn-sm gap-2`}>
                  <MessageSquare className="size-5" />
                  <span className="hidden sm:inline">My Chats</span>
                </Link>

                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex gap-2 items-center text-red-600" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;