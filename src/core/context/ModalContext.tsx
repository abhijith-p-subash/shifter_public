/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Button, Modal } from "flowbite-react";

import { MdDone } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { MdPending } from "react-icons/md";
import { MdError } from "react-icons/md";

type ModalType = "warning" | "success" | "failure" | "pending";

interface ModalContextType {
  showModal: (type: ModalType, message: string) => Promise<boolean>;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>("warning");
  const [message, setMessage] = useState("");
  const [resolvePromise, setResolvePromise] = useState<
    (value: boolean) => void
  >(() => () => {});

  const triggerModal = (type: ModalType, message: string) => {
    setModalType(type);
    setMessage(message);
    setIsVisible(true);
    return new Promise<boolean>((resolve) => {
      setResolvePromise(() => resolve);
    });
  };

  const handleConfirm = () => {
    setIsVisible(false);
    resolvePromise(true);
  };

  const handleCancel = () => {
    setIsVisible(false);
    resolvePromise(false);
  };
  const colors = {
    warning: "text-yellow-500",
    success: "text-green-500",
    failure: "text-red-500",
    pending: "text-blue-500",
  };

  const modalIcons = {
    warning: (
      <IoWarningOutline
        className={`mx-auto mb-4 h-14 w-14 ${colors[modalType]}`}
      />
    ),
    success: (
      <MdDone className={`mx-auto mb-4 h-14 w-14 ${colors[modalType]}`} />
    ),
    failure: (
      <MdError className={`mx-auto mb-4 h-14 w-14 ${colors[modalType]}`} />
    ),
    pending: (
      <MdPending className={`mx-auto mb-4 h-14 w-14 ${colors[modalType]}`} />
    ),
  };

  return (
    <ModalContext.Provider value={{ showModal: triggerModal }}>
      {children}
      <Modal show={isVisible} size="md" onClose={handleCancel} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            {modalIcons[modalType]}
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color={modalType === "pending" ? "primary" : modalType}
                onClick={handleConfirm}
              >
                Confirm
              </Button>
              <Button color="gray" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export default ModalProvider;
