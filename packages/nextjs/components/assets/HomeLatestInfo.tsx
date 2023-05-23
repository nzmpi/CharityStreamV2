import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { 
  useScaffoldContractRead, 
  useDeployedContractInfo 
} from "~~/hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";

export const HomeLatestInfo = () => {
  const [idLatestCampaign, setIdLatestCampaign] = useState(0);
  const [idsLatestProposition, setIdsLatestProposition] = useState(["0","0"]);

  let contractAddress;
  const { data: deployedContractData } = useDeployedContractInfo("CharityStreamV2");
  if (deployedContractData) {
    ({ address: contractAddress } = deployedContractData);
  }

  const getTime = (time: number) : string => {
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
  
    return hour + ':' + min + ':' + sec + ' ' + date + ' ' + month + ' ' + year;
  };

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
    if (months !== 0) formattedTime += months + ' months ';
    if (days !== 0) formattedTime += days + ' days ';
    if (hours !== 0) formattedTime += hours + ' hours ';
    if (mins !== 0) formattedTime += mins + ' minutes ';
    if (secs !== 0) formattedTime += secs + ' seconds';
  
    return formattedTime;
  };

  type CampaignTypeShort = {
    endTime: number;
    creator: string;
    amountGoal: string;
    amountReceived: string;
    name: string;
  };

  const getCampaign = (id: number) : CampaignTypeShort => {
    let Campaign : CampaignTypeShort = {
      endTime: -1,
      creator: ethers.constants.AddressZero,
      amountGoal: "-",
      amountReceived: "-",
      name: "-",
    };

    if (Campaigns === undefined || id <= 0 || id > Campaigns.length) return Campaign;
    Campaign.endTime = Campaigns[id - 1].endTime;
    Campaign.creator = Campaigns[id - 1].creator;
    Campaign.amountGoal = ethers.utils.formatEther(Campaigns[id - 1].amountGoal) + " Ξ";
    Campaign.amountReceived = ethers.utils.formatEther(Campaigns[id - 1].amountReceived) + " Ξ";
    Campaign.name = Campaigns[id - 1].name;
    return Campaign;
  }

  const { data: idCampaign} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "idCampaign",
  });

  const { data: Campaigns} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getCampaigns",
  });

  const { data: idLatestProposition} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getLatestProposition",
  });

  const { data: Proposition} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getProposition",
    args: [
      BigNumber.from(idsLatestProposition[0]),
      BigNumber.from(idsLatestProposition[1])
    ],
  });

  const { data: Fee} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "fee",
  });

  const { data: Streams} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getStreams",
  });

  const { data: StreamedAmount} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "streamedAmount",
  });

  useEffect(() => {
    if (idCampaign === undefined) return;
    setIdLatestCampaign(idCampaign.sub(1).toNumber());         
  }, [idCampaign]);

  useEffect(() => {
    if (idLatestProposition === undefined) return;
    const lP = [];
    lP.push(idLatestProposition.idCampaign.toString());
    lP.push(idLatestProposition.idProposition.toString());
    setIdsLatestProposition(lP);         
  }, [idLatestProposition]);

  return (    
      <div className="flex items-center flex-col flex-grow">

        <div className={"mx-auto mt-7"}>
        <form className="md:w-[350px] w-[350px] lg:w-[350px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">
          <span className="text-3xl">Latest Campaign</span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> ID: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {idLatestCampaign === 0 ? "-" : idLatestCampaign}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Name: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getCampaign(idLatestCampaign).name} 
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Creator: </span>
          <Address address={getCampaign(idLatestCampaign).creator} />

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Ends: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getTime(getCampaign(idLatestCampaign).endTime)}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Goal amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {getCampaign(idLatestCampaign).amountGoal}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Received amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {getCampaign(idLatestCampaign).amountReceived}
          </span>
        </div>
        </form>
        </div>

        <div className={"mx-auto mt-7"}>
        <form className="md:w-[350px] w-[350px] lg:w-[350px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">
          <span className="text-3xl">Latest Proposition</span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Campaign ID: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {idsLatestProposition[0] === "0" ? "-" : idsLatestProposition[0]} 
          </span>
    
          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> ID: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {idsLatestProposition[1] === "0" ? "-" : idsLatestProposition[1]}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Description: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {Proposition?.description || "-"} 
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Voting Ends: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          { 
          getTime(Proposition?.voteEndTime || -1)
          }
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {Proposition?.amount ? ethers.utils.formatEther(Proposition?.amount.toString()) + " Ξ" : "-"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Payment Duration: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          { 
          getDuration(Proposition?.paymentDuration || -1)
          }
          </span>
        </div>
        </form>
        </div>

        <div className={"mx-auto mt-7"}>
        <form className="md:w-[330px] w-[330px] lg:w-[330px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">      
          <span className="p-2 text-lg font-bold"> Fee: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {Fee ? Fee.toNumber()/10 : "0"} %
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Contract Address:</span>
          <Address address={contractAddress} /> 

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Campaigns created: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {idLatestCampaign}
          </span>  

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Streams created: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {Streams?.length || "0"}
          </span>  

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Streamed amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {StreamedAmount?.gt(0) ? ethers.utils.formatEther(StreamedAmount.toString()) : "0"} Ξ
          </span>

        </div>
        </form>
        </div>
        
      </div>
  );
};