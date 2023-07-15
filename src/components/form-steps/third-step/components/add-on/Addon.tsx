import { useContext } from "react";
import { AddOn } from "../../ThirdStep";
import "./index.scss";
import { FormContext } from "../../../../../App";

export default function Addon(props:{addon:AddOn,subscribePeriod:"monthly" | "yearly", onClick:() => void, abbreviatedSubscribePeriod:"mo" | "yr"}){
    const { addOn } = useContext(FormContext);
    return(
        <div className="addon-container">
            <input type="checkbox" onClick = {props.onClick} checked={addOn && addOn[props.addon.name] !== undefined ? true : false}/>
            <div className="description">
                <h1>{props.addon.name}</h1>
                <p className="grey-text">{props.addon.description}</p>
            </div>
            <p className="price">+${props.addon.billing[props.subscribePeriod]}/{props.abbreviatedSubscribePeriod}</p>
        </div>
    )
}