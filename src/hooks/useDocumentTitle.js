import { useEffect } from "react";

// Sets the browser-tab title for the current route. Each page calls this with
// its own title; unknown routes redirect to a page that sets one, so there's
// no need to reset on unmount.
export const useDocumentTitle = (title) => {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);
};
