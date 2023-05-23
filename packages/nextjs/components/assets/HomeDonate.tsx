import { useState } from "react";
import { BigNumber, ethers } from "ethers";
import { 
  GiftIcon, 
  WalletIcon, 
  InboxArrowDownIcon 
} from "@heroicons/react/24/outline";
import { 
  useScaffoldContractWrite, 
  useScaffoldContractRead 
} from "~~/hooks/scaffold-eth";
import { useAccount } from "wagmi";
import { Input } from "./Inputs";

export const HomeDonate = () => {
  const [idCampaign, setIdCampaign] = useState("0");
  const [idCampaignProposition, setIdCampaignProposition] = useState("0");
  const [idProposition, setIdProposition] = useState("0");
  const [amount, setAmount] = useState("");
  const [decision, setDecision] = useState("");
  const { address: signer } = useAccount();

  const getAmount = () : string => {
    if (amount === "" || ethers.utils.parseEther(amount).eq(0)) {
      return "0";
    }
    return amount;
  };

  const getDecision = (decision: string) : boolean => {
    if (decision === "" || decision === "false") {
      return false;
    } else {
      return true;
    }
  };

  const getRefunds = () : string => {
    if (Refunds === undefined || Refunds.eq(0)) return "0";
    return ethers.utils.formatEther(Refunds);
  }

  const getCampaigns = (campaigns: readonly BigNumber[]) : string => {
    if (campaigns.length === 0) {
      return "0";
    }
    let camps = "";
    for (let i = 0; i < campaigns.length - 1; i++) {
      camps += campaigns[i].toString() + ", ";
    }
    camps += campaigns[campaigns.length - 1].toString();
    return camps;
  }

  const { writeAsync: donate } = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "donate",
    args: [BigNumber.from(idCampaign)],
    value: getAmount(),
  });

  const { writeAsync: vote } = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "vote",
    args: [BigNumber.from(idCampaignProposition), BigNumber.from(idProposition), getDecision(decision)],
  });

  const { writeAsync: withdrawRefunds } = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "withdrawRefunds",
  });

  const { data: Refunds} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getRefunds",
    args: [signer],
  });

  const { data: Campaigns} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getBackedCampaigns",
    args: [signer],
  });

  if (typeof document !== 'undefined') {
    const yes = document.querySelector('input[name="voting"][value="Yes"]') as HTMLInputElement;
    const no = document.querySelector('input[name="voting"][value="No"]') as HTMLInputElement;

    yes?.addEventListener('change', () => {
      if (yes.checked) {
        setDecision("true");
      }
    });

    no?.addEventListener('change', () => {
      if (no.checked) {
        setDecision("false");
      }
    });
  }

  return (     
    <div className="flex items-center flex-col flex-grow">  

        <div className={"mx-auto mt-7"}>
        <form className={"md:w-[370px] w-[370px] lg:w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5"}>
        <div className="flex-column">
          <span className="text-3xl text-black">Donate </span>
          
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
                <span className="label-text font-bold">Amount</span>
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

          <div className="mt-5 flex flex-col items-center py-2">
          <button
              type="button"
              disabled={
                getAmount() === "0" ||
                idCampaign === "0"
              }              
              onClick={async () => {
                await donate();
              }}
              className={"btn btn-primary font-black w-1/3 flex items-center"}
            >
              <GiftIcon className="w-8 h-8 mt-0.5" /> 
            </button>
          </div>

        </div>
        </form>
        </div>  

        <div className={"mx-auto mt-7"}>
        <form className={"md:w-[370px] w-[370px] lg:w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5"}>
        <div className="flex-column">
          <span className="text-3xl text-black">QVote </span>
          
          <div className="form-control mb-3 mt-2">
            <label className="label">
              <span className="label-text font-bold">Campaign ID </span>
            </label>

            <input
              type = "number"
              onChange={e => {
                if (e.target.value === "") {
                  setIdCampaignProposition("0");
                } else   
                  setIdCampaignProposition(e.target.value);
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

          <div className="mb-3 mt-5 justify-center items-center flex flex-row items-start gap-5">
            <label className="label">
              <span className="label-text font-bold">Decision: </span>
            </label>

            <input type="radio" name="voting" className="radio" value="Yes" />
            <label>Aye</label>
            <input type="radio" name="voting" className="radio" value="No" />
            <label>Nay</label>
          </div>

          <div className="mt-5 flex flex-col items-center py-2">
          <button
              type="button"
              disabled={
                idCampaignProposition === "0" ||
                idProposition === "0" ||
                decision === ""
              }              
              onClick={async () => {
                await vote();
              }}
              className={"btn btn-primary font-black w-1/3 flex items-center"}
            >
              <InboxArrowDownIcon className="w-8 h-8 mt-0.5" /> 
            </button>
          </div>

        </div>
        </form>
        </div>  

        <div className={"mx-auto mt-7"}>
        <form className="md:w-[370px] w-[370px] lg:w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">  
          <span className="p-2 text-lg font-bold"> Supported campaigns: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {Campaigns ? getCampaigns(Campaigns) : "0"}
          </span>
          
          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Available refund: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getRefunds()} Ξ
          </span>    

          <div className="mt-3 flex flex-col items-center py-2">
          <button
              type="button"
              disabled={
                Refunds?.eq(BigNumber.from("0"))
              }              
              onClick={async () => {
                await withdrawRefunds();
              }}
              className={"btn btn-primary font-black w-1/3 flex items-center"}
            >
              <WalletIcon className="w-8 h-8 mt-0.5" /> 
            </button>
          </div>      

        </div>
        </form>
        </div>     
         
    </div>      
  );
};