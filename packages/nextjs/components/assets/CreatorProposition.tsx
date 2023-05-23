import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import {
  MegaphoneIcon, 
  ArchiveBoxArrowDownIcon
} from "@heroicons/react/24/outline";
import { 
  useScaffoldContractWrite, 
  useScaffoldEventSubscriber 
} from "~~/hooks/scaffold-eth";
import { Input } from "./Inputs";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";

export const CreatorProposition = () => {
  const [timeUnitPayment, setTimeUnitPayment] = useState("Seconds");
  const [timeUnitVote, setTimeUnitVote] = useState("Seconds");
  const [idCampaign, setIdCampaign] = useState("0");
  const [idProposition, setIdProposition] = useState("0");
  const [description, setDescription] = useState("");
  const [paymentDuration, setPaymentDuration] = useState("");
  const [paymentDurationNumber, setPaymentDurationNumber] = useState(0);
  const [voteDuration, setVoteDuration] = useState("");
  const [voteDurationNumber, setVoteDurationNumber] = useState(0);
  const [amount, setAmount] = useState("");
  const { address: signer } = useAccount();

  const getAmount = (amount: string) : BigNumber => {
    if (amount === "") {
      return BigNumber.from(0);
    }
    return ethers.utils.parseEther(amount);
  }

  const handleDuration = (duration: string, durationOf: string) => {
    if (duration === "") {
      return;
    }
    let value = parseInt(duration);
    if (durationOf === "Payment") {
      if (timeUnitPayment === "Minutes") {
        value = value*60;
      } else if (timeUnitPayment === "Hours") {
        value = value*3600;
      } else if (timeUnitPayment === "Days") {
        value = value*86400;
      }
      setPaymentDurationNumber(value);
    } else {
      if (timeUnitVote === "Minutes") {
        value = value*60;
      } else if (timeUnitVote === "Hours") {
        value = value*3600;
      } else if (timeUnitVote === "Days") {
        value = value*86400;
      }
      setVoteDurationNumber(value);
    }    
  };

  const notifyLive = (idProposition: string) => 
  toast("Proposition #" + idProposition + " is live!", 
  {
    className: "md:w-[250px] w-[250px] lg:w-[250px] md:h-[80px] h-[80px] lg:h-[80px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 px-7 py-5",
    icon: "📣",
    position: "bottom-right",
    style: {
      padding: "20px",
    }
  });

  const notifyResult = (result: string) => 
  toast(result, 
  {
    className: "md:w-[250px] w-[250px] lg:w-[250px] md:h-[80px] h-[80px] lg:h-[80px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 px-7 py-5",
    icon: "🚨",
    position: "bottom-right",
    style: {
      padding: "20px",
    }
  });

  const notifyStream = (result: string) => 
  toast(result, 
  {
    className: "md:w-[250px] w-[250px] lg:w-[250px] md:h-[80px] h-[80px] lg:h-[80px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 px-7 py-5",
    icon: "💰",
    position: "bottom-right",
    style: {
      padding: "20px",
    }
  });

  const { writeAsync: newProposition } = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "newProposition",
    args: [BigNumber.from(idCampaign), description, getAmount(amount), paymentDurationNumber, voteDurationNumber],
  });

  const { writeAsync: endProposition } = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "endProposition",
    args: [BigNumber.from(idCampaign), BigNumber.from(idProposition)],
  });

  useEffect(() => {
    handleDuration(paymentDuration, "Payment");
  }, [paymentDuration, timeUnitPayment]);

  useEffect(() => {
    handleDuration(voteDuration, "Vote");
  }, [voteDuration, timeUnitVote]);

  useScaffoldEventSubscriber({
    contractName: "CharityStreamV2",
    eventName: "newPropositionEvent",
    listener: (
      creator, 
      idCampaign, 
      idProposition, 
      description, 
      amount, 
      paymentDuration, 
      voteEndTime
    ) => {
      if (creator === signer) {
        notifyLive(idProposition.toString());
      }
    },
  });

  useScaffoldEventSubscriber({
    contractName: "CharityStreamV2",
    eventName: "quorumIsNotMetEvent",
    listener: (creator, idCampaign, idProposition) => {
      if (creator === signer) {
        notifyResult("Quorum is not met!");
      }
    },
  });

  useScaffoldEventSubscriber({
    contractName: "CharityStreamV2",
    eventName: "propositionIsApprovedEvent",
    listener: (creator, idCampaign, idProposition) => {
      if (creator === signer) {
        notifyResult("Proposition is approved!");
      }
    },
  });

  useScaffoldEventSubscriber({
    contractName: "CharityStreamV2",
    eventName: "propositionIsNotApprovedEvent",
    listener: (creator, idCampaign, idProposition) => {
      if (creator === signer) {
        notifyResult("Proposition is not approved!");
      }
    },
  });

  useScaffoldEventSubscriber({
    contractName: "CharityStreamV2",
    eventName: "createStreamEvent",
    listener: (receiver, idStream, flow, funds) => {
      if (receiver === signer) {
        notifyStream("Stream #" + idStream.toString() +
        " with " + ethers.utils.formatEther(funds) + "Ξ is live!");
      }
    },
  });

  return (    
    <div className="flex items-center flex-col flex-grow">  

        <div className={"mx-auto mt-7"}>
        <form className={"md:w-[370px] w-[370px] lg:w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5"}>
        <div className="flex-column">
          <span className="text-3xl text-black">Create Proposition</span>

            <div className="form-control mb-3 mt-2">
              <label className="label">
                <span className="label-text font-bold">Campaign ID </span>
              </label>

              <input
                type = "number"
                onChange={e => {
                  if (e.target.value === "") {
                    setIdCampaign("0");
                  } else   
                    setIdCampaign(e.target.value);
                }}
                placeholder="ID"
                className="input input-bordered input-accent input-sm bg-transparent"
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-bold">Describe your Proposition</span>
              </label>

              <input
                type = "text"
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
                className="input input-bordered input-accent input-sm bg-transparent"
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text font-bold">Amount of ETH for this Proposition</span>
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
              <span className="label-text font-bold">Duration of Payment</span>
            </label>
              
            <div className="input-group">
              <input
                type="number"
                onChange={e => setPaymentDuration(e.target.value)}
                placeholder={timeUnitPayment}
                className="input input-bordered input-accent bg-transparent md:w-[210px] w-[210px] lg:w-[210px]"
              />

              <select
                value={timeUnitPayment}
                onChange={e => setTimeUnitPayment(e.target.value)}
                className="select select-bordered select-accent input-sm md:w-[100px] w-[100px] lg:w-[100px]"
              >
              <option value="Seconds">Seconds</option>
              <option value="Minutes">Minutes</option>
              <option value="Hours">Hours</option>
              <option value="Days">Days</option>
              </select>
            </div>
            </div>    

            <div className="form-control mb-3">
            <label className="label">
              <span className="label-text font-bold">Duration of Voting</span>
            </label>
              
            <div className="input-group">
              <input
                type="number"
                onChange={e => setVoteDuration(e.target.value)}
                placeholder={timeUnitVote}
                className="input input-bordered input-accent bg-transparent md:w-[210px] w-[210px] lg:w-[210px]"
              />

              <select
                value={timeUnitVote}
                onChange={e => setTimeUnitVote(e.target.value)}
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
                idCampaign === "0" ||
                description === "" ||
                amount === "" ||
                paymentDuration === "" ||
                parseInt(paymentDuration) === 0 ||
                voteDuration === "" ||
                parseInt(voteDuration) === 0
              }              
              onClick={async () => {
                await newProposition();
              }}
              className={"btn btn-primary font-black w-1/3 flex items-center"}
            >
              <MegaphoneIcon className="w-8 h-8 mt-0.5" /> 
            </button>
            </div>

        </div>
        </form>
        </div>

        <div className={"mx-auto mt-7"}>
        <form className={"md:w-[370px] w-[370px] lg:w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5"}>
        <div className="flex-column">
          <span className="text-3xl text-black">End Proposition</span>
          
          <div className="form-control mb-3 mt-2">
            <label className="label">
              <span className="label-text font-bold">Campaign ID </span>
            </label>

            <input
              type = "number"
              onChange={e => {
                if (e.target.value === "") {
                  setIdCampaign("0");
                } else   
                  setIdCampaign(e.target.value);
              }}
              placeholder="ID"
              className="input input-bordered input-accent input-sm bg-transparent"
            />
          </div>

          <div className="form-control mb-3 mt-2">
            <label className="label">
              <span className="label-text font-bold">Proposition ID </span>
            </label>

            <input
              type = "number"
              onChange={e => {
                if (e.target.value === "") {
                  setIdProposition("0");
                } else   
                  setIdProposition(e.target.value);
              }}
              placeholder="ID"
              className="input input-bordered input-accent input-sm bg-transparent"
            />
          </div>

          <div className="mt-5 flex flex-col items-center py-2">
          <button
              type="button"
              disabled={
                idCampaign === "0" ||
                idProposition === "0"
              }              
              onClick={async () => {
                await endProposition();
              }}
              className={"btn btn-primary font-black w-1/3 flex items-center"}
            >
              <ArchiveBoxArrowDownIcon className="w-8 h-8 mt-0.5" /> 
            </button>
          </div>

        </div>
        </form>
        </div>

    </div>      
  );
};
