import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import { Navigation } from '.';

import '../../styles/app.css';

const DefaultLayout = ({ data, children, bodyClass }) => {
  const site = data.allGhostSettings.edges[0].node;
  const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, '')}` : null;
  const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, '')}` : null;
  return (
    <>
      <Helmet>
        <html lang={site.lang} />
        <style type="text/css">{`${site.codeinjection_styles}`}</style>
        <body className={bodyClass} />
      </Helmet>
      <div className="viewport">
        <div className="viewport-top">
          <header className="site-head">
            <div className="container">
              <div className="site-mast">
                <div className="site-mast-left">
                  <Link to="/">
                    {site.logo ?
                      <div className="site-header-top">
                        <img className="site-logo" src={site.logo} alt={site.title} />
                        <div className="site-header-link">
                          <h1 className="site-banner-title">{site.title}</h1>
                          <p className="site-banner-desc">{site.description}</p>
                        </div>
                      </div> :
                      <Img fixed={data.file.childImageSharp.fixed} alt={site.title} />
                    }
                  </Link>
                </div>
                <div className="site-mast-right">
                  {site.twitter && <a href={twitterUrl} className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /></a>}
                  {site.facebook && <a href={facebookUrl} className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /></a>}
                  <a className="site-nav-item" href="https://github.com/gndx" target="_blank" rel="noopener noreferrer">
                    <img className="site-nav-icon" src="/images/icons/github.png" alt="Oscar Barajas Tavares - Github" />
                  </a>
                </div>
              </div>
              <nav className="site-nav">
                <div className="site-nav-left">
                  <Navigation data={site.navigation} navClass="site-nav-item" />
                </div>
                <div className="site-nav-right">
                  <Link className="site-nav-button" to="/about">Acerca</Link>
                </div>
              </nav>
            </div>
          </header>
          <main className="site-main">
            {children}
          </main>
        </div>
        <div className="viewport-bottom">
          <footer className="site-foot">
            <div className="site-foot-nav container">
              <div className="site-foot-nav-left">
                Hecho con Amor desde Colombia 🇨🇴
              </div>
              <div className="site-foot-nav-right">
                <Navigation data={site.navigation} navClass="site-foot-nav-item" />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bodyClass: PropTypes.string,
  data: PropTypes.shape({
    file: PropTypes.object,
    allGhostSettings: PropTypes.object.isRequired
  }).isRequired
};

const DefaultLayoutSettingsQuery = props => (
  <StaticQuery
    query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
    render={data => <DefaultLayout data={data} {...props} />}
  />
);

export default DefaultLayoutSettingsQuery;
