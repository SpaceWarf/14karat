import './Hacking.scss';
import { Hack } from '../../../state/hack';

interface WarCardProps {
  hack: Hack;
}

function HackCard(props: WarCardProps) {
  return (
    <div className="HackCard ui card attached external">
      <div className="content">
        <div className='header'>
          <p><i className='terminal icon' /> {props.hack.name}</p>
          {props.hack.url && (
            <button className="ui icon button" onClick={() => window.open(props.hack.url, "_blank")}>
              <i className='external alternate icon' />
            </button>
          )}
        </div>
        {props.hack.notes && (
          <div className='Notes'>
            {props.hack.notes}
          </div>
        )}
        {props.hack.embed && (
          <div className='Preview'>
            <div className="EmbedContainer" dangerouslySetInnerHTML={{ __html: props.hack.embed }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default HackCard;
