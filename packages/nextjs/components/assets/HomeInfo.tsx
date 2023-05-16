import { ethers, BigNumber } from "ethers";
import { useState } from "react";
import { 
  useScaffoldContractRead, 
  useScaffoldEventSubscriber 
} from "~~/hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";

export const HomeInfo = () => { 
  const [creator, setCreator] = useState("");
  const [creatorProposition, setCreatorProposition] = useState("");
  const [idCampaign, setIdCampaign] = useState<BigNumber>(BigNumber.from(0)); 
  const [idCampaignCheck, setIdCampaignCheck] = useState<BigNumber>(BigNumber.from(0)); 
  const [idCampaignProposition, setIdCampaignProposition] = useState<BigNumber>(BigNumber.from(0)); 
  const [idProposition, setIdProposition] = useState<BigNumber>(BigNumber.from(0));
  const [idCampaignPropositionCheck, setIdCampaignPropositionCheck] = useState<BigNumber>(BigNumber.from(0));
  const [idPropositionCheck, setIdPropositionCheck] = useState<BigNumber>(BigNumber.from(0));  
  const [endTime, setEndTime] = useState(""); 
  const [endTimeCheck, setEndTimeCheck] = useState("");
  const [voteDuration, setVoteDuration] = useState(""); 
  const [paymentDuration, setPaymentDuration] = useState(""); 
  const [voteDurationCheck, setVoteDurationCheck] = useState(""); 
  const [paymentDurationCheck, setPaymentDurationCheck] = useState(""); 
  const [amount, setAmount] = useState<BigNumber>(BigNumber.from(0)); 
  const [amountProposition, setAmountProposition] = useState<BigNumber>(BigNumber.from(0)); 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [campaignStatus, setCampaignStatus] = useState("");
  const [propositionStatus, setPropositionStatus] = useState("");

  useScaffoldEventSubscriber({
    contractName: "CharityStream",
    eventName: "campaignCreatedEvent",
    listener: (creator, idCampaign, endTime, amount, name) => {
      setCreator(creator);
      setIdCampaign(idCampaign);
      getEndTime(endTime);
      setAmount(amount);
      setName(name);
    },
  });

  useScaffoldEventSubscriber({
    contractName: "CharityStream",
    eventName: "newPropositionEvent",
    listener: (
      creatorProposition, 
      idCampaign, 
      idProposition, 
      description, 
      amountProposition, 
      paymentDuration, 
      voteDuration) => {
      setCreatorProposition(creatorProposition);
      setIdCampaignProposition(idCampaign);
      setIdProposition(idProposition);
      setDescription(description);
      setAmountProposition(amountProposition);
      getPaymentDuration(paymentDuration);
      getVoteDuration(voteDuration);
    },
  });

  const getEndTime = (time: number) => {
    var a = new Date(time * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var formattedTime = hour + ':' + min + ':' + sec + ' ' + date + ' ' + month + ' ' + year ;
    setEndTime(formattedTime);
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

  const getPaymentDuration = (time: number) => {
    var months = Math.floor(time/2592000);
    time %= 2592000;
    var days = Math.floor(time/86400);
    time %= 86400;
    var hours = Math.floor(time/3600);
    time %= 3600;
    var mins = Math.floor(time/60);
    var secs = time%60;
    var formattedTime;
    if (months !== 0) {
      formattedTime = months + ' months ' + days + ' days ' + hours + ' hours ' + mins + ' minutes ' + secs + ' seconds';
    } else if (days !== 0) {
      formattedTime = days + ' days ' + hours + ' hours ' + mins + ' minutes ' + secs + ' seconds';
    } else if (hours !== 0) {
      formattedTime = hours + ' hours ' + mins + ' minutes ' + secs + ' seconds';
    } else if (mins !== 0) {
      formattedTime = mins + ' minutes ' + secs + ' seconds';
    } else {
      formattedTime = secs + ' seconds';
    }
    setPaymentDuration(formattedTime);
  };

  const getPaymentDurationCheck = (time: number) => {
    var months = Math.floor(time/2592000);
    time %= 2592000;
    var days = Math.floor(time/86400);
    time %= 86400;
    var hours = Math.floor(time/3600);
    time %= 3600;
    var mins = Math.floor(time/60);
    var secs = time%60;
    var formattedTime;
    if (months !== 0) {
      formattedTime = months + ' months ' + days + ' days ' + hours + ' hours ' + mins + ' minutes ' + secs + ' seconds';
    } else if (days !== 0) {
      formattedTime = days + ' days ' + hours + ' hours ' + mins + ' minutes ' + secs + ' seconds';
    } else if (hours !== 0) {
      formattedTime = hours + ' hours ' + mins + ' minutes ' + secs + ' seconds';
    } else if (mins !== 0) {
      formattedTime = mins + ' minutes ' + secs + ' seconds';
    } else {
      formattedTime = secs + ' seconds';
    }
    setPaymentDurationCheck(formattedTime);
  };

  const getVoteDuration = (time: number) => {
    var a = new Date(time * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var formattedTime = hour + ':' + min + ':' + sec + ' ' + date + ' ' + month + ' ' + year ;
    setVoteDuration(formattedTime);
  };

  const getVoteDurationCheck = (time: number) => {
    var a = new Date(time * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var formattedTime = hour + ':' + min + ':' + sec + ' ' + date + ' ' + month + ' ' + year ;
    setVoteDurationCheck(formattedTime);
  };

  const { data: Campaign } = useScaffoldContractRead({
    contractName: "CharityStream",
    functionName: "getCampaign",
    args: [idCampaignCheck],
  });

  const { data: Proposition } = useScaffoldContractRead({
    contractName: "CharityStream",
    functionName: "getProposition",
    args: [idCampaignPropositionCheck, idPropositionCheck],
  });

  return (    
      <div className="flex flex-col items-center mx-5 sm:mx-10 2xl:mx-20">

        <div className={`mt-10 px-20 flex gap-2 max-w-2xl`}>
        <div className="flex border-primary border-2 rounded-3xl shadow-lg px-7 py-5 ">
        <div className="flex-column">
          <span className="text-2xl sm:text-3xl text-black">Latest Campaign </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> ID: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {idCampaign?.toString() || "0"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Name: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {name?.toString() || "No name"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Creator: </span>
          <Address address={creator} />
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Ends: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          { endTime?.toString() || "0"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Amount: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
            {amount ? ethers.utils.formatEther(amount?.toString()) : "0.0"} ETH
          </span>
        </div>
        </div>
        </div>

        <div className={`mt-10 px-20 flex gap-2 max-w-2xl`}>
        <div className="flex border-primary border-2 rounded-3xl shadow-lg px-7 py-5 ">
        <div className="flex-column">
          <span className="text-2xl sm:text-3xl text-black">Latest Proposition </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> ID: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {idProposition?.toString() || "0"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Campaign's ID: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {idCampaignProposition?.toString() || "0"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Description: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {description?.toString() || "No description"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Creator: </span>
          <Address address={creatorProposition} />
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Voting Ends: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {voteDuration?.toString() || "0"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Amount: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
            {amountProposition ? ethers.utils.formatEther(amountProposition ?.toString()) : "0.0"} ETH
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Payment Duration: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {paymentDuration?.toString() || "0"}
          </span>
        </div>
        </div>
        </div>

        <div className={`mt-10 px-20 flex gap-2 max-w-2xl`}>
        <div className="flex border-primary border-2 rounded-3xl shadow-lg px-7 py-5 ">
        <div className="flex-column">
          <span className="text-2xl sm:text-3xl text-black">Get Campaign </span>
          <div className="p-2 py-1"> </div>
            <input
                type = "number"
                onChange={e => {
                  if (e.target.value === '') {
                    setIdCampaignCheck(BigNumber.from(-1));
                  } else {
                    setIdCampaignCheck(BigNumber.from(e.target.value));
                  }     
                  if (Campaign?.endTime === undefined) {
                    getEndTimeCheck(0);
                  } else {
                    getEndTimeCheck(Campaign?.endTime);
                  }          
                  if (Campaign?.status === undefined) {
                    setCampaignStatus("");
                  } else if (Campaign?.status === 0) {
                    setCampaignStatus("Doesn't exist");
                  } else if (Campaign?.status === 1) {
                    setCampaignStatus("Active");
                  } else if (Campaign?.status === 2) {
                    setCampaignStatus("Ended");
                  }
                }}
                placeholder="ID"
                className="input input-bordered input-accent bg-transparent"
                />
            <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Name: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {Campaign?.name || "No name"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Status: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {campaignStatus || "Doesn't exist"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Creator: </span>
          <Address address={Campaign?.owner} />
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Ends: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {endTimeCheck || "0"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Goal amount: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
            {Campaign?.amountGoal ? ethers.utils.formatEther(Campaign?.amountGoal.toString()) : "0.0"} ETH
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Received amount: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
            {Campaign?.amountReceived ? ethers.utils.formatEther(Campaign?.amountReceived.toString()) : "0.0"} ETH
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Quorum: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {Campaign?.quorum || "0"}
          </span>
        </div>
        </div>
        </div>

        <div className={`mt-10 px-20 flex gap-2 max-w-2xl`}>
        <div className="flex border-primary border-2 rounded-3xl shadow-lg px-7 py-5 ">
        <div className="flex-column">
          <span className="text-2xl sm:text-3xl text-black">Get Proposition </span>
          <div className="p-2 py-1"> </div>
            <input
                type = "number"
                onChange={e => {
                  if (e.target.value === '') {
                    setIdCampaignPropositionCheck(BigNumber.from(-1));
                  } else {
                    setIdCampaignPropositionCheck(BigNumber.from(e.target.value));
                  }             
                }}
                placeholder="Campaign's ID"
                className="input input-bordered input-accent bg-transparent"
                />
            <div className="p-2 py-1"> </div>
            <input
                type = "number"
                onChange={e => {
                  if (e.target.value === '') {
                    setIdPropositionCheck(BigNumber.from(-1));
                  } else {
                    setIdPropositionCheck(BigNumber.from(e.target.value));
                  }     
                  if (Proposition?.paymentDuration === undefined) {
                    getPaymentDurationCheck(0);
                  } else {
                    getPaymentDurationCheck(Proposition?.paymentDuration);
                  }  
                  if (Proposition?.voteEndTime === undefined) {
                    getVoteDurationCheck(0);
                  } else {
                    getVoteDurationCheck(Proposition?.voteEndTime);
                  }        
                  if (Proposition?.status === undefined) {
                    setPropositionStatus("");
                    
                  } else if (Proposition?.status === 0) {
                    setPropositionStatus("Doesn't exist");
                  } else if (Proposition?.status === 1) {
                    setPropositionStatus("Active");
                  } else if (Proposition?.status === 2) {
                    setPropositionStatus("Ended");
                  }    
                }}
                placeholder="Proposition's ID"
                className="input input-bordered input-accent bg-transparent"
                />
            <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Description: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {Proposition?.description || "No description"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Status: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {propositionStatus || "Doesn't exist"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Number of Voters: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {Proposition?.numberOfVoters || "0"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Voting Ends: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {voteDurationCheck || "0"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Amount: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
            {Proposition?.amount ? ethers.utils.formatEther(Proposition?.amount.toString()) : "0.0"} ETH
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Payment Duration: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {paymentDurationCheck || "0"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Ayes: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {Proposition?.ayes.toString() || "0"}
          </span>
          <div className="p-2 py-1"> </div>

          <span className="p-2 text-lg font-bold"> Nays: </span>
          <span className="p-2 text-lg text-right min-w-[2rem]"> 
          {Proposition?.nays.toString() || "0"}
          </span>
        </div>
        </div>
        </div>
        
      </div>
  );
};

/**/