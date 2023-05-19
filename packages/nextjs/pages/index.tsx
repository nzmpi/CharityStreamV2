import Head from "next/head";
import type { NextPage } from "next";
import MainUI from "~~/components/assets/MainUI";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [activeItem, setActiveItem] = useState("Latest Info");

  function handleActiveItem(itemId: string) {
    setActiveItem(itemId);
  }

  return (
    <>
      <Head>
        <title>CharityStream v2</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>

    <div className="flex items-center flex-col flex-grow pt-10">
      <ul className="menu menu-horizontal bg-base-100 rounded-box activemenu border">
        <li onClick={() => handleActiveItem("Latest Info")}>
          <a className={activeItem === "Latest Info" ? "active" : ""}>Latest Info</a>
        </li>          
        <li onClick={() => handleActiveItem("Get Info")}>
          <a className={activeItem === "Get Info" ? "active" : ""}>Get Info</a>
        </li>
        <li onClick={() => handleActiveItem("Donate")}>
          <a className={activeItem === "Donate" ? "active" : ""}>Donate</a>
        </li>
      </ul>

      <MainUI 
        splitItem={activeItem}
      />

    </div>  
    </>
  );
};


export default Home;
