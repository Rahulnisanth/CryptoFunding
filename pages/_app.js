import "../styles/globals.css";
import { NavBar, Footer } from "../Components";
// import { CrowdFundingProvider } from "../Context/CrowdFunding";
export default function App({ Component, pageProps }) {
  return (
    <div>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
