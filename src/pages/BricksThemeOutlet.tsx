import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../theme/ThemeProvider";

/** Renders the nested route and ensures the global theme is bricks for site pages. */
export function BricksThemeOutlet() {
  const { setTheme } = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    setTheme("bricks");
  }, [pathname, setTheme]);

  return <Outlet />;
}
