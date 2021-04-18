import { FC } from 'react';
import { useHistory } from 'react-router-dom';

const PageNotFound: FC = () => {
  const history = useHistory();

  return (
    <div className="not-found-page">
      <h1>404 - PAGE NOT FOUND</h1>
      <p>Sorry, seems like this page is temporarily unavailable</p>
      <button
        onClick={history.goBack}
        style={{ all: 'unset', textDecoration: 'underline', cursor: 'pointer' }}
      >
        Return to previous page
      </button>
    </div>
  );
};

export default PageNotFound;
