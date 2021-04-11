import "../styles/globals.css";
import "nprogress/nprogress.css";

import { ThemeProvider } from "next-themes";
import dynamic from "next/dynamic";

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar");
  },
  { ssr: false }
);

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <TopProgressBar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
