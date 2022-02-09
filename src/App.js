import { useEffect, useState, useCallback } from "react";
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
import styled from "styled-components";
import ABI from "./utils/abi.json";
import BSCABI from "./utils/bsc.json";
import "./index.css";

import WalletConnectProvider from '@walletconnect/web3-provider'
import WalletLink from 'walletlink';

import logo from "./assets/oink.jpeg";

import BottomApp from "./BottomApp";


const trimAddress = ( address ) => {
  const firstpart = address.slice(0, 4);
  const midpart = "....";
  const endpart = address.slice(address.length - 4, address.length );
  return `${firstpart}${midpart}${endpart}`
}

const dateConverter = (secs) => {
  var sec_num = parseInt(secs, 10)
  var hours   = Math.floor(sec_num / 3600)
  var minutes = Math.floor(sec_num / 60) % 60
  var seconds = sec_num % 60

  return [hours,minutes,seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":")
}




const contractAddress = "0x12855d8B8eB0FC99a775eFf2c7e3A02005d89c4A";
const addressZero =     "0x0000000000000000000000000000000000000000";

const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

const AppStyles =  styled.div`
.navbar-light{
  background: #5EBEC4 !important;
}
   .display-div {
     height: 400px;
     background: #f3ABB9;
     border-radius:20px;
    .display-divHeading{
      height: 150px;
      background: #c0c0c0;
      border-radius: 20px 20px 0 0;
      padding: 20px;
     .heading-para {
       font-size: 20px;
       font-weight: bold;
       color: #e20b0b;
     }
     .para-small{
       font-size: 15px;
     }
    }
    .para-details{
      font-size: 20px;
      color: #2910f9;
    }
    .para-detailsBig{
      font-size: 20px;
      color: #260b2f;
    }
   }
   .div-price{
     margin: 20px;
   }

   .div-card{
     background: #f3ABB9;
     height: 670px;
     border-radius:20px;
     margin: 30px 0 30px 0;
     
   }

   .div-one{
      height: 170px;
      padding: 20px;
   }

   .div-two{
    background: #c0c0c0;
    height: 140px;
    padding: 20px;
    span{
      float: right;
    }
   }

   .div-three{
     padding: 20px;
   }

   .heading{
     font-size: 18px;
     color: #1205e2;
   }

   .but-margin{
      margin-top: 40px;
      margin-left: 10px;
   }
   .btn-sec{
     margin-top: 65px;
     margin-left: 5px;
   }

   .btn-space{
     margin-left: 5px;
   }
   .im{
     color: purple;
   }

   .price{
     font-size: 20px;
   }

   .time{
     font-size: 20px;
   }

`


const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
  'custom-walletlink': {
    display: {
      logo: 'https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0',
      name: 'Coinbase',
      description: 'Connect to Coinbase Wallet (not Coinbase App)',
    },
    options: {
      appName: 'Coinbase', // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options
      const walletLink = new WalletLink({
        appName,
      })
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
      await provider.enable()
      return provider
    },
  },
}

let web3Modal
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  })
}


