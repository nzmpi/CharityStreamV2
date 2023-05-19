import { useState } from "react";
import { BigNumber, ethers } from "ethers";
import { GiftIcon, WalletIcon, InboxArrowDownIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { EtherInput } from "~~/components/scaffold-eth/Input/EtherInput";
import { useAccount } from "wagmi";

const HomeDonate = () => {
  const [decision, setDecision] = useState(false);
  const [idCampaign, setIdCampaign] = useState<BigNumber>(BigNumber.from(0));
  const [idProposition, setIdProposition] = useState<BigNumber>(BigNumber.from(0));
  const [amountString, setAmountString] = useState(""); 
  const { address: signer } = useAccount();

  const { writeAsync: writeAsyncD, isLoading: isLoadingD} = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "donate",
    args: [idCampaign],
    value: amountString,
  });

  const { writeAsync: writeAsyncR, isLoading: isLoadingR} = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "withdrawRefunds",
  });

  const { writeAsync: writeAsyncV, isLoading: isLoadingV} = useScaffoldContractWrite({
    contractName: "CharityStreamV2",
    functionName: "vote",
    args: [idCampaign, idProposition, decision],
  });

  const { data: Refunds} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getRefunds",
    args: [signer],
  });

  if (typeof document !== 'undefined') {
    const yesRadio = document.querySelector('input[name="radio-1"][value="Yes"]') as HTMLInputElement;
    const noRadio = document.querySelector('input[name="radio-1"][value="No"]') as HTMLInputElement;

    yesRadio?.addEventListener('change', () => {
      if (yesRadio.checked) {
        setDecision(true);
      }
    });

    noRadio?.addEventListener('change', () => {
      if (noRadio.checked) {
        setDecision(false);
      }
    });
  }

  return (     
    <div className="flex flex-col items-left mx-5 sm:mx-10 2xl:mx-20">  

        <div className={`mt-2 flex gap-2 max-w-2xl`}>
        <div className="flex flex-col mt-8 px-7 py-8 bg-base-200 opacity-80 rounded-3xl shadow-lg border-2 border-primary">
          <span className="text-2xl sm:text-4xl text-black">Donate </span>
          
            <div className="form-control mb-3 mt-2">
              <label className="label">
                <span className="label-text font-bold">Campaign's ID </span>
              </label>

              <input
                type = "number"
                onChange={e => {
                  if (e.target.value === '') {
                    setIdCampaign(BigNumber.from(0));
                  } else {
                    setIdCampaign(BigNumber.from(e.target.value))
                  }
                }}
                placeholder="ID"
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
              onChange={value => setAmountString(value)}
              />
            </div>

          <div className="mt-5 justify-center items-center flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
          <button
          className={`btn btn-primary rounded-full px-15 capitalize font-normal font-white w-24 flex gap-1 hover:gap-2 transition-all tracking-widest ${
          isLoadingD ? "loading" : ""
          }`}
            onClick={ writeAsyncD }
          >
          {!isLoadingD&& (
            <>
            <GiftIcon className="w-8 h-8 mt-0.5" />
            </>
          )}
          </button>
          </div>
        </div>
        </div>  

        <div className={`mt-2 flex gap-2 max-w-2xl`}>
        <div className="flex flex-col mt-8 px-7 py-8 bg-base-200 opacity-80 rounded-3xl shadow-lg border-2 border-primary">
          <span className="text-2xl sm:text-4xl text-black">Quadratic Vote </span>
          
            <div className="form-control mb-3 mt-2">
              <label className="label">
                <span className="label-text font-bold">Campaign's ID </span>
              </label>

              <input
                type = "number"
                onChange={e => {
                  if (e.target.value === '') {
                    setIdCampaign(BigNumber.from(0));
                  } else {
                    setIdCampaign(BigNumber.from(e.target.value))
                  }
                }}
                placeholder="ID"
                className="input input-bordered input-accent input-sm bg-transparent"
              />
            </div>

            <div className="form-control mb-3 mt-2">
              <label className="label">
                <span className="label-text font-bold">Proposition's ID </span>
              </label>

              <input
                type = "number"
                onChange={e => {
                  if (e.target.value === '') {
                    setIdProposition(BigNumber.from(0));
                  } else {
                    setIdProposition(BigNumber.from(e.target.value))
                  }
                }}
                placeholder="ID"
                className="input input-bordered input-accent input-sm bg-transparent"
              />
            </div>

            <div className="form-control mb-3 mt-5 justify-center items-center flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
              <label className="label">
                <span className="label-text font-bold">Decision: </span>
              </label>

              <input type="radio" name="radio-1"  className="radio" value="Yes" />
              <label>Aye</label>
              <input type="radio" name="radio-1" className="radio" value="No" />
              <label>Nay</label>
            </div>

          <div className="mt-5 justify-center items-center flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
          <button
          className={`btn btn-primary rounded-full px-15 capitalize font-normal font-white w-24 flex gap-1 hover:gap-2 transition-all tracking-widest ${
          isLoadingV ? "loading" : ""
          }`}
            onClick={ writeAsyncV }
          >
          {!isLoadingV&& (
            <>
            <InboxArrowDownIcon className="w-8 h-8 mt-0.5" />
            </>
          )}
          </button>
          </div>
        </div>
        </div>  

        <div className={`mt-2 flex gap-2 max-w-2xl`}>
        <div className="flex flex-col mt-8 px-7 py-8 bg-base-200 opacity-80 rounded-3xl shadow-lg border-2 border-primary">
          <span className="text-2xl sm:text-4xl text-black">Withdraw Refunds </span>
            <label className="label">
              <span className="label-text font-bold">Available: {Refunds ? ethers.utils.formatEther(Refunds?.toString()) : "0.0"} ETH </span>
            </label>
          <div className="mt-5 justify-center items-center flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">            
              <button
              className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
              isLoadingR ? "loading" : ""
                }`}
                onClick={writeAsyncR}
                >
                {!isLoadingR && (
                  <>
                    <WalletIcon className="w-8 h-8 mt-0.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>         
         
    </div>      
  );
};

export default HomeDonate;