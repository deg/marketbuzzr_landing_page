import { createContext, useContext } from "react";

// Provides openModal(source) to any descendant so Nav and page CTAs can open
// the email-capture modal without threading props through react-router's
// <Routes>.
//
// `source` is which call-to-action was clicked — "try-free" or "book-demo" —
// and rides along to the backend so sales can tell a trial request from a demo
// request (mbz-et8e.15). Every CTA opens this same modal, so without it the two
// intents arrive indistinguishable.
export const ModalContext = createContext(() => {});

export const useModal = () => useContext(ModalContext);
