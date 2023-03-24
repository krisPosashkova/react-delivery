import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../authContextProvider';

import Card from '../../components/elements/card';
import CartBtn from '../../components/ui/cart';
import style from './products.module.css';
import Button from '../../components/ui/button';


const Products = () => {

  const {logout } = useAuth()
  
  const {products, ammountProducts, countProduct } = useSelector(state => state.products);

  const btnModification = {
    padding: '12px 75px',
    border: '1px solid #D58C51',
    background: 'none',
    color: '#D58C51',
  }

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
  }


  return (
    <main className={style.main}>
      <div className={style.container}>
        <div className={style.header}>
          <h1 className={style.title}>Наша продукция</h1>
          <div className={style['header-wrapper']}>
            <div className={style['cart-wrapper']}>
              <div className={style['cart-description']}>
                <p>{countProduct} товара </p>
                <p>на сумму {ammountProducts} ₽</p>
              </div>
              <Link to={'/basket'}><CartBtn /></Link>
            </div>
            <Button click={handleLogout} modification={btnModification} text={'Выйти'} />
          </div>
        </div>
        <div className={style['card-wrapper']}>
          <div className={style['card-inner']}>
            {products.map(item => {
              return (
                <Card
                  key={item.id}
                  id={item.id}
                  img={item.img}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  weight={item.weight}
                />
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Products;