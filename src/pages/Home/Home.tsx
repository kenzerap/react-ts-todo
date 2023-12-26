import React from 'react';
import classes from './Home.module.css';
import { Card, Carousel } from 'flowbite-react';

const HomePage: React.FC<{}> = (props) => {
  const images = [
    'https://cdn.chanhtuoi.com/uploads/2022/12/mau-background-noel-dep-mung-giang-sinh-2022-1670901526.jpg',
    'https://images.wallpaperscraft.com/image/single/christmas_tree_garland_street_68906_3450x2250.jpg',
    'https://w.wallhaven.cc/full/o5/wallhaven-o5762l.png',
    'https://cdn.pixabay.com/photo/2012/04/13/01/23/moon-31665_1280.png',
    'https://images.pexels.com/photos/980859/pexels-photo-980859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://treobangron.com.vn/wp-content/uploads/2022/11/background-noel-giang-sinh-4-2.jpg',
    'https://www.tnmt.edu.vn/wp-content/uploads/2023/11/hinh-nen-powerpoint-giang-sinh-2.jpg',
  ];
  return (
    <Card className={classes.cardbar}>
      <h3 className="text-center text-5xl mt-4 mb-4">
        Welcome to ReactPee shop
      </h3>

      <Carousel slideInterval={2000}>
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
  );
};

export default HomePage;
