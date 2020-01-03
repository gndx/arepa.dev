import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { Tags } from '@tryghost/helpers-gatsby';
import { readingTime as readingTimeHelper } from '@tryghost/helpers';

const PostCard = ({ post }) => {
  const url = `/${post.slug}/`;
  const readingTime = readingTimeHelper(post);

  return (
    <Link to={url} className="post-card">
      <header className="post-card-header">
        {post.feature_image &&
          <div className="post-card-image" style={{
            backgroundImage: `url(${post.feature_image})`
          }}
          />}
        {post.tags &&
          <div className="post-card-tags">
            <div><Tags post={post} visibility="public" autolink={false} /></div>
            {post.published_at_pretty}
          </div>
        }

        {post.featured && <span>Featured</span>}
        <h2 className="post-card-title">{post.title}</h2>
      </header>
      <section className="post-card-excerpt">{post.excerpt.slice(0, 92)}...</section>
    </Link>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    feature_image: PropTypes.string,
    featured: PropTypes.bool,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string
      })
    ),
    excerpt: PropTypes.string.isRequired,
    primary_author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile_image: PropTypes.string
    }).isRequired
  }).isRequired
};

export default PostCard;
