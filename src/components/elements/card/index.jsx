import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  addProductsBasket,
  removeProductsBasket
} from '../../../store/reducers/products';

import style from './card.module.css';
import AddBtn from '../../ui/add';
import DeleteBtn from '../../ui/delete';
import uuid from 'react-uuid';


function Card({ id, img, title, description, price, weight }) {

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const basketProducts = useSelector(state => state.products.basketProducts);

  const addProducts = () => {
    const item = {
      id: id,
      idx: uuid(),
      img: img,
      title: title,
      price: price,
    }
    dispatch(addProductsBasket(item))
  }

  const deleteProduct = () => {
    dispatch(removeProductsBasket(id))
  }

  const linkProduct = () => {
    navigation(`/products/${id}`)
  }

  return (
    <div onClick={linkProduct} className={style.content}>
      <img className={style.preview} src={img} alt={title} />
      <div>
        <h2 className={style.heading}>{title}</h2>
        <p className={style.description}>{description}</p>
      </div>
      <div className={style['bottom-wrapper']}>
        <p className={style.price}>{price} &#32;₽<span className={style.weight}>/&#32;{weight}&#32;г.</span></p>

        {basketProducts.some(item => item.id === id)
          ? <DeleteBtn click={deleteProduct} />
          : <AddBtn addProducts={addProducts} />
        }
      </div>
    </div>
  )
};

export default Card;