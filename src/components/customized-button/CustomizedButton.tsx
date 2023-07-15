import "./index.scss";

export default function CustomizedButton(props:{text:string,onClick:() => void}){
    return(
        <button type="button" className="customized-button" onClick={props.onClick}>
            {props.text}
        </button>
    );
}