import "@module-federation/nextjs-mf/src/include-defaults";
import React, { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { PersistGate } from "redux-persist/integration/react";
import type { AppProps } from "next/app";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import {
  removeOldestQuery,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import { QueryClient } from "@tanstack/react-query";
import { persistor, store } from "src/core/redux/store";
import { Provider } from "react-redux";
import { baseTheme } from "src/core/themes/base";
import Head from "next/head";
import ClientOnly from "src/core/components/ClientOnly";
import logger from "src/core/utils/logger";
import { ThemeProvider } from "@mui/material/styles";
import { ErrorBoundary } from "react-error-boundary";
import "../dist/output.scss";
import { useRouter } from "next/router";
import { useReduxSelector } from "src/core/utils/customHooks/reduxHooks";
import strings from "src/translations/translations";

const PullToRefresh = dynamic(() => import("react-simple-pull-to-refresh"), {
  suspense: true,
});
const Button = dynamic(() => import("src/core/components/Button"), {
  suspense: true,
});
const Typography = dynamic(() => import("@mui/material/Typography"), {
  suspense: true,
});
const Toastr = dynamic(() => import("src/core/components/Toaster"), {
  suspense: true,
});
const Script = dynamic(() => import("next/script"), {
  suspense: true,
});
const Loading = dynamic(() => import("src/core/components/Loading"), {
  suspense: true,
});

const queryClient = new QueryClient({});
let persister: any;

if (typeof window !== "undefined") {
  persister = createSyncStoragePersister({
    storage: window?.localStorage,
    retry: removeOldestQuery,
  });
}

const AppWithTheme = ({ Component, pageProps }: AppProps) => {
  const isLightMode = true;
  const theme = baseTheme(isLightMode);
  const router = useRouter();
  const refreshingContent = (
    <div className="mt-3">
      <Suspense>
        <Loading />
      </Suspense>
    </div>
  );

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary
        FallbackComponent={({
          resetErrorBoundary,
        }: {
          resetErrorBoundary: () => void;
        }) => (
          <div className="h-screen flex flex-col justify-center items-center">
            <Suspense>
              <Typography color="textPrimary" variant="h3">
                {strings.error.try_again}
              </Typography>

              <Button
                variant="primary"
                className="mx-1 my-4 rounded-12 px-4 py-2"
                onClick={resetErrorBoundary}
              >
                {strings.error.problem}
              </Button>
            </Suspense>
          </div>
        )}
        onReset={() => {
          logger.info("reset called");
        }}
      >
        <Suspense>
          <PullToRefresh
            pullingContent={""}
            refreshingContent={refreshingContent}
            onRefresh={async () => router.reload()}
            backgroundColor={theme.palette.background.paper}
          >
            <>
              <Component {...pageProps} />
              <Suspense>
                <Toastr />
              </Suspense>
            </>
          </PullToRefresh>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

declare type AppInitialProps<P = any> = {
  pageProps: P;
  Component: P;
};

const MyApp = ({ Component, pageProps }: AppInitialProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="HandheldFriendly" content="true" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <title>{strings.app_name}</title>
      </Head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_API_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.GOOGLE_ANALYTICS_API_ID}');
        `}
      </Script>

      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ClientOnly>
              <AppWithTheme
                Component={Component}
                pageProps={pageProps}
                {...pageProps}
              />
            </ClientOnly>
          </PersistGate>
        </Provider>
      </PersistQueryClientProvider>
    </>
  );
};

/*
  this function can report web vitals like FCP and LCP
**/
// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric);
// }

export default MyApp;
