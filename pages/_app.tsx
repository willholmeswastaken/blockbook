import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebProvider } from "@3rdweb/react"

const supportedChainIds = [1, 4, 137];
const connectors = {
  injected: {},
  walletconnect: {},
  walletlink: {
    appName: "thirdweb - demo",
    url: "https://thirdweb.com",
    darkMode: false,
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
