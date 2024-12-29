import { type ReactNode } from "react";
import { BiSolidInfoSquare } from "react-icons/bi";

type NotificationBlockProps = {
  children: ReactNode;
};

export default function NotificationBlock({ children }: NotificationBlockProps): ReactNode {
  return (
    <div className='flex items-center gap-4 p-4 bg-blue-200 text-blue-600 rounded'>
      <BiSolidInfoSquare size={60} />
      <div className='space-y-2'>{children}</div>
    </div>
  );
}
