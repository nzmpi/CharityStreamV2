import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";

export const HomeGetInfo = () => { 
  const [idCampaign, setIdCampaign] = useState(0); 
  const [idCampaignProposition, setIdCampaignProposition] = useState("0");
  const [idProposition, setIdProposition] = useState("0");
  const [idStream, setIdStream] = useState(0); 
  const [campaignStatus, setCampaignStatus] = useState("");
  const [propositionStatus, setPropositionStatus] = useState("");

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

  const isPlular = (x: number) : string => {
    if (x === 1)
      return "";
    else 
      return "s";
  }

  const getDuration = (time: number) : string => {
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
    var formattedTime = "";
    if (months !== 0) formattedTime += months + " month" + isPlular(months) + " ";
    if (days !== 0) formattedTime += days + " day" + isPlular(days) + " ";
    if (hours !== 0) formattedTime += hours + " hour" + isPlular(hours) + " ";
    if (mins !== 0) formattedTime += mins + " minute" + isPlular(mins) + " ";
    if (secs !== 0) formattedTime += secs + " second" + isPlular(secs);
  
    return formattedTime;
  };

  const getEther = (x: BigNumber, d: number) : string => {
    let stringX = ethers.utils.formatEther(x).slice(0, d);
    let newX = ethers.utils.parseEther(stringX);
    return ethers.utils.formatEther(newX);
  }

  type CampaignType = {
    status: number;
    endTime: number;
    quorum: string;
    creator: string;
    amountGoal: string;
    amountReceived: string;
    amountLeft: string;
    idProposition: string;
    name: string;
  };

  const getCampaign = (id: number) : CampaignType => {
    let Campaign : CampaignType = {
      status: 0,
      endTime: -1,
      quorum: "-",
      creator: ethers.constants.AddressZero,
      amountGoal: "-",
      amountReceived: "-",
      amountLeft: "-",
      idProposition: "-",
      name: "-",
    };

    if (Campaigns === undefined || id <= 0 || id > Campaigns.length) return Campaign;
    Campaign.status = Campaigns[id - 1].status;
    Campaign.endTime = Campaigns[id - 1].endTime;
    Campaign.quorum = Campaigns[id - 1].quorum.toString();
    Campaign.creator = Campaigns[id - 1].creator;
    Campaign.amountGoal = getEther(Campaigns[id - 1].amountGoal, 16) + " Ξ";
    Campaign.amountReceived = getEther(Campaigns[id - 1].amountReceived, 12) + " Ξ";
    Campaign.amountLeft = getEther(Campaigns[id - 1].amountLeft, 16) + " Ξ";
    Campaign.idProposition = Campaigns[id - 1].idProposition.sub(1).toString();
    Campaign.name = Campaigns[id - 1].name;
    return Campaign;
  }

  const getProposition = () : string => {
    if (Proposition === undefined) return "-";
    return Proposition.numberOfVoters.toString();
  }

  type StreamType = {
    startTime: number;
    endTime: number;
    lastWithdrawTime: number;
    receiver: string;
    flow: string;
    leftAmount: string;
  };

  const getStream = (id: number) : StreamType => {
    let Stream : StreamType = {
      startTime: -1,
      endTime: -1,
      lastWithdrawTime: -1,
      receiver: ethers.constants.AddressZero,
      flow: "-",
      leftAmount: "-",
    };

    if (Streams === undefined || id <= 0 || id > Streams.length) return Stream;
    Stream.startTime = Streams[id - 1].startTime;
    Stream.endTime = Streams[id - 1].endTime;
    Stream.lastWithdrawTime = Streams[id - 1].lastWithdrawTime;
    Stream.receiver = Streams[id - 1].receiver;
    Stream.flow = ethers.utils.formatEther(Streams[id - 1].flow.mul(3600)) + " Ξ/h";
    Stream.leftAmount = getEther(Streams[id - 1].leftAmount, 16) + " Ξ";
    
    return Stream;
  }

  const { data: Campaigns } = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getCampaigns",
  });

  const { data: Proposition } = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getProposition",
    args: [BigNumber.from(idCampaignProposition), BigNumber.from(idProposition)],
  });

  const { data: Streams } = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getStreams",
  });

  useEffect(() => { 
    if (getCampaign(idCampaign).status === 0) {
      setCampaignStatus("Doesn't exist");
    } else {
      if (getCampaign(idCampaign).status === 1) {
        setCampaignStatus("Active");
      } else if (getCampaign(idCampaign).status === 2) {
        setCampaignStatus("Finished");
      } else if (getCampaign(idCampaign).status === 3) {
        setCampaignStatus("Refunded");
      } else setCampaignStatus("Wrong data"); 
    }
  }, [idCampaign]);

  useEffect(() => { 
    if (Proposition?.status === undefined || Proposition?.status === 0) {
      setPropositionStatus("Doesn't exist");
    } else {
      if (Proposition?.status === 1) {
        setPropositionStatus("Active");
      } else if (Proposition?.status === 2) {
        setPropositionStatus("Finished");
      } else setPropositionStatus("Wrong data"); 
    }
  }, [idCampaignProposition, idProposition]);

  return (    
      <div className="flex items-center flex-col flex-grow">

        <div className={"mx-auto mt-7"}>
        <form className="w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">
          <span className="text-3xl">Get Campaign</span>

          <div className="p-2 py-2"> </div>
            <input
                type = "number"
                onChange={e => {
                  if (e.target.value === "") {
                    setIdCampaign(0);
                  } else   
                    setIdCampaign(parseInt(e.target.value));
                }}
                placeholder="ID"
                className="input input-bordered input-accent bg-transparent flex border-2 border-base-300 focus:outline-none px-4 placeholder-primary placeholder:text-accent/90"
            />

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Name: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getCampaign(idCampaign).name}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Status: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {campaignStatus}
          </span>

          <div className="p-2 py-0"> </div>
          <div className="flex flex-row">
          <span className="p-2 text-lg font-bold"> Creator: </span>
          <Address address={getCampaign(idCampaign).creator} />
          </div>

          <div className="p-2 py-0"> </div>
          <span className="p-2 text-lg font-bold"> Ends: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getTime(getCampaign(idCampaign).endTime)}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Goal amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {getCampaign(idCampaign).amountGoal}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Received amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {getCampaign(idCampaign).amountReceived}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Left amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {getCampaign(idCampaign).amountLeft}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Quorum: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getCampaign(idCampaign).quorum}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Propositions created: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getCampaign(idCampaign).idProposition}
          </span>
        </div>
        </form>
        </div>

        <div className={"mx-auto mt-7"}>
        <form className="w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">
          <span className="text-3xl">Get Proposition</span>

          <div className="p-2 py-2"> </div>
            <input
                type = "number"
                onChange={e => {
                  if (e.target.value === "") {
                    setIdCampaignProposition("0");
                  } else   
                    setIdCampaignProposition(e.target.value);
                }}
                placeholder="Campaign ID"
                className="input input-bordered input-accent bg-transparent flex border-2 border-base-300 focus:outline-none px-4 placeholder-primary placeholder:text-accent/90"
            />
          
          <div className="p-2 py-2"> </div>
            <input
                type = "number"
                onChange={e => {
                  if (e.target.value === "") {
                    setIdProposition("0");
                  } else   
                    setIdProposition(e.target.value);
                }}
                placeholder="Proposition ID"
                className="input input-bordered input-accent bg-transparent flex border-2 border-base-300 focus:outline-none px-4 placeholder-primary placeholder:text-accent/90"
            />

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Status: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {propositionStatus}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Description: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {Proposition?.description || "-"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Number of Voters: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getProposition()}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Voting Ends: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getTime(Proposition?.voteEndTime || -1)}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {Proposition?.amount ? ethers.utils.formatEther(Proposition?.amount) + " Ξ" : "-"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Payment Duration: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getDuration(Proposition?.paymentDuration || -1)}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Ayes: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {Proposition?.ayes.toString() || "-"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Nays: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {Proposition?.nays.toString() || "-"}
          </span>
        </div>
        </form>
        </div>

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
                className="input input-bordered input-accent bg-transparent flex border-2 border-base-300"
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
          {getStream(idStream).leftAmount}
          </span>
        </div>
        </form>
        </div>
        
      </div>
  );
};