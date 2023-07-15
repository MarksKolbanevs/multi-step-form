import { useContext } from "react";
import "./index.scss";
import { FormContext } from "../../../App";
import Addon from "./components/add-on/Addon";


const addOns: { [key: string]: AddOn } = {
    onlineService:{
        name:"Online service",
        description:"Access to multiplayer games",
        billing:{
            monthly:1,
            yearly:10
        }
    },
    largerStorage:{
        name:"Larger storage",
        description:"Extra 1TB of cloud safe",
        billing:{
            monthly:2,
            yearly:20
        }
    },
    customizableProfile:{
        name:"Customizable Profile",
        description:"Custom theme on your profile",
        billing:{
            monthly:2,
            yearly:20
        }
    },
}

export type AddOn = {
    name:string;
    description:string,
    billing:{
        monthly:number,
        yearly:number
    }
}

export default function ThirdStep(){
    const { addOn ,abbreviatedSubscribePeriod, setAddOn,subscribePeriod } = useContext(FormContext);

    const handlePush = (newAddOn : AddOn) => {
        const name = newAddOn.name;
        if (addOn && addOn[name]) {
          const updatedState = { ...addOn };
          delete updatedState[name];
          setAddOn(updatedState);
        } else {
          const updatedState = { ...addOn, [name]: newAddOn };
          setAddOn(updatedState);
        }

    }

    return(
        <div className="third-step-container">
            {Object.keys(addOns).map((key) => {
              return (
                <Addon 
                abbreviatedSubscribePeriod = {abbreviatedSubscribePeriod} 
                onClick = {() => handlePush(addOns[key])} 
                subscribePeriod = {subscribePeriod} 
                addon={addOns[key]}/>
              );
            })}
        </div>
    );
}