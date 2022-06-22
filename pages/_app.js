import "../styles/globals.css";
import "../styles/form.css";
import "../styles/appbar.css";
import "../styles/card.css";
import "../styles/main.css";
import "../styles/onmind.css";
import "../styles/comment.css";
import "../styles/buttonadd.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