function App() {
const bscAddress = "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56";
const url = 'https://bsc-dataseed.binance.org/';
 const customHttpProvider = new ethers.providers.JsonRpcProvider(url);

 //state of the application
 const [ totalSupply, setTotalSupply ] = useState("0.0000");
 const [ circulatingSupply, setCirculatingSupply ] = useState("0.0000");
 const [availableSupply, setAvailableSupply ] = useState("0.0000");
 const [ connectedAddress, setConnectedAddress ] = useState("");
 const [ bscBalance, setBscBalance ] = useState("0.0000");
 const [ ointTokenBalance, setOinktokenBalance ] = useState("0.0000");
 const [signer, setSigner ] = useState(null);

 const [bscApprovedAmount, setBscApprovedAmount ] = useState("0.00");
 const [bscStakeText, setBscStateText ] = useState("0");

 const [myOinkStake, setMyOinkStake ] = useState("0");
 const [totalOinkStake, setTotalOinkStake ] = useState("0")

 const [userBscStaked, setUserBUSDStaked ] = useState("0");
 const [totalBscStaked, setTotalBscStaked ] = useState("0")

 const [tokenPrice, setTokenPrice ] = useState("0");
 const [totalStakedToken, setTotalStakedToken ] = useState("0");

 const [userUnclaimedToken, setUserUnclaimedToken ] = useState("0");
 const [userUnclaimTokenMinting, setUserUnclaimTokenMinting ] = useState("0");

 const [tokenToStake, setTokenToStake ] = useState("0");

 const [totalSoldToday, setTodaySoldToday ] = useState("0");

 const [totalAvailableToSell, setTodayAvailableToSellToday] = useState("0");
 
 const [getTimeToNextDay, setTimeToNextDay] = useState("0");

 const [oinkToSell, setOinkToSell] = useState("0");

 const [contractBUSDBalance, setContractBUSDBalance] = useState("0");

 const [userTokenBalance, setUserTokenBalance] = useState("0");




 const [referralWithdrawn, setReferralWithdraw] = useState("0");
 const [referralTotalBonus, setReferralTotalBonus] = useState("0");
 const [referralBonus, setReferralBonus] = useState("0");


 
const [provider, setProvider] = useState("");
const [web3Provider, setweb3Provider] = useState("");
const [address, setAddress] = useState("");
const [chainId, setChainId] = useState("");



const connect = useCallback(async function () {
  // This is the initial `provider` that is returned when
  // using web3Modal to connect. Can be MetaMask or WalletConnect.
  const provider = await web3Modal.connect();
  // We plug the initial `provider` into ethers.js and get back
  // a Web3Provider. This will add on methods from ethers.js and
  // event listeners such as `.on()` will be different.
  const web3Provider = new providers.Web3Provider(provider);

  const signer = web3Provider.getSigner()
  const address = await signer.getAddress()

  const network = await web3Provider.getNetwork();

  setAddress(address);
  setProvider(provider);
  setweb3Provider(web3Provider);
  setChainId(chainId);
  setSigner(signer);
}, []);



const disconnect = useCallback(
  async function () {
    await web3Modal.clearCachedProvider()
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect()
    }
    //reset the state here
    setAddress("");
    setProvider("");
    setweb3Provider("");
    setChainId("")
  },
  [provider]
)



  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect]);

   // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        // eslint-disable-next-line no-console
        console.log('accountsChanged', accounts);
        setAddress(accounts[0])
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = (_hexChainId) => {
        window.location.reload()
      }

      const handleDisconnect = (error) => {
        // eslint-disable-next-line no-console
        console.log('disconnect', error)
        disconnect()
      }

      provider.on('accountsChanged', handleAccountsChanged)
      provider.on('chainChanged', handleChainChanged)
      provider.on('disconnect', handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])




 async function loadDetails (){
   //const provider = new ethers.providers.JsonRpcProvider(url);
   const contract = new ethers.Contract(contractAddress, ABI, web3Provider );
   const bscContract = new ethers.Contract(bscAddress, BSCABI, web3Provider );
   //get the balance of OINT token

   let [ oinkbalance, bscBalance, total, 
        availableSupply, supply, myOinkStake,
        userBscBal, userBscStaked, userTokenBalance, 
        tokenPrice, totalStakedToken, userUnclaimedToken,
        userUnclaimTokenMinting,
        totalSoldToday,
        totalAvailableToSell,
        getTimeToNextDay,
        contractBUSDBalance,

        referralWithdrawn,
        referralTotalBonus,
        referralBonus
        

         ] = await Promise.all([
    bscContract.balanceOf(address),
    contract.getUserBUSDBalance( address),
    contract.totalSupply(),
    contract.availableSupply(),
    contract.limitSupply(),
    contract.getUserTokenStaked(address),
    contract.getUserBUSDBalance(address),
    contract.getUserBUSDStaked(address),
    contract.getUserTokenBalance(address),
    contract.getTokenPrice(),
    contract.totalTokenStaked(),
    contract.getUserUnclaimedTokens_T(address),
    contract.getUserUnclaimedTokens_M(address),
    contract.getTokenSoldToday(),
    contract.getTokenAvailableToSell(),
    contract.getTimeToNextDay(),
    contract.getContractBUSDBalance(),

    contract.getUserReferralWithdrawn(address),
    contract.getUserReferralTotalBonus(address),
    contract.getUserReferralBonus(address)
  

   ])

  
   //parse the values here
   oinkbalance = parseFloat(ethers.utils.formatEther(oinkbalance)).toFixed(2);
   bscBalance = parseFloat(ethers.utils.formatEther(bscBalance)).toFixed(2);
   total = parseFloat(ethers.utils.formatEther(total)).toFixed(2);
   availableSupply = parseFloat(ethers.utils.formatEther(availableSupply)).toFixed(2);
   supply = parseFloat(ethers.utils.formatEther(supply)).toFixed(2);
   myOinkStake = parseFloat(ethers.utils.formatEther(myOinkStake)).toFixed(2)
   userBscBal = parseFloat(ethers.utils.formatEther(userBscBal)).toFixed(2)
   userBscStaked = parseFloat(ethers.utils.formatEther(userBscStaked)).toFixed(2)
   userTokenBalance = parseFloat(ethers.utils.formatEther(userTokenBalance)).toFixed(2)
   tokenPrice = ethers.utils.formatUnits(tokenPrice, "18");
   totalStakedToken = parseFloat(ethers.utils.formatEther(totalStakedToken)).toFixed(2)
   userUnclaimedToken = parseFloat(ethers.utils.formatEther(userUnclaimedToken)).toFixed(2)
   userUnclaimTokenMinting = parseFloat(ethers.utils.formatEther(userUnclaimTokenMinting)).toFixed(2)
   totalSoldToday = parseFloat(ethers.utils.formatEther(totalSoldToday)).toFixed(2);
   totalAvailableToSell = parseFloat(ethers.utils.formatEther(totalAvailableToSell)).toFixed(2);

    referralWithdrawn = parseFloat(ethers.utils.formatEther(referralWithdrawn)).toFixed(2);
    referralTotalBonus = parseFloat(ethers.utils.formatEther(referralTotalBonus)).toFixed(2);
    referralBonus = parseFloat(ethers.utils.formatEther(referralBonus)).toFixed(2);

   
   getTimeToNextDay = getTimeToNextDay.toString();

   contractBUSDBalance = parseFloat(ethers.utils.formatEther(contractBUSDBalance)).toFixed(2);


   let tokenCorrectedDecimal = parseFloat(tokenPrice);

    setTotalSupply(total);
    setCirculatingSupply(supply);
    setAvailableSupply(availableSupply);
    setBscBalance(bscBalance);
    setOinktokenBalance(oinkbalance);
    setMyOinkStake(myOinkStake)
    setTokenPrice(tokenCorrectedDecimal)
    setTotalStakedToken(totalStakedToken)
    setUserUnclaimedToken(userUnclaimedToken);
    setUserUnclaimTokenMinting(userUnclaimTokenMinting);
    setTodaySoldToday(totalSoldToday)
    setTodayAvailableToSellToday(totalAvailableToSell)
    setTimeToNextDay(getTimeToNextDay)
    setUserTokenBalance(userTokenBalance);
    setUserBUSDStaked(userBscStaked);
    setContractBUSDBalance(contractBUSDBalance);


   setReferralWithdraw(referralWithdrawn);
   setReferralTotalBonus(referralTotalBonus);
   setReferralBonus(referralBonus)



    
 }

 useEffect(()=> {
   if (web3Provider){
    loadDetails();
   }
   
 }, [web3Provider]);

 const claimOinkTokensMinted = async () => {
  const oinkContract = new ethers.Contract(contractAddress, ABI, web3Provider );
  try {
  await oinkContract.connect(signer).claimToken_M();
  alert("Minted token claimed")
  } catch (error) {
    alert(`There was an error : ${error.message}`);
  }
 }

 const claimOinkTokensStaked = async () => {
  const oinkContract = new ethers.Contract(contractAddress, ABI, web3Provider );
  try {
  await oinkContract.connect(signer).claimToken_T();
  alert("Staked token claimed")
  } catch (error) {
    alert(`There was an error : ${error.message}`);
  }
 }

 const approveBSCTokenWithdrawal = async () => {
   const bscContract = new ethers.Contract(bscAddress, BSCABI, web3Provider );
   await bscContract.connect(signer).approve( contractAddress,ethers.utils.parseEther(ointTokenBalance));
   alert(`Approval granted to OINK token to spend funds on behalf of ${address}`);
 }

 const stakeBSCToken = async () => {
  const oinkContract = new ethers.Contract(contractAddress, ABI, web3Provider );
  try {
    await oinkContract.connect(signer).stakeBUSD(addressZero, ethers.utils.parseEther(bscStakeText));
    alert("BSC token staked");
  } catch (error) {
    console.log(error)
    alert(`There was an error please try again. ${error.message}`)
  }
 
 }


 const stakeOinkToken = async () => {
  const oinkContract = new ethers.Contract(contractAddress, ABI, web3Provider );
  try {
    await oinkContract.connect(signer).stakeToken(ethers.utils.parseEther(tokenToStake));
    alert("Oink token staked");
  } catch (error) {
    console.log(error)
    alert(`There was an error please try again. ${error.message}`)
  }
 }

 const unstackedToken = async () => {
  const oinkContract = new ethers.Contract(contractAddress, ABI, web3Provider );
  try {
    await oinkContract.connect(signer).unStakeToken();
    alert("Oink token un staked");
  } catch (error) {
    console.log(error)
    alert(`There was an error please try again. ${error.message}`)
  }
 }

 const sellOinkToken = async ( ) => {
  const oinkContract = new ethers.Contract(contractAddress, ABI, web3Provider );
  try {
    await oinkContract.connect(signer).sellToken(ethers.utils.parseEther(oinkToSell));
    alert("Oink token sold");
  } catch (error) {
    console.log(error)
    alert(`There was an error please try again. ${error.data.message}`)
  }
 }

 const withDrawBonus = async () => {
  try {
    const oinkContract = new ethers.Contract(contractAddress, ABI, web3Provider );
    await oinkContract.connect(signer).withdrawRef();
    alert("Bonus withdrawn")
  } catch (error) {
    alert(`There was an error : ${error.data.message}`)
  }
}

 


  return (
    <AppStyles>
    <div className="container-fluid">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          
          <a className="navbar-brand" href="#">
             <img src={logo} alt="" width="50" height="34" className="im d-inline-block align-text-top"/>
             $OINK NETWORK
          </a>
          <form className="d-flex">
          
             {web3Provider ? (
               <button className="btn btn-danger" type="button" onClick={disconnect}>
                 {trimAddress(address)}
          </button>
        ) : (
          <button className="btn btn-success" type="button" onClick={connect}>
            Connect
          </button>
        )}
          </form>
        </div>
      </nav>

      <div className="row">
       
        <div className="col-md-8 offset-md-2">
            <div className="display-div">
                <div className="display-divHeading">
                     <p className="heading-para">
                        OINK NETWORK STATISTICS
                     </p>

                     <p className="para-small">
                       Stake $BUSD and earn daily staking rewards

                     </p>

                     <p className="para-small">
                        Stake $OINK and earn daily staking rewards
                     </p>
                </div>

                
                    <div className="d-flex align-items-center flex-column div-price">
                    <p className="para-details">$OINK Price</p>
                    <p className="price">{tokenPrice}</p>
              
                  
                </div>

                <div className="row justify-content-center">
                    <div className="col-md-3 offset-md-1">
                          <p className="para-details">Total supply</p>
                          <p className="para-detailsBig">
                          {circulatingSupply}
                          </p>
                    </div>

                    <div className="col-md-4">
                        <p className="para-details">Circulating Supply</p>
                        <p className="para-detailsBig">
                        {totalSupply}
                        </p>
                      </div>

                      <div className="col-md-4">
                         <p className="para-details">Available Supply</p>
                         <p className="para-detailsBig">{availableSupply}</p>
                      </div>
                </div>

            </div>
           
        </div>
   
      </div>

      <div className="row align-items-start">
        <div className="col-md-8 offset-md-2">
           <div className="row">
               <div className="col-md-4">
                   <div className="div-card">
                       <div className="div-one">
                           <p className="heading">MINT $OINK</p>
                            
                           <p>
                              Mint $OINK by staking your $BUSD
                              You can stake as many times as you want
                              You cannot unstake your $BUSD
                           </p>
                       </div>
                       <div className="div-two">
                         <p>APR <span>1460%</span></p>
                         <p>My Stake <span>{userBscStaked } BUSD</span></p>
                         <p>Total Staked <span>{contractBUSDBalance} $BUSD</span></p>
                       </div>
                       <div className="div-three">
                            <p className="heading">$OINK Minted</p>

                            <div className="d-flex justify-content-between">
                               <p className="para-details align-self-center">
                                 {userUnclaimTokenMinting}
                               </p>

                               <p>
                                 <button className="btn btn-primary" 
                                   onClick={claimOinkTokensMinted} type="button">
                                    Claim
                                 </button>
                               </p>
                            </div>

                            <div>
                            
                            <p>Approve & BUSD </p>
                            <div className="input-group mb-3">
                              
                             <input type="text" className="form-control" placeholder="Amount to approve" 
                            aria-label="Amount to approve" aria-describedby="approve" onChange={
                             (e)=>setBscApprovedAmount(e.target.value)
                             }/>
                            <button className="btn btn-primary" type="button" 
                            id="approve" onClick={approveBSCTokenWithdrawal} >Approve</button>
                           </div>
                              
                            </div>


                            <div>
                            <p>No Minimum Amount</p>
                            <div className="input-group mb-3">
                              
                             
                           <div className="input-group">
                              <input type="text" className="form-control" placeholder="Amount to stake" 
                            aria-label="Amount to stake" aria-describedby="approve" type="number" value={bscStakeText}
                            className="form-control" onChange={
                              (e)=>setBscStateText(e.target.value)}/>

                               <button className="btn btn-primary" type="button" onClick={()=>setBscStateText(bscBalance)}>Max</button>
                                
                                <button className="btn btn-success" type="button" onClick={stakeBSCToken} >Stake</button>
                            </div>


                           </div>

                            </div>



                       </div>
                       <p className="text-center">Wallet Balance: {bscBalance} $BUSD </p>
                   </div>
               </div>

               <div className="col-md-4">
               <div className="div-card">
                    <div className="div-one">

                      <p className="heading">STAKE $OINK</p>
                            
                           <p>
                              Stake $OINK to earn more $OINK
                              You can stake as many times as you want
                              You can unstake your $OINK after 7 days
                           </p>
                       </div>


                       <div className="div-two">
                         <p>APR <span>1460%</span></p>
                         <p>My Stake <span>{myOinkStake} OINK</span></p>
                         <p>Total Staked <span>{totalStakedToken} OINK</span></p>
                       </div>
                       <div className="div-three">
                            <p className="float-right">
                              <button className="btn btn-success" onClick={unstackedToken}>
                                   unstaked
                              </button>
                            
                            </p>


                            <p className="heading">$OINK Earned</p>

                            <div className="d-flex justify-content-between">
                               <p className="para-details align-self-center">
                                 {userUnclaimedToken}
                               </p>

                               <p>
                                 <button className="btn btn-primary" 
                                   onClick={claimOinkTokensStaked} type="button">
                                    Claim
                                 </button>
                               </p>
                            </div>

                           


                            <div>
                                <p>No Minimum Amount</p>
                                  
                             
                           <div className="input-group">
                             
                               <input type="text" type="number" value={tokenToStake}
                                   className="form-control" onChange={
                                     (e)=>setTokenToStake(e.target.value)
                                   }/>

                               <button className="btn btn-primary" type="button" onClick={()=>setTokenToStake(bscBalance)} type="button">
                                    MAX</button>
                                
                                <button className="btn btn-success" type="button"  onClick={stakeOinkToken} type="button">
                                    STAKE
                                </button>
                            </div>

                            </div>



                       </div>
                       <p className="text-center">Wallet Balance: {userTokenBalance} $OINK </p>
                   </div>
                </div>



                <div className="col-md-4">
                <div className="div-card">
                       <div className="div-one">

                           <p className="heading">SELL $OINK</p>
                            
                           <p>
                             Sell the earned tokens
                             Only 40000 tokens can be sold per day
                             Earn $BUSD
                           </p>
                       </div>
                       



                       <div className="div-two">
                         <p>Sold Today <span>{totalSoldToday}</span></p>
                         <p>Available Today <span>{totalAvailableToSell}</span></p>
                         <p>Reset in <span className="time">{dateConverter(getTimeToNextDay)}</span></p>
                       </div>
                       <div className="div-three">
                           
                           <div className="text-center">
                              <p>$OINK PRICE</p>

                              <p> {tokenPrice} $BUSD</p>
                           </div>
                           
                          
                          <p>You will get</p>
                                   
                            <div className="input-group">
                             
                                 <input type="text" type="number" value={oinkToSell}
                                   className="form-control" onChange={
                                     (e)=>setOinkToSell(e.target.value)
                                   }/>

                                
                              <button className="btn btn-success" 
                                   onClick={sellOinkToken} type="button">
                                    SELL
                                 </button>
                            </div>



                       </div>
                       <p className="text-center">Wallet Balance: {userTokenBalance} $OINK </p>
                   </div>
                </div>

              

           </div>
      </div>
    </div>

    <div className="row align-items-start">
        <div className="col-md-8 offset-md-2">
           <div className="row">

             <BottomApp address={address} 
             referralWithdrawn={referralWithdrawn} 
             referralTotalBonus={referralTotalBonus}
             referralBonus={referralBonus}
             withDrawBonus={withDrawBonus}
           />
         </div>
      </div>
      </div>



    </div>
    </AppStyles>
  );
}

export default App;
