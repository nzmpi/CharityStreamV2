# CharityStream v2

This dApp allows users to create public campaigns and interact with received funds.

Site: https://charitystreamv2.vercel.app

## How to use 

In `Creator` tab you can create campaigns, propositions and withdraw your funds.

#### Campaign

 1. `Create` your campaign by entering your campaign's name, amount of eth you want to receive and a duration of your campaign.
 2. After campaign ends, you need to `Finish` it to be able to spend funds.
 3. You can `Stop` and refund all funds at any time before finishing your campaign.

#### Proposition
 
  1. `Create` your proposition by entering your campaign id, a description of the proposition, amount of eth you want (cannot be more than `Left amount` and is locked)
  and durations of payment and voting.
  2. After voting ends you need to `End` your proposition.
  3. If backers voted for the proposition, the dApp will create a stream.
  4. If backers vote against the proposition or the quorum is not met, the dApp unlocks the funds

#### Stream

  1. Check your streams.
  2. Withdraw available funds.

In `Home` tab you can get some info about a campaign, proposition or stream and can:

  1. Donate to a campaign.
  2. Vote for a proposition (this dApp uses [the quadratic voting](https://en.wikipedia.org/wiki/Quadratic_voting)).
  3. Withdraw available refunds.

## Acknowledgment 

Built with [Scaffold-Eth 2](https://github.com/scaffold-eth/scaffold-eth-2).




