import {useEffect} from "react";
import {sourceHtml,sourceRuntime} from "./_source";
import "./_group.css";
export function Current(){
 useEffect(()=>{new Function(sourceRuntime)();},[]);
 return <div className="premium-current" dangerouslySetInnerHTML={{__html:sourceHtml}}/>;
}
