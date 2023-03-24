import style from './delete.module.css';

function DeleteBtn({click}) {
  const removeHandler = (event) => {
    event.stopPropagation()
    click()
  }
  return (
    <button onClick={removeHandler} type='button' className={style.content}></button>
  )
};

export default DeleteBtn;