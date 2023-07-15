import { useContext, useEffect, useState } from "react";
import "./index.scss";
import { FormContext } from "../../../App";

export default function FourthStep(){
    const { addOn,plan,subscribePeriod,abbreviatedSubscribePeriod,personalInfo } = useContext(FormContext);

    const [sum,setSum] = useState(0);
    
    useEffect(() => {
        let newSum = 0;

        newSum = plan?.billing[subscribePeriod] ?? 0;

        for (const key in addOn) {
            newSum += addOn[key].billing[subscribePeriod];
        }

        setSum(newSum);
    },[plan,addOn]);

    return(
        <div className="fourth-step-container">
            <div className="info-container">
                <div className="subscription-info-container">
                    <div className="subscription-name">
                        <h1>{plan?.name ? plan.name : "Not selected"}({subscribePeriod})</h1>
                        <a>Change</a>
                    </div>
                    <h1>${plan?.billing[subscribePeriod] ? plan.billing[subscribePeriod] : 0}/{abbreviatedSubscribePeriod}</h1> 
                </div>
                {addOn && Object.keys(addOn).map((key) => (
                  <div className="subinfo-container" key={key}>
                    <p className="grey-text">{addOn[key].name}</p>
                    <p className="price">+${addOn[key].billing[subscribePeriod]}/{abbreviatedSubscribePeriod}</p> 
                  </div>
                ))}
            </div>
            <div className="total-info-container">
                    <p className="grey-text">Total (per month)</p>
                    <h1>+${sum}/{abbreviatedSubscribePeriod}</h1>
            </div>
        </div>
    )
}