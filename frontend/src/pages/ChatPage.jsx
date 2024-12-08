import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const ChatPage = () => {

    const { selectedUser, setIsSidebarOpen } = useChatStore();

    useEffect(() => {
        document.title = 'Your Chats - Stay Connected on Starex Hub';

        window.history.pushState({ selectedUser: selectedUser }, "");

        const handlePopState = (e) => {
            if (!e.state || !e.state.selectedUser) {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [selectedUser]);

    return (
        <div className="h-screen bg-base-200">
            <div className="flex items-center justify-center pt-20 px-4">
                <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
                    <div className="flex h-full rounded-lg overflow-hidden">
                        <Sidebar />

                        {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
