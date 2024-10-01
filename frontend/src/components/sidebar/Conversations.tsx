import { DUMMY_CONVERSATIONS } from "../../dummydata/dummy";
import useGetConversations from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {
  const { conversations, loading } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
      {loading ? <span className="loading loading-spinner mx-auto" /> : null}
    </div>
  );
};

export default Conversations;
