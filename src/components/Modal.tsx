import { useState, PropsWithChildren } from "react";
import { motion, Variants } from "framer-motion";

const framerVariants: Variants = {
  fadeIn: {
    opacity: [0, 1],
    transition: {
      duration: 0.3,
      ease: "easeOut",
      times: [0, 1],
    },
  },

  fadeAndFallIn: {
    y: [-75, 0],
    opacity: [0, 1],
    transition: {
      duration: 0.3,
      ease: "easeOut",
      times: [0, 1],
    },
  },

  fadeOut: {
    opacity: [1, 0],
    transition: {
      duration: 0.3,
      ease: "easeIn",
      times: [0, 1],
    },
  },

  fadeAndBounceOut: {
    y: [0, -75],
    opacity: [1, 0],
    transition: {
      duration: 0.3,
      ease: "easeIn",
      times: [0, 1],
    },
  },
};

interface ModalProps {
  title: string;
  show: boolean;
  handleClose: () => void;
}

export default function Modal({
  children,
  title,
  show,
  handleClose,
}: PropsWithChildren<ModalProps>) {
  const [hide, setHide] = useState(false);

  function handleOnAnimationComplete() {
    if (!hide) return;
    handleClose();
    setHide(false);
  }

  function handleHide() {
    setHide(true);
  }

  function handleModalClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }

  if (!show) return null;
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleHide}
      animate={hide ? "fadeOut" : "fadeIn"}
      variants={framerVariants}
      onAnimationComplete={handleOnAnimationComplete}
    >
      <motion.div
        className="rounded-xl overflow-hidden bg-slate-700 flex flex-col min-h-48 m-2"
        onClick={handleModalClick}
        animate={hide ? "fadeAndBounceOut" : "fadeAndFallIn"}
        variants={framerVariants}
      >
        <div className="bg-slate-600 flex justify-between p-2 text-lg">
          <div className="px-2">{title}</div>
          <div>
            <button
              className="rounded-lg w-8 h-8 hover:bg-slate-500 active:bg-slate-700"
              onClick={handleHide}
            >
              X
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-1 p-4">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
