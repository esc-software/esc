import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/** Paths that serve the landing page. Any other path is a 404. */
const HOME_PATHS = ["/", "/index.html"];

/**
 * The site has a single page plus a 404, so a path check is all the routing it needs.
 * The same component renders on the server (prerender) and in the browser (hydration).
 */
const App = ({ pathname }: { pathname: string }) =>
  HOME_PATHS.includes(pathname) ? <Index /> : <NotFound />;

export default App;
