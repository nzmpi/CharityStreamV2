import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { 
  useScaffoldContractRead, 
  useScaffoldEventSubscriber 
} from "~~/hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";

const HomeInfo = () => { 
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

  const [latestCampaign, setLatestCampaign] = useState("0");
  const [latestProposition, setLatestProposition] = useState<string[]>(["0","0"]);
  const BIG_ONE = BigNumber.from(1);

  useScaffoldEventSubscriber({
    contractName: "CharityStreamV2",
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
    contractName: "CharityStreamV2",
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

  const getPaymentDuration = (time: number) : string => {
    if (time === -1) {
      return "-";
    }
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
    return formattedTime;
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
    contractName: "CharityStreamV2",
    functionName: "getCampaign",
    args: [idCampaignCheck],
  });

  const { data: Proposition } = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getProposition",
    args: [idCampaignPropositionCheck, idPropositionCheck],
  });

  const { data: latestIdCampaign} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "idCampaign",
  });

  const { data: latestCampaignData} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getCampaign",
    args: [BigNumber.from(latestCampaign)],
  });

  const { data: latestIdProposition} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getLatestProposition",
  });

  const { data: latestPropositionData} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getProposition",
    args: [
      BigNumber.from(latestProposition[0]),
      BigNumber.from(latestProposition[1])
    ],
  });

  useEffect(() => {
    if (latestIdCampaign === undefined) return;
    setLatestCampaign(latestIdCampaign.sub(BIG_ONE).toString());         
  }, [latestIdCampaign]);

  useEffect(() => {
    if (latestIdProposition === undefined) return;
    const lP = [];
    lP.push(latestIdProposition.idCampaign.toString());
    lP.push(latestIdProposition.idProposition.toString());
    setLatestProposition(lP);         
  }, [latestIdProposition]);

  return (    
      <div className="flex items-center flex-col flex-grow">

        <div className={"mx-auto mt-10"}>
        <form className="md:w-[350px] w-[350px] lg:w-[350px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">
          <span className="text-3xl text-black">Latest Campaign</span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> ID: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {latestCampaign === "0" ? "-" : latestCampaign}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Name: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {latestCampaignData?.name || "-"} 
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Creator: </span>
          <Address address={latestCampaignData?.owner} />

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Ends: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          { 
          getEndTime(latestCampaignData?.endTime || -1)
          }
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {latestCampaignData?.amountGoal ? ethers.utils.formatEther(latestCampaignData?.amountGoal.toString()) + " ETH" : "-"}
          </span>
        </div>
        </form>
        </div>

        <div className={"mx-auto mt-10"}>
        <form className="md:w-[350px] w-[350px] lg:w-[350px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">
          <span className="text-3xl text-black">Latest Proposition</span>
    
          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> ID: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {latestProposition[1] === "0" ? "-" : latestProposition[1]}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Campaign's ID: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {latestProposition[0] === "0" ? "-" : latestProposition[0]} 
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Description: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {latestPropositionData?.description || "-"} 
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Voting Ends: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          { 
          getEndTime(latestPropositionData?.voteEndTime || -1)
          }
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {latestPropositionData?.amount ? ethers.utils.formatEther(latestPropositionData?.amount.toString()) + " ETH" : "-"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Payment Duration: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          { 
          getPaymentDuration(latestPropositionData?.paymentDuration || -1)
          }
          </span>
        </div>
        </form>
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
          {(Campaign?.quorum)?.toString() || "0"}
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

export default HomeInfo;