import React, { Fragment } from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar';

const PageNotFound: React.FC<{}> = (props) => {
  return (
    <Fragment>
      <HeaderBar></HeaderBar>
      <h3 className="text-center text-7xl mt-20">Page not found</h3>
    </Fragment>
  );
};

export default PageNotFound;
