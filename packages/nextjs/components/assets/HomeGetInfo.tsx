import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";

const HomeGetInfo = () => { 
  const [idCampaign, setIdCampaign] = useState("0"); 
  const [idCampaignProposition, setIdCampaignProposition] = useState("0");
  const [idProposition, setIdProposition] = useState("0");
  const [idStream, setIdStream] = useState("0"); 
  const [campaignStatus, setCampaignStatus] = useState("");
  const [propositionStatus, setPropositionStatus] = useState("");

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

  const { data: Campaign } = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getCampaign",
    args: [BigNumber.from(idCampaign)],
  });

  const { data: Proposition } = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getProposition",
    args: [BigNumber.from(idCampaignProposition), BigNumber.from(idProposition)],
  });

  const { data: Stream } = useScaffoldContractRead({
    contractName: "CharityStreamV2",
    functionName: "getStream",
    args: [BigNumber.from(idStream)],
  });

  useEffect(() => { 
    if (Campaign?.status === undefined || Campaign?.status === 0) {
      setCampaignStatus("Doesn't exist");
    } else {
      if (Campaign?.status === 1) {
        setCampaignStatus("Active");
      } else if (Campaign?.status === 2) {
        setCampaignStatus("Finished");
      } else if (Campaign?.status === 3) {
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

        <div className={"mx-auto mt-10"}>
        <form className="md:w-[370px] w-[370px] lg:w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">
          <span className="text-3xl text-black">Get Campaign </span>

          <div className="p-2 py-2"> </div>
            <input
                type = "number"
                onChange={e => {
                  if (e.target.value === "") {
                    setIdCampaign("0");
                  } else   
                    setIdCampaign(e.target.value);
                }}
                placeholder="ID"
                className="input input-bordered input-accent bg-transparent"
            />

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Name: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {Campaign?.name || "-"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Status: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {campaignStatus}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Creator: </span>
          <Address address={Campaign?.owner || ethers.constants.AddressZero} />

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Ends: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getEndTime(Campaign?.endTime || -1)}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Goal amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {Campaign?.amountGoal ? ethers.utils.formatEther(Campaign?.amountGoal.toString()) + " Ξ" : "-"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Received amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {Campaign?.amountReceived ? ethers.utils.formatEther(Campaign?.amountReceived.toString()) + " Ξ" : "-"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Left amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {Campaign?.amountLeft ? ethers.utils.formatEther(Campaign?.amountLeft.toString()) + " Ξ" : "-"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Quorum: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {(Campaign?.quorum)?.toString() || "-"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Propositions created: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {(Campaign?.idProposition.sub(BigNumber.from(1)))?.toString() || "-"}
          </span>
        </div>
        </form>
        </div>

        <div className={"mx-auto mt-10"}>
        <form className="md:w-[370px] w-[370px] lg:w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">
          <span className="text-3xl text-black">Get Proposition</span>

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
                className="input input-bordered input-accent bg-transparent"
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
                className="input input-bordered input-accent bg-transparent"
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
          {Proposition?.numberOfVoters || "-"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Voting Ends: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getEndTime(Proposition?.voteEndTime || -1)}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {Proposition?.amount ? ethers.utils.formatEther(Proposition?.amount.toString()) + " Ξ" : "-"}
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

        <div className={"mx-auto mt-10"}>
        <form className="md:w-[370px] w-[370px] lg:w-[370px] bg-base-100 rounded-3xl shadow-xl border-primary border-2 p-2 px-7 py-5">
        <div className="flex-column">
          <span className="text-3xl text-black">Get Stream</span>

          <div className="p-2 py-2"> </div>
            <input
                type = "number"
                onChange={e => {
                  if (e.target.value === "") {
                    setIdStream("0");
                  } else   
                    setIdStream(e.target.value);
                }}
                placeholder="Stream ID"
                className="input input-bordered input-accent bg-transparent"
            />

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Receiver: </span>
          <Address address={Stream?.receiver || ethers.constants.AddressZero} />

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Starts: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getEndTime(Stream?.startTime || -1)}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Ends: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
          {getEndTime(Stream?.endTime || -1)}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Flow: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {Stream?.flow ? ethers.utils.formatEther(Stream?.flow.toString()) + " Ξ/h" : "-"}
          </span>

          <div className="p-2 py-1"> </div>
          <span className="p-2 text-lg font-bold"> Left amount: </span>
          <span className="text-lg text-right min-w-[2rem]"> 
            {Stream?.leftAmount ? ethers.utils.formatEther(Stream?.leftAmount.toString()) + " Ξ" : "-"}
          </span>
        </div>
        </form>
        </div>
        
      </div>
  );
};

export default HomeGetInfo;