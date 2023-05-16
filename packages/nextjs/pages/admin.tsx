import Head from "next/head";
import type { NextPage } from "next";
import { AdminInteraction } from "~~/components/assets/AdminInteraction";
import { AdminData } from "~~/components/assets/AdminData";

const Admin: NextPage = () => {
  return (
    <>
      <Head>
        <title>Admin page</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div className="grid lg:grid-cols-2 flex-grow">
        <AdminData />
        <AdminInteraction />
      </div>
    </>
  );
};

export default Admin;
