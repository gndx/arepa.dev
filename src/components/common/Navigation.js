import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';

const Navigation = ({ data, navClass }) => (
  <>
    {data.map((navItem, i) => {
      if (navItem.url.match(/^\s?http(s?)/gi)) {
        return <a className={navClass} href={navItem.url} key={i} target="_self" rel="noopener noreferrer">{navItem.label}</a>;
      }
      return <Link className={navClass} to={navItem.url} key={i}>{navItem.label}</Link>;
    })}
  </>
);

Navigation.defaultProps = {
  navClass: 'site-nav-item'
};

Navigation.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    }).isRequired,
  ).isRequired,
  navClass: PropTypes.string
};

export default Navigation;
