import { Search } from "lucide-react";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search terms must be atleast 3 characters long");
    }

    const conversation = conversations.find((c: ConversationType) =>
      c.fullname.toLowerCase().includes(search.toLowerCase()),
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("No such user found");
    }
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmitSearch}>
      <input
        type="text"
        placeholder="Search..."
        className="input-sm md:input input-bordered rounded-full sm:rounded-full w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn md:btn-md btn-sm btn-circle bg-sky-500 text-white"
      >
        <Search className="w-4 h-4 md:w-6 md:h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
