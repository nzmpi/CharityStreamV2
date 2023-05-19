import React, { useEffect, useState } from "react";
import { AddressInput } from "../scaffold-eth";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { ethers } from "ethers";
import HomeInfo from "./HomeInfo";
import HomeDonate from "./HomeDonate";

const MainUI = ({ 
  splitItem
}: { 
  splitItem: string
}) => {

  return (
    <>
      {splitItem === "Latest Info" && (
        <HomeInfo
          
        />
      )}

      {splitItem === "Donate" && (
        <HomeDonate
          
        />
      )}
      

    </>
  );
};

export default MainUI;