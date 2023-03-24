import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { removeProductsBasket } from '../../../store/reducers/products';

import style from './cardBasket.module.css';
import DeleteBtn from '../../ui/delete';


function CardBasket ({id, img, title, price }) {
  
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(removeProductsBasket(id))
  }

  const linkProduct = () =>{
    navigation(`/products/${id}`)
    console.log('click')
  } 

  return (
    <div onClick={linkProduct} className={style.content}>
      <div className={style.info}>
        <img className={style.preview} src={img} alt={title} />
        <h2 className={style.heading}>{title}</h2>
      </div>
      <div className={style.wrapper}>
        <p className={style.price}>{price} &#32;₽</p>
        <DeleteBtn click={deleteProduct} />
      </div>
    </div>
  )
};

export default CardBasket;