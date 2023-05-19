import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import { useScaffoldContractWrite, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { EtherInput } from "~~/components/scaffold-eth/Input/EtherInput";
import { 
  RocketLaunchIcon, 
  NoSymbolIcon, 
  TrophyIcon
} from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

export const CreatorCampaign = () => {
  const [timeUnit, setTimeUnit] = useState('Seconds');
  const [nameOfCampaign, setNameOfCampaign] = useState("");
  const [idCampaign, setIdCampaign] = useState<BigNumber>(BigNumber.from(0));
  const [idStreamCheck, setIdStreamCheck] = useState<BigNumber>(BigNumber.from(0));
  const [amountString, setAmountString] = useState("");
  const [amount, setAmount] = useState<BigNumber>(BigNumber.from(0));
  const [duration, setDuration] = useState<BigNumber>(BigNumber.from(0));
  const [startTimeCheck, setStartTimeCheck] = useState("");   
  const [endTimeCheck, setEndTimeCheck] = useState(""); 

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setDuration(BigNumber.from(0));
      return;
    }
    let value = BigNumber.from(e.target.value);
    if (timeUnit === 'Minutes') {
      value = value.mul(BigNumber.from(60));
    } else if (timeUnit === 'Hours') {
      value = value.mul(BigNumber.from(3600));
    } else if (timeUnit === 'Days') {
      value = value.mul(BigNumber.from(86400));
    }
    setDuration(BigNumber.from(value));
  };

  const handleTimeUnitChange = (e: string) => {
    setTimeUnit(e);
  };

  const getStartTimeCheck = (time: number) => {
    var a = new Date(time * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var formattedTime = hour + ':' + min + ':' + sec + ' ' + date + ' ' + month + ' ' + year ;
    setStartTimeCheck(formattedTime);
  };

  const getEndTimeCheck = (time: number) => {
    var a = new Date(time * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var formattedTime = hour + ':' + min + ':' + sec + ' ' + date + ' ' + month + ' ' + year ;
    setEndTimeCheck(formattedTime);
  };

  const { writeAsync: writeAsyncC, isLoading: isLoadingC} = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "createCampaign",
    args: [nameOfCampaign, amount, duration],
  });

  const { writeAsync: writeAsyncF, isLoading: isLoadingF} = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "finishCampaign",
    args: [idCampaign],
  });

  const { writeAsync: writeAsyncS, isLoading: isLoadingS} = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "stopAndRefundCampaign",
    args: [idCampaign],
  });

  const { data: Stream } = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getStream",
    args: [idStreamCheck],
  });

  return (    
    <div className="flex flex-col items-center mx-5 sm:mx-10 2xl:mx-20">

      <div className={`mt-2 flex gap-2 max-w-2xl`}>
        <div className="flex flex-col mt-8 px-7 py-8 bg-base-200 opacity-80 rounded-3xl shadow-lg border-2 border-primary">
          <span className="text-2xl sm:text-4xl text-black">Create Campaign </span>
          
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-bold">Name of your Campaign </span>
              </label>

              <input
                type = "text"
                onChange={e => setNameOfCampaign(e.target.value)}
                placeholder="Name"
                className="input input-bordered input-accent input-sm bg-transparent"
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-bold">Amount of ETH </span>
              </label>

              <EtherInput
              placeholder="0.0"
              value={amountString}
              onChange={value => {
                setAmount(ethers.utils.parseEther(value))
                setAmountString(value)
              }}
              />
            </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text font-bold">Duration of your Campaign </span>
          </label>
              
          <div className="input-group">
            <input
              type="number"
              onChange={handleDurationChange}
              placeholder={timeUnit}
              className="input input-bordered input-accent bg-transparent"
            />

            <select
              value={timeUnit}
              onChange={e => handleTimeUnitChange(e.target.value)}
              className="select select-bordered select-accent input-sm"
            >
            <option value='Seconds'>Seconds</option>
            <option value='Minutes'>Minutes</option>
            <option value='Hours'>Hours</option>
            <option value='Days'>Days</option>
            </select>
            </div>
        </div>


        <div className="mt-8 justify-center items-center flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
          <button
          className={`btn btn-primary rounded-full px-15 capitalize font-normal font-white w-24 flex gap-1 hover:gap-2 transition-all tracking-widest ${
          isLoadingC ? "loading" : ""
          }`}
            onClick={ writeAsyncC }
          >
          {!isLoadingC&& (
            <>
            <RocketLaunchIcon className="w-8 h-8 mt-0.5" />
            </>
          )}
          </button>
          </div>
        </div>
      </div>

      <div className={`mt-2 flex gap-2 max-w-2xl`}>
          <div className="flex flex-col mt-8 px-7 py-8 bg-base-200 opacity-80 rounded-3xl shadow-lg border-2 border-primary">
            <span className="text-2xl sm:text-4xl text-black">Finish Campaign </span>
            <label className="label">
              <span className="label-text font-bold">(and pay 0.5% fee) </span>
            </label>

            <div className="mt-1 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
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
                isLoadingF ? "loading" : ""
                }`}
                  onClick={writeAsyncF}
              >
                {!isLoadingF&& (
                  <>
                    <TrophyIcon className="w-8 h-8 mt-0.5" />
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

            <div className="mt-1 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
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

      <div className={`mt-10 px-20 flex gap-2 max-w-2xl`}>
        <div className="flex border-primary border-2 rounded-3xl shadow-lg px-7 py-5 ">
        <div className="flex-column">
          <span className="text-2xl sm:text-3xl text-black">Get Stream </span>
          <div className="p-2 py-1"> </div>
            <input
                type = "number"
                onChange={e => {
                  if (e.target.value === '') {
                    setIdStreamCheck(BigNumber.from(-1));
                  } else {
                    setIdStreamCheck(BigNumber.from(e.target.value));
                  }  
                  if (Stream?.startTime === undefined) {
                    getStartTimeCheck(0);
                  } else {
                    getStartTimeCheck(Stream?.startTime);
                  }    
                  if (Stream?.endTime === undefined) {
                    getEndTimeCheck(0);
                  } else {
                    getEndTimeCheck(Stream?.endTime);
                  }        
                }}
                placeholder="Stream's ID"
                className="input input-bordered input-accent bg-transparent"
                />
            <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Receiver: </span>
          <Address address={Stream?.receiver} />
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Starts: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {startTimeCheck || "0"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Ends: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {endTimeCheck || "0"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Flow: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
            {Stream?.flow ? ethers.utils.formatEther(Stream?.flow.toString()) : "0.0"} ETH/s
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Withdrawn: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
            {Stream?.leftAmount ? ethers.utils.formatEther(Stream?.leftAmount.toString()) : "0.0"} ETH
          </span>
        </div>
        </div>
      </div>
        
    </div>
  );
};