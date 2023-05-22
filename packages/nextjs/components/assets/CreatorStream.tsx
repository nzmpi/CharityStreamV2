import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { useScaffoldContractWrite, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useAccount } from "wagmi";

export const CreatorStream = () => {
  const [idStream, setIdStream] = useState("0");
  const { address: signer } = useAccount();

  const getEndTime = (time: number) : string => {
    if (time === -1) {
      return "-";
    }
    var a = new Date(time * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var formattedTime = hour + ':' + min + ':' + sec + ' ' + date + ' ' + month + ' ' + year ;
    return formattedTime;
  };

  const { data: Stream } = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getStream",
    args: [BigNumber.from(idStream)],
  });

  const { writeAsync: withdrawFunds } = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "withdrawFunds",
    args: [BigNumber.from(idStream)],
  });

  return (    
    <div className="flex items-center flex-col flex-grow">

      <div className={"mx-auto mt-10"}>
        <form className="md:w-[370px] w-[370px] lg:w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">
          <span className="text-3xl text-black">Get Stream</span>

          <div className="p-2 py-2"> </div>
            <input
                type = "number"
                onChange={e => {
                  if (e.target.value === "") {
                    setIdStream("0");
                  } else   
                    setIdStream(e.target.value);
                }}
                placeholder="Stream ID"
                className="input input-bordered input-accent bg-transparent"
            />

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Receiver: </span>
          <Address address={Stream?.receiver || ethers.constants.AddressZero} />

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Starts: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getEndTime(Stream?.startTime || -1)}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Ends: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getEndTime(Stream?.endTime || -1)}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Flow: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {Stream?.flow ? ethers.utils.formatEther(Stream?.flow.mul(3600)) + " Ξ/h" : "-"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Left amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {Stream?.leftAmount ? ethers.utils.formatEther(Stream?.leftAmount) + " Ξ" : "-"}
          </span>

          <div className="mt-2 form-control flex-row gap-8">
          <span className="p-2 text-lg font-bold"> Withdraw Funds </span>
          <button
              type="button"
              disabled={
                idStream === "0" ||
                Stream?.receiver !== signer
              }              
              onClick={async () => {
                await withdrawFunds();
              }}
              className={"btn btn-primary font-black w-1/3 flex items-center"}
            >
              <BanknotesIcon className="w-8 h-8 mt-0.5" /> 
            </button>
          </div>
        </div>
        </form>
      </div>
        
    </div>
  );
};