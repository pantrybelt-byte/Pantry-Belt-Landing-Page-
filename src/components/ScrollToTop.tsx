import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Scroll to top immediately when route changes, except for hash links
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      // Small timeout allows the DOM to render the new page before searching for the ID
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}
