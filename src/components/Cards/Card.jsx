import './InfoCards.scss';

export function Card(props) {
    return(
        <div className="generalCards" id={props.id}>
            <div className="icon">
                <img src={props.image} alt={props.description} />
            </div>

            <div className="infosTitleCard">
                <strong>{props.title}</strong>

                <p>{props.text}</p>
            </div>
        </div>
    );
}