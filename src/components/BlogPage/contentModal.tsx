import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import ReviewForm from './ReviewForm';
import { Blog } from '../../types';

type contentModalProps = {
    postId: Blog["id"]
}

export default function ContentModal({ postId } : contentModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        type="button"
        onClick={openModal}
        className="bg-orange-500 rounded-md py-2 px-3 text-center hover:bg-orange-300 transition-all mt-5 uppercase font-bold text-white"
      >
        Añade un comentario
      </button>

      {/* Modal usando Headless UI */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  
                  <ReviewForm postId={postId} closeModal={closeModal} />

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
