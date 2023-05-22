import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import { useScaffoldContractWrite, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { 
  RocketLaunchIcon, 
  NoSymbolIcon, 
  TrophyIcon
} from "@heroicons/react/24/outline";
import { Input } from "./Inputs";

export const CreatorCampaign = () => {
  const [timeUnit, setTimeUnit] = useState("Seconds");
  const [campaignName, setCampaignName] = useState("");
  const [idCampaignFinish, setIdCampaignFinish] = useState("0");
  const [idCampaignRefund, setIdCampaignRefund] = useState("0");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [durationBN, setDurationBN] = useState<BigNumber>(BigNumber.from(0));

  const handleDuration = (duration: string) => {
    if (duration === "") {
      return;
    }
    let value = BigNumber.from(duration);
    if (timeUnit === "Minutes") {
      value = value.mul(BigNumber.from(60));
    } else if (timeUnit === "Hours") {
      value = value.mul(BigNumber.from(3600));
    } else if (timeUnit === "Days") {
      value = value.mul(BigNumber.from(86400));
    }
    setDurationBN(value);
  };

  const getAmount = (amount: string) : BigNumber => {
    if (amount === "") {
      return BigNumber.from(0);
    }
    return ethers.utils.parseEther(amount);
  }

  const { writeAsync: createCampaign } = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "createCampaign",
    args: [campaignName, getAmount(amount), durationBN],
  });

  const { writeAsync: finishCampaign } = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "finishCampaign",
    args: [BigNumber.from(idCampaignFinish)],
  });

  const { writeAsync: refundCampaign } = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "stopAndRefundCampaign",
    args: [BigNumber.from(idCampaignRefund)],
  });

  const { data: fee} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "fee",
  });

  useEffect(() => {
    handleDuration(duration);
  }, [duration, timeUnit]);

  return (    
    <div className="flex items-center flex-col flex-grow">

      <div className={"mx-auto mt-10"}>
        <form className={"md:w-[370px] w-[370px] lg:w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5"}>
        <div className="flex-column">
          <span className="text-3xl text-black">Create Campaign</span>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-bold">Name your Campaign </span>
              </label>

              <input
                type = "text"
                onChange={e => setCampaignName(e.target.value)}
                placeholder="Name"
                className="input input-bordered input-accent input-sm bg-transparent"
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-bold">Goal amount</span>
              </label>

              <Input
              name = {"Ξ"}
              placeholder="Amount"
              value={amount}
              onChange={value => {
                if (value === "") {
                  setAmount("");
                } else   
                  setAmount(value);
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
                onChange={e => setDuration(e.target.value)}
                placeholder={timeUnit}
                className="input input-bordered input-accent bg-transparent md:w-[210px] w-[210px] lg:w-[210px]"
              />

              <select
                value={timeUnit}
                onChange={e => setTimeUnit(e.target.value)}
                className="select select-bordered select-accent input-sm md:w-[100px] w-[100px] lg:w-[100px]"
              >
              <option value="Seconds">Seconds</option>
              <option value="Minutes">Minutes</option>
              <option value="Hours">Hours</option>
              <option value="Days">Days</option>
              </select>
            </div>
            </div>            

            <div className="mt-5 flex flex-col items-center py-2">
            <button
              type="button"
              disabled={
                campaignName === "" ||
                amount === "" ||
                duration === ""
              }              
              onClick={async () => {
                await createCampaign();
              }}
              className={"btn btn-primary font-black w-1/3 flex items-center"}
            >
              <RocketLaunchIcon className="w-8 h-8 mt-0.5" /> 
            </button>
            </div>

        </div>
        </form>
      </div> 

      <div className={"mx-auto mt-10"}>
        <form className={"md:w-[370px] w-[370px] lg:w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5"}>
        
        <div className="flex-column">
          <span className="text-3xl text-black">Finish Campaign</span>
          
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-bold">
                (and pay {fee ? fee.toNumber()/10 : "0"}% fee)
                </span>
              </label>
              <div className="mt-2 form-control flex-row gap-3">
              <input
                type = "number"
                onChange={e => {
                  if (e.target.value === "") {
                    setIdCampaignFinish("0");
                  } else   
                    setIdCampaignFinish(e.target.value);
                }}
                placeholder="Campaign ID"
                className="input input-bordered input-accent bg-transparent md:w-[200px] w-[200px] lg:w-[200px]"
              />

            <button
              type="button"
              disabled={
                idCampaignFinish === "0"
              }              
              onClick={async () => {
                await finishCampaign();
              }}
              className={"btn btn-primary font-black w-1/3 flex items-center"}
            >
              <TrophyIcon className="w-8 h-8 mt-0.5" /> 
            </button>
            </div>
            </div>

        </div>

        <div className="mt-5 flex-column">
          <span className="text-3xl text-black">Stop Campaign</span>
          
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-bold">
                (and refund money)
                </span>
              </label>
              <div className="mt-2 form-control flex-row gap-3">
              <input
                type = "number"
                onChange={e => {
                  if (e.target.value === "") {
                    setIdCampaignRefund("0");
                  } else   
                    setIdCampaignRefund(e.target.value);
                }}
                placeholder="Campaign ID"
                className="input input-bordered input-accent bg-transparent md:w-[200px] w-[200px] lg:w-[200px]"
              />

            <button
              type="button"
              disabled={
                idCampaignRefund === "0"
              }              
              onClick={async () => {
                await refundCampaign();
              }}
              className={"btn btn-primary font-black w-1/3 flex items-center"}
            >
              <NoSymbolIcon className="w-8 h-8 mt-0.5" /> 
            </button>
            </div>
            </div>

        </div>
        </form>
      </div>
        
    </div>
  );
};