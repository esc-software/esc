import { renderToString } from "react-dom/server";
import App from "./App";
import NotFound from "./pages/NotFound";
import { SEO } from "./seo/copy";
import { buildHead, buildNotFoundHead } from "./seo/head";

export const renderPage = () => ({
  html: renderToString(<App pathname="/" />),
  head: buildHead(),
  htmlLang: SEO.htmlLang,
});

export const renderNotFound = () => ({
  html: renderToString(<NotFound />),
  head: buildNotFoundHead(),
  htmlLang: SEO.htmlLang,
});
