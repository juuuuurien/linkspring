import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// if you're encountering any error concerning .env,
// please make sure you have:

// MONGODB_DB --> name of the db
// MONGODB_URI  --> connection string for MONGO
// NEXTAUTH_URL --> basic URL for server side
// NEXTAUTH_SECRET --> secret for JWT tokens
// NEXT_PUBLIC_URL --> basic URL of site

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
