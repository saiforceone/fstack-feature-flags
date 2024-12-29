import { type ReactNode } from "react";
import { Dialog, DialogPanel, DialogBackdrop, DialogTitle } from "@headlessui/react";
import { BiSolidArrowToLeft } from "react-icons/bi";

type ConfirmDialogProps = {
  content: ReactNode;
  dialogActionElements?: ReactNode;
  dialogDismissAction: () => void;
  dialogOpen: boolean;
  titleText: string;
};

export default function ConfirmDialog({
  content,
  dialogActionElements,
  dialogDismissAction,
  dialogOpen,
  titleText,
}: ConfirmDialogProps): ReactNode {
  return (
    <Dialog
      onClose={dialogDismissAction}
      open={dialogOpen}
    >
      <DialogBackdrop className='fixed inset-0 bg-black/30' />
      <div className='fixed inset-0 w-screen overflow-y-auto p-4'>
        <div className='flex min-h-full items-center justify-center'>
          <DialogPanel className='w-full sm:w-1/2 space-y-4 border bg-white p-4'>
            <DialogTitle className='w-full font-medium text-lg'>{titleText}</DialogTitle>
            {content}
            {dialogActionElements ? (
              dialogActionElements
            ) : (
              <div className='flex items-center gap-4 w-full'>
                <button
                  className='flex items-center gap-2 p-2 rounded bg-blue-600 hover:bg-blue-400 duration-200 text-white'
                  onClick={dialogDismissAction}
                >
                  <BiSolidArrowToLeft />
                  Dismiss
                </button>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
