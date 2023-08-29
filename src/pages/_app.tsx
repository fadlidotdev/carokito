import type {AppProps} from "next/app";

import "@/styles/globals.css";
import DefaultLayout from "@/layouts/default";
import {Head} from "@/layouts/head";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useRouter} from "next/router";
import {Toaster} from "react-hot-toast";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardAuthContextProvider from "@/components/layouts/DashboardAuthContextProvider";

const queryClient = new QueryClient();

const App = ({Component, pageProps}: AppProps) => {
  const {pathname} = useRouter();

  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      <Head />

      {isDashboard ? (
        <DashboardAuthContextProvider>
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        </DashboardAuthContextProvider>
      ) : (
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      )}
    </QueryClientProvider>
  );
};

export default App;
