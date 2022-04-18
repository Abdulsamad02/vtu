import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/global/sidebar";
import UserProvider from "../components/context/userContext";
import Auth from "../components/global/Auth";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useRef, useState } from "react";
import Whatsapp from "../components/global/Whatapp";
import { useRouter } from "next/router";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { signout } from "../utils/auth";

// process.env.NODE_ENV === "production" &&
Sentry.init({
  dsn: "https://ec937c138c08447eb129e201d5ca1f55@o996794.ingest.sentry.io/5955307",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  const isHomepage = router.pathname === "/";

  const logoutTimerIdRef = useRef(0);

  useEffect(() => {
    const autoLogout = () => {
      if (document.visibilityState === "hidden") {
        const timeOutId = window.setTimeout(signout, 5 * 60 * 1000);
        logoutTimerIdRef.current = timeOutId;
      } else {
        window.clearTimeout(logoutTimerIdRef.current);
      }
    };

    document.addEventListener("visibilitychange", autoLogout);

    return () => {
      document.removeEventListener("visibilitychange", autoLogout);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <UserProvider>
          <Auth>
            <div className="flex">
              <Sidebar />
              <Whatsapp />
              {!isHomepage && (
                <div className=" fixed z-10 h-12 w-full bg-white bg-opacity-60 backdrop-blur-lg backdrop-filter"></div>
              )}
              <Component {...pageProps} />
            </div>
          </Auth>
        </UserProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
