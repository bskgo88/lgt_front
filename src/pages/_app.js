import Layout from '@/common/layout';
import Header from '@/common/header';
import Footer from '@/common/footer';
import "@/styles/globals.scss";
import "@/styles/design.scss";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Header />
      <Component {...pageProps}/>
      <Footer />
    </Layout>
  );
}
