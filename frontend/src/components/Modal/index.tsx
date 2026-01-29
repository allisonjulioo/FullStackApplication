import { PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ModalContainer, ModalBackdrop, ModalBody, ModalClose } from './styles';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  fullscreen?: boolean;
}

export const Modal = ({
  children,
  open,
  onClose,
  fullscreen,
}: PropsWithChildren<ModalProps>) => {
  return (
    <AnimatePresence>
      {open && (
        <ModalContainer>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <ModalBackdrop data-testid="modal-backdrop" onClick={onClose} />
          </motion.div>

          <ModalBody
            $fullscreen={fullscreen}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.7, y: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ModalClose data-testid="modal-close" onClick={onClose}>
              ✕
            </ModalClose>
            {children}
          </ModalBody>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};
