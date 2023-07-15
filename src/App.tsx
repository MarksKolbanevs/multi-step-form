import { Dispatch, SetStateAction, createContext, useRef, useState } from "react";
import CustomizedButton from "./components/customized-button/CustomizedButton";
import "./index.scss";
import FirstStep, { PersonalInfo } from "./components/form-steps/first-step/FirstStep";
import SecondStep, { Plan } from "./components/form-steps/second-step/SecondStep";
import ThirdStep, { AddOn } from "./components/form-steps/third-step/ThirdStep";
import FourthStep from "./components/form-steps/fourth-step/FourthStep";
import CustomizedTextButton from "./components/customized-text-button/CustomizedTextButton";


const formsStepsInfo: { [key: number]: { title: string; subTitle: string; asideTitle: string, container: JSX.Element } } = {
  1:{
    title:"Personal info",
    subTitle:"Please provide your name, email address and phone number",
    asideTitle:"YOUR INFO",
    container:<FirstStep/>
  },
  2:{
    title:"Select your plan",
    subTitle:"You have the option of monthly or yearly billing",
    asideTitle:"SELECT PLAN",
    container:<SecondStep/>
  },
  3:{
    title:"Pick add-ons",
    subTitle:"Add-ons help enhance your gaming experience.",
    asideTitle:"ADD-ONS",
    container:<ThirdStep/>,
  },
  4:{
    title:"Finishing up",
    subTitle:"Double-check everything looks OK before confirming.",
    asideTitle:"SUMMARY",
    container:<FourthStep/>
  }
}

interface FormContextData {
  setPersonalInfo:Dispatch<SetStateAction<PersonalInfo | null>>;
  setPlan:Dispatch<SetStateAction<Plan | null>>;
  setAddOn:Dispatch<SetStateAction<{[key: string]: AddOn } | null>>;
  setSubscribePeriod:Dispatch<SetStateAction<"monthly" | "yearly">>;
  setAbbreviatedSubscribePeriod:Dispatch<SetStateAction<"mo" | "yr">>;
  setFormSubmitted:Dispatch<SetStateAction<boolean>>;
  personalInfo:PersonalInfo | null;
  plan:Plan | null;
  addOn: {[key: string]: AddOn } | null;
  subscribePeriod:"monthly" | "yearly";
  abbreviatedSubscribePeriod:"mo" | "yr";
  formSubmitted:boolean
}

// Create a context for your provider
export const FormContext = createContext<FormContextData>({} as FormContextData);

function App() {
  const [currentStep,setCurrentStep] = useState<number>(1);
  const [personalInfo,setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [plan,setPlan] = useState<Plan | null>(null);
  const [addOn, setAddOn] = useState<{ [key: string]: AddOn } | null>(null);
  const [subscribePeriod, setSubscribePeriod] = useState<"monthly" | "yearly">("monthly");
  const [abbreviatedSubscribePeriod, setAbbreviatedSubscribePeriod] = useState<"mo" | "yr">("mo");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const setNextStep = () =>{
    setCurrentStep(currentStep + 1);
  }

  const setPreviousStep = () =>{    
    setCurrentStep(currentStep - 1);
  }

  const checkIfStepIsLast = () => {
    const totalSteps = Object.keys(formsStepsInfo).length;
    const isLastIndex = currentStep === totalSteps;
    return isLastIndex;
  }

  const checkIfStepIsFirst = () => {
    return currentStep === 1;
  }

  const checkIfStepIsNotFistOrLast = () =>{
    const totalSteps = Object.keys(formsStepsInfo).length;
    return currentStep > 1 && currentStep < totalSteps;
  }

  return (
    <FormContext.Provider value = {{personalInfo, plan, addOn,subscribePeriod, abbreviatedSubscribePeriod,formSubmitted, setFormSubmitted, setSubscribePeriod, setPersonalInfo, setPlan, setAddOn, setAbbreviatedSubscribePeriod}}>
    <div className="App">
      <section>
        <aside>
          <ol className="circle-list">
            {Object.keys(formsStepsInfo).map((stepKey) => (
              <li key={stepKey} className={currentStep === parseInt(stepKey) ? "activated" : ""}>
                <h2>STEP {parseInt(stepKey)}</h2>
                <h1>{formsStepsInfo[parseInt(stepKey)].asideTitle}</h1>
              </li>
            ))}
          </ol>
        </aside>
          <div className="steps-container-outer">
            <div className="steps-container-inner">
              {!formSubmitted ?
                <>
                <div className="dad">
                  <header>
                    <h1>{formsStepsInfo[currentStep].title}</h1>
                    <p className="grey-text">{formsStepsInfo[currentStep].subTitle}</p>
                  </header>
                  {formsStepsInfo[currentStep].container}
                </div>
                  {/* For first step only */}
                  {checkIfStepIsFirst() ?
                    <div className="align-button-to-right">
                      <CustomizedButton text="Next step" onClick={() => setNextStep()}/>
                    </div>  
                  :null}

                  {/* For others steps */}
                  {checkIfStepIsNotFistOrLast() ?
                    <div className="align-buttons-between">
                      <CustomizedTextButton text="Go Back" onClick={() => setPreviousStep()}/>
                      <CustomizedButton text="Next step" onClick={() => setNextStep()}/>
                    </div> 
                  :null}

                  {/* For last step only */}
                  {checkIfStepIsLast() ? 
                    <div className="align-buttons-between">
                      <CustomizedTextButton text="Go Back" onClick={() => setPreviousStep()}/>
                      <CustomizedButton text="Confirm" onClick={() => setFormSubmitted(true)}/>
                    </div>
                  : null} 
                </>
              :
              <div className="thank-you-container">
                <div className="thank-you">
                  <img src = "./images/icon-thank-you.svg"/>
                  <p className="grey-text">
                    Thank for confirming your subscription!
                     We hope you have fun using our platform.
                     If you ever need support, please feel free to email us at support@loremgaming.com
                  </p>
                </div>
              </div>
              }
            </div>
        </div>
      </section>
    </div>
    </FormContext.Provider>
  );
}

export default App;

