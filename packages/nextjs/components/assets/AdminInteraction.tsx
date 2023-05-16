import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { IdentificationIcon, NoSymbolIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { AddressInput } from "~~/components/scaffold-eth/Input/AddressInput";

export const AdminInteraction = () => {
  const [newOwner, setNewOwner] = useState("");
  const [idCampaign, setIdCampaign] = useState<BigNumber>(BigNumber.from(0));

  const { writeAsync: writeAsyncT, isLoading: isLoadingT} = useScaffoldContractWrite({
    contractName: "CharityStream",
    functionName: "transferOwnership",
    args: [newOwner],
  });

  const { writeAsync: writeAsyncS, isLoading: isLoadingS} = useScaffoldContractWrite({
    contractName: "CharityStream",
    functionName: "stopAndRefundCampaign",
    args: [idCampaign],
  });

  return (     
    <div className="flex flex-col items-left mx-5 sm:mx-10 2xl:mx-20">  

      <div className={`mt-2 flex gap-2 max-w-2xl`}>
        <div className="flex flex-col mt-8 px-7 py-8 bg-base-200 opacity-80 rounded-3xl shadow-lg border-2 border-primary">
          <span className="text-2xl sm:text-4xl text-black">Transfer Ownership </span>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <AddressInput
              value={newOwner}
              onChange={value => setNewOwner(value)}
              placeholder="New owner's address"
            />
            {newOwner.length > 0 && !ethers.utils.isAddress(newOwner) ? <p> Not an address! </p> : null}
            <button
              className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
              isLoadingT ? "loading" : ""
                }`}
                onClick={writeAsyncT}
                >
                {!isLoadingT && (
                  <>
                    <IdentificationIcon className="w-8 h-8 mt-0.5" />
                  </>
                )}
            </button>
          </div>
        </div>
      </div>     

      <div className={`mt-2 flex gap-2 max-w-2xl`}>
        <div className="flex flex-col mt-8 px-7 py-8 bg-base-200 opacity-80 rounded-3xl shadow-lg border-2 border-primary">
          <span className="text-2xl sm:text-4xl text-black">Stop Campaign </span>
            <label className="label">
              <span className="label-text font-bold">(and refund money) </span>
            </label>

          <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type = "number"
              onChange={e => {
                if (e.target.value === '') {
                  setIdCampaign(BigNumber.from(0));
                } else {
                  setIdCampaign(BigNumber.from(e.target.value))
                }
              }}
              placeholder="Campaign's ID"
              className="input input-bordered input-accent bg-transparent"
            />
            <button
              className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
              isLoadingS ? "loading" : ""
                }`}
                onClick={writeAsyncS}
                >
                {!isLoadingS&& (
                  <>
                    <NoSymbolIcon className="w-8 h-8 mt-0.5" />
                  </>
                )}
            </button>
          </div>
        </div>
      </div>  
       
    </div>      
  );
};
