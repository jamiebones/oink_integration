import React from "react";
import styled from "styled-components";

import ReferalComponent from "./ReferalComponent";

const BottomAppStyles = styled.div`
    background: #c0c0c0;
    padding: 20px;
  
    .head-para{
       font-size: 40px;
       text-align: center;
       color: purple;
    }

    p{
        padding: 5px;
        font-size: 15px;
    }

    .para-details{
        font-size: 30px;
        color: purple;
    }

    .card{
        padding: 20px;
        background: #EFEFEF;
        border-radius: 10px;
    }


`


const BottomApp = ({address, referralWithdrawn, 
                    referralTotalBonus, referralBonus,
                    withDrawBonus}) => {
    return <BottomAppStyles>
<div className="card">
<p>
  OinK Network Token Address - 0x12855d8b8eb0fc99a775eff2c7e3a02005d89c4a
</p>

<div className="div-terms">
     <p className="head-para">Guide</p>

     <p>
     Stake BUSD and earn Daily Staking Rewards in OINK TOKEN (4% per day).You can claim your $OINK rewards anytime. You cannot unstake your staked BUSD.
(You will earn $OINK tokens as a percentage of BUSD invested irrespective of the $OINK Price.)
Example: If you invest 100 BUSD, you will receive 4 OINK TOKEN daily.
     </p>

     <p>
       You have two options with your $OINK tokens, you can sell them for BUSD, or you can stake them to earn more $OINK tokens (6% per day).
    $OINK staking is locked for 7 days.
     </p>
        
     <p className="text-center para-details">Terminologies</p>
    
     
  <p>Total Supply : The maximum amount of $OINK that can exist</p>
  <p>Circulating Supply : The amount of $OINK tokens that are currently in wallets</p>
  <p>Available Suppy : (Total Supply - Cirulating Supply)</p>
  <p>$OINK Price : (Total BUSD Balance / Available Supply)</p>
  <p>Mint $OINK - As you claim $OINK from minting, it is removed from the Available Supply and added to the Circulating Supply</p>
  <p>Sell $OINK - As you sell $OINK, it is removed from the Circulating Supply and added to the Available Supply</p>
  
     

</div>




</div>
<ReferalComponent address={address} referralWithdrawn={referralWithdrawn} 
  referralTotalBonus={referralTotalBonus} referralBonus={referralBonus} 
  withDrawBonus={withDrawBonus}/>
</BottomAppStyles>
}

export default BottomApp;