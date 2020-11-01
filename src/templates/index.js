import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';

import { Layout, Pagination, PostCard } from '../components/common';
import { MetaData } from '../components/common/meta';

const Index = ({ data, location, pageContext }) => {
  const posts = data.allGhostPost.edges;

  return (
    <>
      <MetaData location={location} />
      <Layout isHome={true}>
        <div className="container">
          <section className="post-feed">
            {posts.map(({ node }) => (
              <PostCard key={node.id} post={node} />
            ))}
          </section>
          <Pagination pageContext={pageContext} />
        </div>
      </Layout>
    </>
  );
};

Index.propTypes = {
  data: PropTypes.shape({
    allGhostPost: PropTypes.object.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  pageContext: PropTypes.object
};

export default Index;

export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: $limit,
        skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`;
