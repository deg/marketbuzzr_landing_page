import React from "react";
import {
  Link as RouterLink,
  NavLink as RouterNavLink,
} from "react-router-dom";
import { useThemeParam } from "../hooks/useThemeParam";

// Drop-in replacements for react-router's Link and NavLink that carry the
// current ?theme= across to wherever they point. Import these instead of
// react-router's anywhere inside the app; they take the same props.
//
// Without them the theme survives exactly one click. React Router's Link drops
// the query string, so a light page linked to a dark one, and the switch could
// only ever describe the page you happened to land on. Storage was tried
// instead and is the wrong shape for this: it made a page light while its own
// address said nothing about it, and it did not travel to anyone you sent the
// link to.
//
// THE PARAMETER IS WRITTEN OUT FOR DARK AS WELL AS LIGHT, even though dark is
// the default and ?theme=dark therefore changes nothing. This is a switch for
// reviewing an unfinished design, and while it exists it should be obvious
// which way round every page is. It comes out with the switch.
const withTheme = (to, theme) => {
  if (typeof to === "string") {
    const [pathname, search] = to.split("?");
    const params = new URLSearchParams(search);
    params.set("theme", theme);
    return `${pathname}?${params}`;
  }
  const params = new URLSearchParams(to.search);
  params.set("theme", theme);
  return { ...to, search: `?${params}` };
};

export const Link = ({ to, ...rest }) => {
  const theme = useThemeParam();
  return <RouterLink to={withTheme(to, theme)} {...rest} />;
};

// NavLink decides "active" on the pathname, so adding a query does not disturb
// which item is highlighted.
export const NavLink = ({ to, ...rest }) => {
  const theme = useThemeParam();
  return <RouterNavLink to={withTheme(to, theme)} {...rest} />;
};
