import Head from "next/head";
import type { NextPage } from "next";
import { useState } from "react";
import { CreatorCampaign } from "~~/components/assets/CreatorCampaign";
import { CreatorProposition } from "~~/components/assets/CreatorProposition";
import { CreatorStream } from "~~/components/assets/CreatorStream";

const Creator: NextPage = () => {
  const [activeItem, setActiveItem] = useState("Campaign");

  function handleActiveItem(itemId: string) {
    setActiveItem(itemId);
  }

  return (
    <>
      <Head>
        <title>Creator page</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>

      <div className="flex items-center flex-col flex-grow pt-10">
      <ul className="menu menu-horizontal bg-base-100 rounded-box activemenu border">
        <li onClick={() => handleActiveItem("Campaign")}>
          <a className={activeItem === "Campaign" ? "active" : ""}>Campaign</a>
        </li>          
        <li onClick={() => handleActiveItem("Proposition")}>
          <a className={activeItem === "Proposition" ? "active" : ""}>Proposition</a>
        </li>
        <li onClick={() => handleActiveItem("Stream")}>
          <a className={activeItem === "Stream" ? "active" : ""}>Stream</a>
        </li>
      </ul>

      {activeItem === "Campaign" && (
        <CreatorCampaign/>
      )}

      {activeItem === "Proposition" && (
        <CreatorProposition/>
      )}

      {activeItem === "Stream" && (
        <CreatorStream/>
      )}
    </div>
    </>
  );
};

export default Creator;
