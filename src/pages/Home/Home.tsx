import React, { Fragment } from 'react';
import classes from './Home.module.css';
import { Card, Carousel } from 'flowbite-react';

const HomePage: React.FC<{}> = (props) => {
  const images = [
    'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg',
    'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
    'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
    'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',
    'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
    'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
  ];
  return (
    <Fragment>
      <Card className={classes.cardbar}>
        <h3 className="text-center text-7xl mt-8 mb-8">
          Welcome to ReactPee shop
        </h3>

        <Carousel slideInterval={3000}>
          {images.map((imageUrl, index) => {
            return (
              <img
                className={classes.image}
                src={imageUrl}
                alt={imageUrl}
                key={index}
              />
            );
          })}
        </Carousel>
      </Card>
    </Fragment>
  );
};

export default HomePage;
