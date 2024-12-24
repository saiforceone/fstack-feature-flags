import { type ReactNode } from "react";
import { BiSolidError } from "react-icons/bi";

type FormFieldErrorProps = {
  errorString: string;
};

export default function FormFieldError({ errorString }: FormFieldErrorProps): ReactNode {
  return (
    <div className='bg-red-50 p-2 rounded flex items-center gap-2 text-red-600 border-2 border-red-600'>
      <BiSolidError />
      <span className='font-medium'>{errorString}</span>
    </div>
  );
}
