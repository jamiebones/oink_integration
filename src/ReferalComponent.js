import React from "react";
import styled from "styled-components";


const ReferalComponentStyles = styled.div`
   .card{
       margin-top: 20px;
   }
   .ref-display{
       font-size: 30px;
       font-weight: bold;
   }

`

const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text);
    alert("copied!")
};

const splitAndAdd = (string) => {
  let splitString = string.split(",");
  let total = +splitString[0] + +splitString[1] + +splitString[2];
  return total;
  
}


const ReferalComponent = ({address, referralWithdrawn, referralTotalBonus, 
                           referralBonus, withDrawBonus, totalReferral}) => {
    return <ReferalComponentStyles>
       <div className="card">
        <div className="row mb-5">
            <div className="col-md-6">
                <p>YOUR REFERAL LINK</p>
                <div className="input-group">
                    <input type="text" readOnly className="form-control" value={`https://oinknetwork.io?ref=${address}`}/>
                    <button type="button" className="btn btn-primary" onClick={()=>copyToClipBoard(`https://oinknetwork.io?ref=${address}`)}
                    
                    >Copy</button>
                </div>
            </div>
        </div>

        <div className="row">
            <div className="col-md-3">
                <p>
                Referral Earned Available
                </p>
                <p className="ref-display">
                    {referralBonus}
                </p>
            </div>

            <div className="col-md-3">
                <p>Total Referral Earned</p>
                <p className="ref-display">
                    {referralTotalBonus}
                </p>
            </div>

            <div className="col-md-3">
                <p>Total Referral Withdrawn</p>
                <p className="ref-display">
                   {referralWithdrawn}
                </p>

                <p>Total Referral </p>
                <p className="ref-display">
                    {splitAndAdd(totalReferral)}
                </p>
            </div>

            <div className="col-md-3">
                <p>
                Earn $BUSD by inviting people to OINK NETWORK.</p>

                <p>You will receive:</p>

                <p>4% from each level 1 referral deposits</p>
                <p>2% from each level 2 referral deposits</p>
                <p>1% from each level 3 referral deposits</p>

                <p>Deposit atleast once to activate Referral Rewards </p>

               
            </div>
            </div>

            <div className="row">
                <div className="col">
                    <button className="form-control btn btn-primary" onClick={withDrawBonus}>
                        Withdraw Referal Bonus
                    </button>
                </div>
            </div>
        </div>
    </ReferalComponentStyles>
}



export default ReferalComponent;