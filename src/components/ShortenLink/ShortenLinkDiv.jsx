import { useState } from 'react';
import './ShortenLink.scss';

export function ShortenLinkDiv(props) {
    const [changeCopyButton, setChangeCopyButton] = useState('Copy');

    function CopyValue() {
        let content = document.getElementById('linkS');      
        
        content.select();
        content.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(content.value);

        setChangeCopyButton('Copied');

        setTimeout(ChangeStateCopyButton, 3000);
    }

    function ChangeStateCopyButton() {
        setChangeCopyButton('Copy');
    }

    return(
        <div className="ShortenLink">
            <p className="bigLink">{props.takeLinkInput}</p>

            <div className="linkButton">
                <input id="linkS" type="text" value={props.shortenLink}  disabled/>

                {
                    changeCopyButton == 'Copy' 
                    ? <button onClick={CopyValue} className="copy">Copy</button>
                    : <button onClick={CopyValue} className="copy copied">Copied!</button>
                }
            </div>
        </div>
    );
}