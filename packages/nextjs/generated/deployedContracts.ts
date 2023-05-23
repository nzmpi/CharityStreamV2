const contracts = {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        CharityStreamV2: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "AlreadyVoted",
              type: "error",
            },
            {
              inputs: [],
              name: "AmountIsZero",
              type: "error",
            },
            {
              inputs: [],
              name: "CampaignEnded",
              type: "error",
            },
            {
              inputs: [],
              name: "CampaignIsActive",
              type: "error",
            },
            {
              inputs: [],
              name: "CampaignIsNotActive",
              type: "error",
            },
            {
              inputs: [],
              name: "CampaignIsNotFinished",
              type: "error",
            },
            {
              inputs: [],
              name: "DurationIsZero",
              type: "error",
            },
            {
              inputs: [],
              name: "FeeTooHigh",
              type: "error",
            },
            {
              inputs: [],
              name: "NoRefund",
              type: "error",
            },
            {
              inputs: [],
              name: "NoWithdraw",
              type: "error",
            },
            {
              inputs: [],
              name: "NotBacker",
              type: "error",
            },
            {
              inputs: [],
              name: "NotEnoughFunds",
              type: "error",
            },
            {
              inputs: [],
              name: "NotOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "NotReceiver",
              type: "error",
            },
            {
              inputs: [],
              name: "PropositionIsNotActive",
              type: "error",
            },
            {
              inputs: [],
              name: "VotingEnded",
              type: "error",
            },
            {
              inputs: [],
              name: "VotingIsActive",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "acceptOwnershipEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "endTime",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "amount",
                  type: "uint128",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
              ],
              name: "campaignCreatedEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idStream",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "flow",
                  type: "uint128",
                },
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "funds",
                  type: "uint128",
                },
              ],
              name: "createStreamEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "backer",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "donationEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "finishCampaignEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "idStream",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "payment",
                  type: "uint128",
                },
              ],
              name: "fundsWithrawnEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "oldFee",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "newFeeEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idProposition",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "paymentDuration",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "voteEndTime",
                  type: "uint32",
                },
              ],
              name: "newPropositionEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idProposition",
                  type: "uint256",
                },
              ],
              name: "propositionIsApprovedEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idProposition",
                  type: "uint256",
                },
              ],
              name: "propositionIsNotApprovedEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idProposition",
                  type: "uint256",
                },
              ],
              name: "quorumIsNotMetEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "backer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "refundEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
              ],
              name: "stopAndRefundCampaignEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "oldOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnershipEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "voter",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idProposition",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "decision",
                  type: "bool",
                },
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "votePower",
                  type: "uint128",
                },
              ],
              name: "voteEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "withdrawEvent",
              type: "event",
            },
            {
              inputs: [],
              name: "acceptOwnership",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_name",
                  type: "string",
                },
                {
                  internalType: "uint128",
                  name: "_amount",
                  type: "uint128",
                },
                {
                  internalType: "uint256",
                  name: "_duration",
                  type: "uint256",
                },
              ],
              name: "createCampaign",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
              ],
              name: "donate",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_idProposition",
                  type: "uint256",
                },
              ],
              name: "endProposition",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "fee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
              ],
              name: "finishCampaign",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_backer",
                  type: "address",
                },
              ],
              name: "getBackedCampaigns",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getCampaigns",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum ICharityStreamV2.Status",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint32",
                      name: "endTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint64",
                      name: "quorum",
                      type: "uint64",
                    },
                    {
                      internalType: "address",
                      name: "creator",
                      type: "address",
                    },
                    {
                      internalType: "uint128",
                      name: "amountGoal",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountReceived",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountLeft",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "idProposition",
                      type: "uint128",
                    },
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                  ],
                  internalType: "struct ICharityStreamV2.Campaign[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getLatestProposition",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint128",
                      name: "idCampaign",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "idProposition",
                      type: "uint128",
                    },
                  ],
                  internalType: "struct ICharityStreamV2.LatestProposition",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_idProposition",
                  type: "uint256",
                },
              ],
              name: "getProposition",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum ICharityStreamV2.Status",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint32",
                      name: "paymentDuration",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "voteEndTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "numberOfVoters",
                      type: "uint32",
                    },
                    {
                      internalType: "uint128",
                      name: "amount",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "ayes",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "nays",
                      type: "uint128",
                    },
                    {
                      internalType: "string",
                      name: "description",
                      type: "string",
                    },
                  ],
                  internalType: "struct ICharityStreamV2.Proposition",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_addr",
                  type: "address",
                },
              ],
              name: "getRefunds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getStreams",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint32",
                      name: "startTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "endTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "lastWithdrawTime",
                      type: "uint32",
                    },
                    {
                      internalType: "address",
                      name: "receiver",
                      type: "address",
                    },
                    {
                      internalType: "uint128",
                      name: "flow",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "leftAmount",
                      type: "uint128",
                    },
                  ],
                  internalType: "struct ICharityStreamV2.Stream[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "idCampaign",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_description",
                  type: "string",
                },
                {
                  internalType: "uint128",
                  name: "_amount",
                  type: "uint128",
                },
                {
                  internalType: "uint32",
                  name: "_paymentDuration",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "_voteDuration",
                  type: "uint32",
                },
              ],
              name: "newProposition",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_newFee",
                  type: "uint256",
                },
              ],
              name: "setFee",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
              ],
              name: "stopAndRefundCampaign",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "streamedAmount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_idProposition",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "_decision",
                  type: "bool",
                },
              ],
              name: "vote",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawFee",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "idStream",
                  type: "uint256",
                },
              ],
              name: "withdrawFunds",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawRefunds",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  11155111: [
    {
      name: "sepolia",
      chainId: "11155111",
      contracts: {
        CharityStreamV2: {
          address: "0x4f083147879d43c3b12853dcb806892B88C29880",
          abi: [
            {
              inputs: [],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "AlreadyVoted",
              type: "error",
            },
            {
              inputs: [],
              name: "AmountIsZero",
              type: "error",
            },
            {
              inputs: [],
              name: "CampaignEnded",
              type: "error",
            },
            {
              inputs: [],
              name: "CampaignIsActive",
              type: "error",
            },
            {
              inputs: [],
              name: "CampaignIsNotActive",
              type: "error",
            },
            {
              inputs: [],
              name: "CampaignIsNotFinished",
              type: "error",
            },
            {
              inputs: [],
              name: "DurationIsZero",
              type: "error",
            },
            {
              inputs: [],
              name: "FeeTooHigh",
              type: "error",
            },
            {
              inputs: [],
              name: "NoRefund",
              type: "error",
            },
            {
              inputs: [],
              name: "NoWithdraw",
              type: "error",
            },
            {
              inputs: [],
              name: "NotBacker",
              type: "error",
            },
            {
              inputs: [],
              name: "NotEnoughFunds",
              type: "error",
            },
            {
              inputs: [],
              name: "NotOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "NotReceiver",
              type: "error",
            },
            {
              inputs: [],
              name: "PropositionIsNotActive",
              type: "error",
            },
            {
              inputs: [],
              name: "VotingEnded",
              type: "error",
            },
            {
              inputs: [],
              name: "VotingIsActive",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "acceptOwnershipEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "endTime",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "amount",
                  type: "uint128",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
              ],
              name: "campaignCreatedEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idStream",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "flow",
                  type: "uint128",
                },
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "funds",
                  type: "uint128",
                },
              ],
              name: "createStreamEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "backer",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "donationEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "finishCampaignEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "receiver",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "idStream",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "payment",
                  type: "uint128",
                },
              ],
              name: "fundsWithrawnEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "oldFee",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "newFeeEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idProposition",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "description",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "paymentDuration",
                  type: "uint32",
                },
                {
                  indexed: false,
                  internalType: "uint32",
                  name: "voteEndTime",
                  type: "uint32",
                },
              ],
              name: "newPropositionEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idProposition",
                  type: "uint256",
                },
              ],
              name: "propositionIsApprovedEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idProposition",
                  type: "uint256",
                },
              ],
              name: "propositionIsNotApprovedEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idProposition",
                  type: "uint256",
                },
              ],
              name: "quorumIsNotMetEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "backer",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "refundEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "creator",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
              ],
              name: "stopAndRefundCampaignEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "oldOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnershipEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "voter",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idCampaign",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "idProposition",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "decision",
                  type: "bool",
                },
                {
                  indexed: false,
                  internalType: "uint128",
                  name: "votePower",
                  type: "uint128",
                },
              ],
              name: "voteEvent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "withdrawEvent",
              type: "event",
            },
            {
              inputs: [],
              name: "acceptOwnership",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_name",
                  type: "string",
                },
                {
                  internalType: "uint128",
                  name: "_amount",
                  type: "uint128",
                },
                {
                  internalType: "uint256",
                  name: "_duration",
                  type: "uint256",
                },
              ],
              name: "createCampaign",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
              ],
              name: "donate",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_idProposition",
                  type: "uint256",
                },
              ],
              name: "endProposition",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "fee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
              ],
              name: "finishCampaign",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_backer",
                  type: "address",
                },
              ],
              name: "getBackedCampaigns",
              outputs: [
                {
                  internalType: "uint256[]",
                  name: "",
                  type: "uint256[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getCampaigns",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum ICharityStreamV2.Status",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint32",
                      name: "endTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint64",
                      name: "quorum",
                      type: "uint64",
                    },
                    {
                      internalType: "address",
                      name: "creator",
                      type: "address",
                    },
                    {
                      internalType: "uint128",
                      name: "amountGoal",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountReceived",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "amountLeft",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "idProposition",
                      type: "uint128",
                    },
                    {
                      internalType: "string",
                      name: "name",
                      type: "string",
                    },
                  ],
                  internalType: "struct ICharityStreamV2.Campaign[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getLatestProposition",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint128",
                      name: "idCampaign",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "idProposition",
                      type: "uint128",
                    },
                  ],
                  internalType: "struct ICharityStreamV2.LatestProposition",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_idProposition",
                  type: "uint256",
                },
              ],
              name: "getProposition",
              outputs: [
                {
                  components: [
                    {
                      internalType: "enum ICharityStreamV2.Status",
                      name: "status",
                      type: "uint8",
                    },
                    {
                      internalType: "uint32",
                      name: "paymentDuration",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "voteEndTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "numberOfVoters",
                      type: "uint32",
                    },
                    {
                      internalType: "uint128",
                      name: "amount",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "ayes",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "nays",
                      type: "uint128",
                    },
                    {
                      internalType: "string",
                      name: "description",
                      type: "string",
                    },
                  ],
                  internalType: "struct ICharityStreamV2.Proposition",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_addr",
                  type: "address",
                },
              ],
              name: "getRefunds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getStreams",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint32",
                      name: "startTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "endTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "lastWithdrawTime",
                      type: "uint32",
                    },
                    {
                      internalType: "address",
                      name: "receiver",
                      type: "address",
                    },
                    {
                      internalType: "uint128",
                      name: "flow",
                      type: "uint128",
                    },
                    {
                      internalType: "uint128",
                      name: "leftAmount",
                      type: "uint128",
                    },
                  ],
                  internalType: "struct ICharityStreamV2.Stream[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "idCampaign",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_description",
                  type: "string",
                },
                {
                  internalType: "uint128",
                  name: "_amount",
                  type: "uint128",
                },
                {
                  internalType: "uint32",
                  name: "_paymentDuration",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "_voteDuration",
                  type: "uint32",
                },
              ],
              name: "newProposition",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_newFee",
                  type: "uint256",
                },
              ],
              name: "setFee",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
              ],
              name: "stopAndRefundCampaign",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "streamedAmount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_idCampaign",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_idProposition",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "_decision",
                  type: "bool",
                },
              ],
              name: "vote",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawFee",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "idStream",
                  type: "uint256",
                },
              ],
              name: "withdrawFunds",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawRefunds",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
