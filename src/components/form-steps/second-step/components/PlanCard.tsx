import { useContext } from "react";
import { Plan } from "../SecondStep";
import "./index.scss";
import { FormContext } from "../../../../App";

export default function PlanCard(props:{plan:Plan,onClick:() => void,subscribePeriod:"monthly" | "yearly", abbreviatedSubscribePeriod:"mo" | "yr"}){
    const {plan} = useContext(FormContext);
    
    return(
        <button type="button" className={props.plan === plan ? "plan-card plan-card-focused" : "plan-card"} onClick={props.onClick}>
            <div className="img-holder">
                <img src={props.plan.imgPath}/>
            </div>
            <div className="description">
                <h3>{props.plan.name}</h3>
                    <p className="grey-text">${props.plan.billing[props.subscribePeriod]}/{props.abbreviatedSubscribePeriod}</p>
            </div>
        </button>
    )
}