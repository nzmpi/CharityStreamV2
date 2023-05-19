import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";

const HomeLatestInfo = ({contractAddress}: {contractAddress: any}) => { 
  const [latestCampaign, setLatestCampaign] = useState("0");
  const [latestProposition, setLatestProposition] = useState<string[]>(["0","0"]);

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

  const { data: fee} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "fee",
  });

  const { data: numStreams} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getNumberOfStreams",
  });

  const { data: streamedAmount} = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "streamedAmount",
  });

  useEffect(() => {    
  }, [fee]);

  useEffect(() => {
    if (latestIdCampaign === undefined) return;
    setLatestCampaign(latestIdCampaign.sub(BigNumber.from(1)).toString());         
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
          {getEndTime(latestCampaignData?.endTime || -1)}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {latestCampaignData?.amountGoal ? ethers.utils.formatEther(latestCampaignData?.amountGoal.toString()) + " Ξ" : "-"}
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
          getDuration(latestPropositionData?.paymentDuration || -1)
          }
          </span>
        </div>
        </form>
        </div>

        <div className={"mx-auto mt-10"}>
        <form className="md:w-[330px] w-[330px] lg:w-[330px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">      
          <span className="p-2 text-lg font-bold"> Fee: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {fee ? fee/10 : "0"} %
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Contract Address:</span>
          <Address address={contractAddress} /> 

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Campaigns created: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {latestCampaign}
          </span>  

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Streams created: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {numStreams?.toString() || "0"}
          </span>  

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Streamed amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {streamedAmount ? ethers.utils.formatEther(streamedAmount.toString()) : "0"} Ξ
          </span>

        </div>
        </form>
        </div>
        
      </div>
  );
};

export default HomeLatestInfo;