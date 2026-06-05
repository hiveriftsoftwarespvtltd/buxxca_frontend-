import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "../../components/common/SEO";
import { blogs } from "../../data/blogs";

export const BlogPage = () => {
  return (
    <>
      <SEO title="Travel Blog & Guides" description="Read the latest travel tips, packing guides, and stories from BUXAA." />

      <main className="main">
        <div className="section-box">
          <div className="breadcrumbs-div">
            <div className="container">
              <ul className="breadcrumb">
                <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                <li><span className="font-xs color-gray-500">Blog</span></li>
              </ul>
            </div>
          </div>
        </div>

        <section className="section-box shop-template mt-30">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="box-filters mt-0 pb-5 border-bottom">
                  <div className="row">
                    <div className="col-xl-2 col-lg-3 mb-0 text-lg-start text-center">
                      <h5 className="color-brand-3 text-uppercase">Blogs</h5>
                    </div>
                    <div className="col-xl-10 col-lg-9 mb-0 text-lg-end text-center">
                      <span className="font-sm color-gray-900 font-medium border-1-right span">
                        Showing 1–{blogs.length} of {blogs.length} results
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-30">
              {blogs.map((post) => (
                <div key={post.id} className="col-lg-3 col-md-4 col-sm-6 mb-40">
                  <div className="card-grid-style-1">
                    <div className="image-box">
                      <Link to={`/blog/${post.slug}`}>
                        <img src={post.image} alt={post.title} />
                      </Link>
                    </div>
                    <Link className="tag-dot font-xs" to="/blog">{post.category}</Link>
                    <Link className="color-gray-1100" to={`/blog/${post.slug}`}>
                      <h4>{post.title}</h4>
                    </Link>
                    <div className="mt-20">
                      <span className="color-gray-500 font-xs mr-30">{post.date}</span>
                      <span className="color-gray-500 font-xs">By {post.author}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogPage;
