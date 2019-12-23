import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

const Pagination = ({ pageContext }) => {
  const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext;

  return (
    <nav className="pagination" role="navigation">
      <div>
        {previousPagePath && (

          <Link to={previousPagePath} rel="prev">
            Anterior
          </Link>

        )}
      </div>
      {numberOfPages > 1 && <div className="pagination-location">Página {humanPageNumber} de {numberOfPages}</div>}
      <div>
        {nextPagePath && (

          <Link to={nextPagePath} rel="next">
            Siguiente
          </Link>
        )}
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  pageContext: PropTypes.object.isRequired
};

export default Pagination;
