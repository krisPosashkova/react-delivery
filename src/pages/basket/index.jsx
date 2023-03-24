import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { registerOrdering, closePopUp } from '../../store/reducers/products';
import { useAuth } from '../../authContextProvider';

import style from './basket.module.css';
import CardBasket from '../../components/elements/cardBasket';
import BackBtn from '../../components/ui/back';
import Button from '../../components/ui/button';
import PopUp from '../../components/elements/popUp';


const Basket = () => {
  const { logout } = useAuth()

  const { basketProducts, ammountProducts, isShowPopUp } = useSelector(state => state.products);

  const dispatch = useDispatch();

  const handlerClose = () => {
    dispatch(closePopUp())
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

  const handlerRegister = (e) => {
    e.preventDefault()
    dispatch(registerOrdering())
  }


  return (
    <main className={style.main}>

      <div className={style.header}>
        <div className={style['header-wrapper']}>
          <Link to={-1}><BackBtn /></Link>
          <h1 className={style.title}>Корзина с выбранными товарами</h1>
        </div>
        <Button click={handleLogout} modification={btnModification} text='Выйти' />
      </div>
      <div className={style.container}>
        <div className={style['card-wrapper']}>
          <div className={style['card-inner']}>
            {basketProducts.map(item => {
              return (
                <CardBasket
                  id={item.id}
                  key={item.idx}
                  img={item.img}
                  title={item.title}
                  price={item.price}
                />
              )
            })}
          </div>
        </div>
      </div>
      <div className={style.footer}>
        <div className={style.container}>
          <div className={style['footer-wrapper']}>
            <p className={style.ordering}>Заказ на сумму:<span className={style.amount}>{ammountProducts} &#32;₽</span></p>
            <div>
              <Button click={handlerRegister} text='Оформить заказ' />
              {isShowPopUp &&
                <PopUp handlerClose={handlerClose}
                  response={'Заказ оформлен.'}
                  link={'/products'}
                  textBtn={'Перейти в каталог'}
                  text={'Спасибо, что выбираете нас!'} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Basket;