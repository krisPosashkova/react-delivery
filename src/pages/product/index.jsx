import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import CartBtn from '../../components/ui/cart';
import BackBtn from '../../components/ui/back';
import Button from '../../components/ui/button';

import style from './product.module.css';
import uuid from 'react-uuid';

import {
  getProduct,
  addProductsBasket,
  removeProductsBasket,
  setIsProductInBasket
} from '../../store/reducers/products';

import { useAuth } from '../../authContextProvider';

const Product = () => {

  const { logout } = useAuth();

  const {
    product,
    basketProducts,
    ammountProducts,
    countProduct,
    isProductInBasket } = useSelector(state => state.products);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setIsProductInBasket(+id));
    dispatch(getProduct(+id))

  }, [basketProducts, dispatch, id])

  const addProducts = () => {
    const item = {
      id: +id,
      idx: uuid(),
      img: product.img,
      title: product.title,
      price: product.price,
    }
    dispatch(addProductsBasket(item))
  }

  const deleteProduct = () => {
    dispatch(removeProductsBasket(+id))
  }

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
  }


  const btnModification = {
    padding: '12px 75px',
    border: '1px solid #D58C51',
    background: 'none',
    color: '#D58C51',
  }

  const btnRemoveProduct = {
    border: '1px solid #D58C51',
    background: 'none',
    color: '#D58C51',
    padding: '12px 68px',
  }


  return (
    <main className={style.main}>
      <div className={style.container}>
        <div className={style.header}>
          <Link to={-1}><BackBtn /></Link>
          <div className={style['cart-wrapper']}>
            <div className={style['cart-description']}>
              <p>{countProduct} товара </p>
              <p>на сумму {ammountProducts} ₽</p>
            </div>
            <Link to={'/basket'}><CartBtn /></Link>
            <Button click={handleLogout} modification={btnModification} text='Выйти' />
          </div>
        </div>
        <div className={style['card-wrapper']}>
          <div id={id} key={(product && product.id) || ''} className={style['card-inner']}>
            <div className={style['preview-wrapper']}>
              <img className={style.preview} src={(product && product.img) || ''} alt={product && product.title} />
            </div>
            <div className={style.info}>
              <h1 className={style.title}>{(product && product.title) || ''}</h1>
              <p className={style.description}>{(product && product.fullDescription) || ''}</p>
              <div className={style['bottom-wrapper']}>
                <p className={style.price}>{(product && product.price) || ''} ₽<span className={style.weight}>/ {(product && product.weight) || ''} г.</span></p>
                {!isProductInBasket
                  ? <Button click={addProducts} text='В корзину' />
                  : <Button click={deleteProduct} modification={btnRemoveProduct} text='Удалить' />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Product;