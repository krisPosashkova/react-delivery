import style from './popUp.module.css';
import { Link } from "react-router-dom";
import { useAuth } from '../../../authContextProvider';

function PopUp({text, response, textBtn, handlerClose } ) {
  const { isLogin } = useAuth();
  return (
    <div className={style.overlay}>
      <div className={style.box}>
        <button onClick={handlerClose} className={style.close}></button>
        <p>{response}</p>
        <p className={style.text}>{text}</p>
        <Link to={isLogin  ? '/products' : ''}><span onClick={handlerClose} className={style.link}>{textBtn}</span></Link>
      </div>
    </div>
  )
}

export default PopUp;
