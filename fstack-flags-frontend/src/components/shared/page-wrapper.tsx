import { type ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
  pageTitle: string;
  rightContent?: ReactNode;
  subtitle?: string;
};

export default function PageWrapper({
  children,
  pageTitle,
  rightContent,
  subtitle,
}: PageWrapperProps): ReactNode {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='flex items-center gap-4'>
        <div className='flex flex-col gap-1 flex-1'>
          <h1 className='text-4xl font-normal'>{pageTitle}</h1>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {rightContent}
      </div>
      <hr />
      <div>{children}</div>
    </div>
  );
}
