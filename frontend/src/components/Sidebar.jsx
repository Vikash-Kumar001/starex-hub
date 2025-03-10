import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { GraduationCap, BriefcaseBusiness } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
    const {
        getUsers, users, selectedUser, setSelectedUser,
        isUsersLoading, isSidebarOpen, setIsSidebarOpen, chatHistory, getChatHistory
    } = useChatStore();

    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState("myChats");

    useEffect(() => {
        getUsers();
        getChatHistory();
    }, [getUsers, getChatHistory]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const filteredUsers = showOnlineOnly
        ? users.filter(user => onlineUsers.includes(user._id))
        : users;

    const myChats = filteredUsers.filter(user =>
        chatHistory?.some(chat => chat._id === user._id)
    );

    const displayedUsers = activeTab === "myChats" ? myChats : filteredUsers;

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    if (isUsersLoading) return <SidebarSkeleton />;

    return (
        <aside className={`h-full w-full lg:w-96 border-r border-base-300 flex flex-col transition-all duration-200 ${!isSidebarOpen ? "hidden" : ""}`}>
            <div className="border-b border-base-300 w-full flex items-center justify-between p-2.5">
                <div className="flex gap-4">
                    <button
                        className={`font-medium text-sm ${activeTab === "myChats" ? "text-primary border-b-2 border-primary" : "text-gray-500"}`}
                        onClick={() => setActiveTab("myChats")}
                    >
                        My Chats
                    </button>
                    <button
                        className={`font-medium text-sm ${activeTab === "allContacts" ? "text-primary border-b-2 border-primary" : "text-gray-500"}`}
                        onClick={() => setActiveTab("allContacts")}
                    >
                        All Contacts
                    </button>
                </div>
            </div>

            <div className="border-b border-base-300 p-2.5 flex items-center justify-between">
                <label className="cursor-pointer flex items-center gap-1">
                    <input
                        type="checkbox"
                        checked={showOnlineOnly}
                        onChange={(e) => setShowOnlineOnly(e.target.checked)}
                        className="checkbox scale-90"
                    />
                    <span className="text-sm">Show online only</span>
                </label>
                <span className="text-xs text-gray-500">({onlineUsers.length - 1} online)</span>
            </div>

            <div className="overflow-y-auto flex-1 w-full py-3">
                {displayedUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => handleUserSelect(user)}
                        className={`w-full p-3 flex items-center gap-3 hover:bg-primary/20 transition-colors ${selectedUser?._id === user._id ? "bg-primary/20" : ""
                            }`}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={user.profilePic || "/avatar.png"}
                                alt={user.name}
                                className="size-12 object-cover rounded-full"
                            />
                            {onlineUsers.includes(user._id) && (
                                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-gray-900" />
                            )}
                        </div>

                        <div className="flex-1 text-left min-w-0">
                            <div className="font-medium truncate flex items-center gap-2">
                                <span>{user.fullName}</span>
                                {user.role === "student" && <GraduationCap className="size-5 text-primary" />}
                                {user.role === "faculty" && <BriefcaseBusiness className="size-4 text-primary" />}
                            </div>
                            <div className={`text-sm ${onlineUsers.includes(user._id) ? "text-green-500" : "text-gray-400"}`}>
                                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}

                {displayedUsers.length === 0 && (
                    <div className="text-center text-gray-500 py-4">
                        {activeTab === "myChats" ? "No chats yet" : "No users available"}
                    </div>
                )}
            </div>
        </aside>
    );
};

export default Sidebar;
