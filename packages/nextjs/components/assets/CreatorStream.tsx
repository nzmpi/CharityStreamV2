import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { useScaffoldContractWrite, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useAccount } from "wagmi";
import { get } from "http";

export const CreatorStream = () => {
  const [idStream, setIdStream] = useState(0);
  const { address: signer } = useAccount();

  const getTime = (time: number) : string => {
    if (time === -1) {
      return "-";
    }
    var a = new Date(time * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
    var hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var formattedTime = hour + ':' + min + ':' + sec + ' ' + date + ' ' + month + ' ' + year ;
    return formattedTime;
  };

  const getEther = (x: BigNumber, d: number) : string => {
    let stringX = ethers.utils.formatEther(x).slice(0, d);
    let newX = ethers.utils.parseEther(stringX);
    return ethers.utils.formatEther(newX);
  }

  const getStreams = () : string => {
    if (Streams === undefined || Streams.length === 0) return "-";

    let result = "";
    for (let i = 0; i < Streams.length; i++) {
      if (Streams[i].receiver === signer) {
        result += (i+1) + ", ";
      }
    }

    if (result === "") return "-";
    else return result.slice(0, -2);
  }

  type StreamType = {
    startTime: number;
    endTime: number;
    availableAmount: string;
    receiver: string;
    flow: string;
    leftAmount: string;
  };

  const getStream = (id: number) : StreamType => {
    let Stream : StreamType = {
      startTime: -1,
      endTime: -1,
      availableAmount: "-",
      receiver: ethers.constants.AddressZero,
      flow: "-",
      leftAmount: "-",
    };

    if (Streams === undefined || id <= 0 || id > Streams.length) return Stream;
    Stream.startTime = Streams[id - 1].startTime;
    Stream.endTime = Streams[id - 1].endTime;
    Stream.availableAmount = getAvailableAmount(
      Streams[id - 1].lastWithdrawTime,
      Streams[id - 1].endTime,
      Streams[id - 1].flow
    );
    Stream.receiver = Streams[id - 1].receiver;
    Stream.flow = ethers.utils.formatEther(Streams[id - 1].flow.mul(3600)) + " Ξ/h";
    Stream.leftAmount = getEther(Streams[id - 1].leftAmount, 16) + " Ξ";
    
    return Stream;
  }

  const getAvailableAmount = (
    lastWithdrawTime: number,
    endTime: number,
    flow: BigNumber
    ) : string => {
    let delta = 0;
    let amount;
    const timeNow = Math.floor(Date.now()/1000);
    if (timeNow < endTime) {
      delta = timeNow - lastWithdrawTime;
      amount = flow.mul(delta);
      return getEther(amount, 19) + " Ξ";
    } else {
      delta = endTime - lastWithdrawTime;
      amount = flow.mul(delta);
      return getEther(amount, 19) + " Ξ";
    }
  }

  const { data: Streams } = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getStreams",
  });

  const { writeAsync: withdrawFunds } = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "withdrawFunds",
    args: [BigNumber.from(idStream)],
  });

  return (    
    <div className="flex items-center flex-col flex-grow">

      <div className={"mx-auto mt-7"}>
        <form className="w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">
          <span className="text-3xl">Get Stream</span>

          <div className="p-2 py-2"> </div>
            <input
                type = "number"
                onChange={e => {
                  if (e.target.value === "") {
                    setIdStream(0);
                  } else   
                    setIdStream(parseInt(e.target.value));
                }}
                placeholder="Stream ID"
                className="input input-bordered input-accent bg-transparent flex border-2 border-base-300 focus:outline-none px-4 placeholder-primary placeholder:text-accent/90"
            />

          <div className="p-2 py-1"> </div>
          <div className="flex flex-row">
          <span className="p-2 text-lg font-bold"> Receiver: </span>
          <Address address={getStream(idStream).receiver} />
          </div>

          <div className="p-2 py-0"> </div>
          <span className="p-2 text-lg font-bold"> Starts: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getTime(getStream(idStream).startTime)}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Ends: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getTime(getStream(idStream).endTime)}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Flow: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getStream(idStream).flow}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Left amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getStream(idStream).leftAmount !== "0.0 Ξ" ? getStream(idStream).leftAmount : "0 Ξ"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Available: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getStream(idStream).availableAmount !== "0.0 Ξ" ? getStream(idStream).availableAmount : "0 Ξ"}
          </span>

          <div className="mt-2 form-control flex-row gap-8">
          <span className="p-2 text-lg font-bold"> Withdraw Funds </span>
          <button
              type="button"
              disabled={
                idStream === 0 ||
                getStream(idStream).receiver !== signer
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

      <div className={"mx-auto mt-7"}>
        <form className="md:w-[370px] w-[370px] lg:w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">
          <span className="p-2 text-lg font-bold"> Your Streams: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getStreams()}
          </span> 

        </div>
        </form>
      </div>
        
    </div>
  );
};