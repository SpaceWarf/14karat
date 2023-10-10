import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="NotFound">
      <div className='NotFoundLabel'>
        <i className='exclamation triangle icon'></i>
        <p>404: Not Found</p>
      </div>
      <button className='ui positive button' onClick={() => { navigate('/') }}>Back To Safety</button>
    </div>
  );
}


export default NotFound;
