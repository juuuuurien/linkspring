import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// if you're encountering any error concerning .env,
// please make sure you have:

// MONGODB_DB
// MONGODB_URI
// NEXTAUTH_URL
// NEXTAUTH_SECRET

// in your environment variables

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);

  const queryCLient = new QueryClient();

  return getLayout(
    <QueryClientProvider client={queryCLient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
