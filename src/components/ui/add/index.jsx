import style from './add.module.css';

function AddBtn({addProducts}) {

  const addHandler = (event) => {
    event.stopPropagation();
    addProducts()
  }
  return (
    <button  onClick={addHandler} type='button' className={style.content}></button>
  )
};

export default AddBtn;