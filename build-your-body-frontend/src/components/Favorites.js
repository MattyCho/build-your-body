import React from 'react';
import {withAuth0} from '@auth0/auth0-react';


class Favorites extends React.Component {
  render() {
    return (
      <>
        <p>Favorites page</p>
      </>
    )
  }
}

export default withAuth0(Favorites);
