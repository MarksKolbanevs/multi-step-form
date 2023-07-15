import { useContext, useState } from "react";
import PlanCard from "./components/PlanCard";
import "./index.scss";
import { FormContext } from "../../../App";



export type Plan = {
    name:string;
    billing:{
        monthly:number,
        yearly:number
    }
    imgPath:string
}

const plans: { [key: string]: Plan } = {
    arcade:{
        name:"Arcade",
        billing:{
            monthly:9,
            yearly:90
        },
        imgPath:"./images/icon-arcade.svg"
    },
    advanced:{
        name:"Advanced",
        billing:{
            monthly:12,
            yearly:120
        },
        imgPath:"./images/icon-advanced.svg"
    },
    pro:{
        name:"Pro",
        billing:{
            monthly:15,
            yearly:150
        },
        imgPath:"./images/icon-pro.svg"
    },
}

export default function SecondStep(){
    const { subscribePeriod,abbreviatedSubscribePeriod,setPlan,setSubscribePeriod,setAbbreviatedSubscribePeriod } = useContext(FormContext);

    const toggleSwitchPlanSubscribe = () =>{
        if(subscribePeriod === "monthly"){
            setSubscribePeriod("yearly");
            setAbbreviatedSubscribePeriod("yr")
            return;
        }else{
            setSubscribePeriod("monthly");
            setAbbreviatedSubscribePeriod("mo")
            return;
        }
    }

    return(
        <div className="second-step-container">
           <div className="select-plan-container">
            <PlanCard abbreviatedSubscribePeriod = {abbreviatedSubscribePeriod} subscribePeriod = {subscribePeriod} plan = {plans["arcade"]} onClick={() => setPlan(plans["arcade"])}/>
            <PlanCard abbreviatedSubscribePeriod = {abbreviatedSubscribePeriod} subscribePeriod = {subscribePeriod} plan = {plans["advanced"]} onClick={() => setPlan(plans["advanced"])}/>
            <PlanCard abbreviatedSubscribePeriod = {abbreviatedSubscribePeriod} subscribePeriod = {subscribePeriod} plan = {plans["pro"]} onClick={() => setPlan(plans["pro"])}/>
            </div>
            <div className="monthly-yearly-switcher-container">
                <h2 className={!subscribePeriod.includes('monthly') ? "grey-text" : ""}>Monthly</h2>
                <label className="switch">
                <input type="checkbox" onClick={toggleSwitchPlanSubscribe} checked={subscribePeriod.includes('monthly') ? false : true}/>
                <span className="slider"/>
                </label>
                <h2 className={!subscribePeriod.includes('yearly') ? "grey-text" : ""}>Yearly</h2>
            </div>
        </div>
    );
}