import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/common';
import { MetaData } from '../components/common/meta';

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
  const post = data.ghostPost;
  return (
    <>
      <MetaData
        data={data}
        location={location}
        type="article"
      />
      <Helmet>
        <style type="text/css">{`${post.codeinjection_styles}`}</style>
      </Helmet>
      <Layout>
        <div className="container">
          <article className="content">
            <section className="post-full-content">
              <div className="post-content-inner">
                <h1 className="content-title">{post.title}</h1>
                <section
                  className="content-body load-external-scripts"
                  dangerouslySetInnerHTML={{ __html: post.html }}
                />
              </div>
              <div className="post-content-sidebar">
                <figure className="post-feature-image">
                  <img src={post.feature_image} alt={post.title} />
                </figure>
                <div className="post-author-profile">
                  <h2>Oscar Barajas Tavares <a href="https://twitter.com/@gndx">@gndx</a></h2>
                  <p>Frontend & Foundation Layer at @platzi #education - Lead at Developer Circles from Facebook, ReactJS, Speaker & Blogger. I teach ReactJS in @platzi - 🇲🇽🇨🇴</p>
                </div>
                <div className="post-tags">
                  {post.tags.map((tag, index) => (
                    <a
                      className="post-tag"
                      href={`/tag/${tag.slug}`}
                      key={index}
                    >
                      #{tag.name}
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </article>
        </div>
      </Layout>
    </>
  );
};

Post.propTypes = {
  data: PropTypes.shape({
    ghostPost: PropTypes.shape({
      codeinjection_styles: PropTypes.object,
      title: PropTypes.string.isRequired,
      html: PropTypes.string.isRequired,
      feature_image: PropTypes.string
    }).isRequired
  }).isRequired,
  location: PropTypes.object.isRequired
};

export default Post;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`;
