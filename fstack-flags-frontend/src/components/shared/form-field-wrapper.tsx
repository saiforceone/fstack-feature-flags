import { type ReactNode } from "react";
import FormFieldError from "./form-field-error.tsx";

type FormFieldWrapperProps = {
  children: ReactNode;
  formFieldErrors?: Array<string>;
};

export default function FormFieldWrapper({
  children,
  formFieldErrors,
}: FormFieldWrapperProps): ReactNode {
  return (
    <div className='flex flex-col gap-2 text-blue-500 font-medium'>
      <div>{children}</div>
      {formFieldErrors?.length ? (
        <div className='flex flex-col gap-1'>
          <span className='text-red-600 font-bold'>
            {formFieldErrors.length} error{formFieldErrors.length === 1 ? "" : "s"} found
          </span>
          {formFieldErrors.map((err, index) => (
            <FormFieldError
              key={`field-error-${index}-${err}`}
              errorString={err}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
