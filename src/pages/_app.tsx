import "@/styles/globals.css";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { AppProps } from "next/app";
import { Noto_Sans_JP } from "next/font/google";
import {SessionProvider} from "next-auth/react"
const appendCache = createEmotionCache({ key: "mantine", prepend: false });

const notosams = Noto_Sans_JP({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            emotionCache={appendCache}
            theme={{
              colorScheme: "dark",
              fontFamily: notosams.style.fontFamily,
              fontFamilyMonospace: notosams.style.fontFamily,
              headings: { fontFamily: notosams.style.fontFamily },
            }}
          >
            <Notifications />
            <Component {...pageProps} />
          </MantineProvider>
    </SessionProvider>
    
  );
}
