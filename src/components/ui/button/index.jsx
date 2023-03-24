import style from './button.module.css';

function Button({text, modification, click}) {
  return (
    <button type='submit' style={modification} onClick={click} className={style.content}>{text}</button>
  )
};

export default Button;