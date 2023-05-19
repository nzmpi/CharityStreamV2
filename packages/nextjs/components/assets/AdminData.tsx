import { ethers } from "ethers";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";

export const AdminData = () => {

  const { data: idCampaign} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "idCampaign",
  });

  const { data: numStreams} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getNumberOfStreams",
  });

  const { data: Fee} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "fee",
  });  

  const { data: Owner} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "owner",
  });

  const { writeAsync: writeAsyncW, isLoading: isLoadingW } = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "withdrawFee",
  });

  return (    
      <div className="flex flex-col items-center mx-5 sm:mx-10 2xl:mx-20">

        <div className={`mt-10 px-20 flex gap-2 max-w-2xl`}>
        <div className="flex border-primary border-2 rounded-3xl shadow-lg px-7 py-5 ">
        <div className="flex-column">
          <span className="p-2 text-lg font-bold"> Contract owner: </span>
          <Address address={Owner} />
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Number of Campaigns: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> {idCampaign?.toString() || "0"} </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Number of Streams: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> {numStreams?.toString() || "0"} </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Fees: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
            {Fee ? ethers.utils.formatEther(Fee?.toString()) : "0.0"} ETH
          </span>
        </div>
        </div>
        </div>

        <div className={`mt-2 flex gap-2 max-w-2xl`}>
        <div className="flex flex-col mt-8 px-7 py-8 bg-base-200 opacity-80 rounded-3xl shadow-lg border-2 border-primary">
          <span className="text-2xl sm:text-4xl text-black">Withdraw Fees </span>

          <div className="mt-8 justify-center items-center flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">            
              <button
              className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
              isLoadingW ? "loading" : ""
                }`}
                onClick={writeAsyncW}
                >
                {!isLoadingW && (
                  <>
                    <BanknotesIcon className="w-8 h-8 mt-0.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div> 
        
      </div>
  );
};