import { useContext, useEffect, useImperativeHandle } from "react";
import CustomizedInput from "../../customized-input/CustomizedInput";
import "./index.scss";
import { FormContext } from "../../../App";

export type PersonalInfo = {
    name?:string,
    email?:string,
    phone?:string
}

export default function FirstStep(ref:any){
    const { personalInfo,setPersonalInfo } = useContext(FormContext);
      
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        const updatedState = { ...personalInfo, [name]: value };

        // Update the state with the new object
        setPersonalInfo(updatedState);

        console.log(personalInfo);
    }

    return(
        <div className="first-step-container">
            <CustomizedInput label = "Name" name = "name" placeholder="e.g Stephen King" onChange={handleChange}/>
            <CustomizedInput label = "Email adress" name="email" placeholder="e.g stephenking@lorem.com" onChange={handleChange}/>
            <CustomizedInput label = "Phone number" name="phone" placeholder="e.g +1 234 567 890" onChange={handleChange}/>
        </div>
    );
}