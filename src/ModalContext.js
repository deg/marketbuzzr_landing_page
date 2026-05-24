import { createContext, useContext } from "react";

// Provides openModal() to any descendant so Nav and page CTAs can open the
// email-capture modal without threading props through react-router's <Routes>.
export const ModalContext = createContext(() => {});

export const useModal = () => useContext(ModalContext);
