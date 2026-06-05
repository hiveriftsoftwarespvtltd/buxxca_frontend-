import React from "react";
import { Link } from "react-router-dom";
import { blogs } from "../../../data/blogs";

export const BlogPreview = () => {
  const latestBlogs = blogs.slice(0, 4);

  return (
    <section className="section-box mt-50">
      <div className="container">
        {/* Heading */}
        <div className="head-main">
          <h3 className="mb-5">BUXXA Stories</h3>
          <p className="font-base color-gray-500">Explore travel inspiration, product highlights, and customer experiences.</p>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="row mt-30">
          {latestBlogs.map((post) => (
            <div key={post.id} className="col-lg-3 col-md-6 col-sm-12 mb-30">
              <div className="card-grid-style-1">
                <div className="image-box">
                  <Link to={`/blog/${post.slug}`}>
                    <img src={post.image} alt="BUXAA" />
                  </Link>
                </div>
                <Link className="tag-dot font-xs" to="/blog">
                  {post.category}
                </Link>
                <Link className="color-gray-1100" to={`/blog/${post.slug}`}>
                  <h4>{post.title}</h4>
                </Link>
                <div className="mt-20">
                  <span className="color-gray-500 font-xs mr-30">{post.date}</span>
                  <span className="color-gray-500 font-xs">4 Mins read</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
