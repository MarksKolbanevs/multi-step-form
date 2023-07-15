import "./index.scss";

export default function CustomizedInput(props:{label:string, placeholder:string, error?:boolean,onChange?:(event: React.ChangeEvent<HTMLInputElement>) => void,name?:string}){
    return(
        <div className="customised-input">
            <label><p>{props.label}</p> <p className={props.error ? "show-error-message" : "hide-error-message"}>This field is required</p></label>
            <input name = {props.name} placeholder={props.placeholder} className={props.error ? "error" : ""} onChange={props.onChange}/>
        </div>
    )
}