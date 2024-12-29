import { type ReactNode } from "react";
import { BiSolidInfoCircle } from "react-icons/bi";

type NoResultBlockProps = {
  resourceName?: string;
};

export default function NoResultBlock({ resourceName }: NoResultBlockProps): ReactNode {
  return (
    <div className='bg-slate-100 text-slate-400 flex flex-col gap-4 items-center p-4 rounded'>
      <BiSolidInfoCircle size={64} />
      <div className='text-center'>
        <h1 className='text-2xl'>{resourceName ?? "Resource Not Found"}</h1>
        <p className='text-lg'>Looks like there are no results round.</p>
      </div>
    </div>
  );
}
