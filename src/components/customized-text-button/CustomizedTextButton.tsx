import "./index.scss";

export default function CustomizedTextButton(props:{text:string, onClick:() => void}){
    return(
        <button type="button" className="customized-text-button" onClick={props.onClick}>
            {props.text}
        </button>
    )
}