import Link from "next/link";

type ChatItemProps = {
  selected: boolean;
  id: string;
  title: string;
};

export const ChatItem = ({ id, title, selected }: ChatItemProps) => {
  return (
    <Link href={`/chat/${id}`}>
      <div
        className={`group cursor-pointer flex items-center gap-2 justify-between px-2 py-1 rounded-md w-full ${
          selected ? "bg-slate-200" : "bg-transparent"
        } hover:bg-slate-200`}
      >
        <span className="flex-1 truncate text-sm">{title}</span>
      </div>
    </Link>
  );
};