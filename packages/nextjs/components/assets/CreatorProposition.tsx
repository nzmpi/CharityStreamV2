import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import {
  MegaphoneIcon, 
  ArchiveBoxArrowDownIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { EtherInput } from "~~/components/scaffold-eth/Input/EtherInput";

export const CreatorProposition = () => {
  const [timeUnit, setTimeUnit] = useState('Seconds');
  const [timeUnitVote, setTimeUnitVote] = useState('Seconds');
  const [idCampaign, setIdCampaign] = useState<BigNumber>(BigNumber.from(0));
  const [idProposition, setIdProposition] = useState<BigNumber>(BigNumber.from(0));
  const [idStream, setIdStream] = useState<BigNumber>(BigNumber.from(0));
  const [description, setDescription] = useState("");
  const [paymentDuration, setPaymentDuration] = useState(0);
  const [voteDuration, setVoteDuration] = useState(0);
  const [amountString, setAmountString] = useState("");
  const [amount, setAmount] = useState<BigNumber>(BigNumber.from(0));

  const handlePaymentDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value;
    if (e.target.value === '') {
      setVoteDuration(0);
      return;
    } else if (e.target.type === "number") {
      value = parseInt(e.target.value, 10);
    } else {
      setVoteDuration(0);
      return;
    }

    if (timeUnit === 'Minutes') {
      value = value*60;
    } else if (timeUnit === 'Hours') {
      value = value*3600;
    } else if (timeUnit === 'Days') {
      value = value*86400;
    }
    setPaymentDuration(value);
  };

  const handleVoteDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value;
    if (e.target.value === '') {
      setVoteDuration(0);
      return;
    } else if (e.target.type === "number") {
      value = parseInt(e.target.value, 10);
    } else {
      setVoteDuration(0);
      return;
    }
    
    if (timeUnitVote === 'Minutes') {
      value = value*60;
    } else if (timeUnitVote === 'Hours') {
      value = value*3600;
    } else if (timeUnitVote === 'Days') {
      value = value*86400;
    }
    setVoteDuration(value);
  };

  const handleTimeUnitChange = (e: string) => {
    setTimeUnit(e);
  };

  const handleTimeUnitVoteChange = (e: string) => {
    setTimeUnitVote(e);
  };

  const { writeAsync: writeAsyncP, isLoading: isLoadingP} = useScaffoldContractWrite({
    contractName: "CharityStream",
    functionName: "newProposition",
    args: [idCampaign, description, amount, paymentDuration, voteDuration],
  });

  const { writeAsync: writeAsyncE, isLoading: isLoadingE} = useScaffoldContractWrite({
    contractName: "CharityStream",
    functionName: "endProposition",
    args: [idCampaign, idProposition],
  });

  const { writeAsync: writeAsyncW, isLoading: isLoadingW } = useScaffoldContractWrite({
    contractName: "CharityStream",
    functionName: "withdrawFunds",
    args: [idStream],
  });

  return (    
    <div className="flex flex-col items-left mx-5 sm:mx-10 2xl:mx-20">  

        <div className={`mt-2 flex gap-2 max-w-2xl`}>
        <div className="flex flex-col mt-8 px-7 py-8 bg-base-200 opacity-80 rounded-3xl shadow-lg border-2 border-primary">
          <span className="text-2xl sm:text-4xl text-black">Create Proposition </span>
          
            <div className="form-control mb-3">
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
                <span className="label-text font-bold">Description of your Proposition </span>
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
                <span className="label-text font-bold">Amount of ETH for this Proposition </span>
              </label>

              <EtherInput
              placeholder="0.0"
              value={amountString}
              onChange={value => {
                if (value === '') {
                  setAmount(ethers.utils.parseEther('0'))
                } else {
                  setAmount(ethers.utils.parseEther(value))
                  setAmountString(value)
                }
              }}
              />
            </div>

        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text font-bold">Duration of Payment </span>
          </label>
              
          <div className="input-group">
            <input
              type="number"
              onChange={handlePaymentDurationChange}
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
          <div className="form-control mb-3">
          <label className="label">
            <span className="label-text font-bold">Duration of Voting </span>
          </label>
              
          <div className="input-group">
            <input
              type="number"
              onChange={handleVoteDurationChange}
              placeholder={timeUnitVote}
              className="input input-bordered input-accent bg-transparent"
            />

            <select
              value={timeUnitVote}
              onChange={e => handleTimeUnitVoteChange(e.target.value)}
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
          isLoadingP ? "loading" : ""
          }`}
            onClick={ writeAsyncP }
          >
          {!isLoadingP&& (
            <>
            <MegaphoneIcon className="w-8 h-8 mt-0.5" />
            </>
          )}
          </button>
          </div>
        </div>
        </div>

        <div className={`mt-2 flex gap-2 max-w-2xl`}>
          <div className="flex flex-col mt-8 px-7 py-8 bg-base-200 opacity-80 rounded-3xl shadow-lg border-2 border-primary">
            <span className="text-2xl sm:text-4xl text-black">End Proposition </span>

            <div className="form-control mb-3">
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
                className="input input-bordered input-accent bg-transparent"
              />
            </div>
            <div className="form-control mb-3">
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
                className="input input-bordered input-accent bg-transparent"
              />
            </div>

            <div className="mt-8 justify-center items-center flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
              <button
                className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                isLoadingE ? "loading" : ""
                }`}
                  onClick={writeAsyncE}
              >
                {!isLoadingE&& (
                  <>
                    <ArchiveBoxArrowDownIcon className="w-8 h-8 mt-0.5" />
                  </>
                )}
              </button>
              </div>
          </div>
        </div>

        <div className={`mt-2 flex gap-2 max-w-2xl`}>
          <div className="flex flex-col mt-8 px-7 py-8 bg-base-200 opacity-80 rounded-3xl shadow-lg border-2 border-primary">
            <span className="text-2xl sm:text-4xl text-black">Withdraw Stream Funds  </span>

            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
              <input
                type = "number"
                onChange={e => {
                  if (e.target.value === '') {
                    setIdStream(BigNumber.from(0));
                  } else {
                    setIdStream(BigNumber.from(e.target.value))
                  }
                }}
                placeholder="Stream's ID"
                className="input input-bordered input-accent bg-transparent"
              />
              <button
                className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                isLoadingW ? "loading" : ""
                }`}
                  onClick={writeAsyncW}
              >
                {!isLoadingW&& (
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
