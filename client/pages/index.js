import Head from "next/head";
import ChatScreen from "../components/chat/ChatScreen";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
  return (
    <>
      <Head>
        <title>Wazzapp</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <main className="flex">
        <Sidebar />
        <ChatScreen />
      </main>
    </>
  );
};

export default Home;
