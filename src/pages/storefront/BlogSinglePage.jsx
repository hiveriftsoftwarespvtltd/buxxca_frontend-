import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { SEO } from "../../components/common/SEO";
import { blogs } from "../../data/blogs";

export const BlogSinglePage = () => {
  const { slug } = useParams();
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Siena Kim",
      date: "August 30, 2022",
      content: "This article is really helpful! Virtual reality and haptic technologies are moving incredibly fast. Looking forward to see what comes next in 2026."
    },
    {
      id: 2,
      author: "Alex Rivers",
      date: "September 01, 2022",
      content: "Excellent writeup! The detail on resolution upgrades in upcoming headsets is spot on."
    }
  ]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");

  const post = useMemo(() => {
    const isId = !isNaN(slug);
    if (isId) {
      return blogs.find((b) => b.id === parseInt(slug, 10)) || blogs[0];
    }
    return blogs.find((b) => b.slug === slug) || blogs[0];
  }, [slug]);

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!name || !commentText) {
      alert("Please fill in your name and comment text.");
      return;
    }
    const newComment = {
      id: comments.length + 1,
      author: name,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }),
      content: commentText
    };
    setComments([...comments, newComment]);
    setName("");
    setEmail("");
    setCommentText("");
  };

  // Get other trending blogs
  const trendingBlogs = useMemo(() => {
    return blogs.filter((b) => b.id !== post.id).slice(0, 4);
  }, [post.id]);

  return (
    <>
      <SEO title={post.title} description={post.excerpt} />
      <main className="main">
        <div className="section-box">
          <div className="breadcrumbs-div">
            <div className="container">
              <ul className="breadcrumb">
                <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                <li><Link className="font-xs color-gray-500" to="/blog">Blog</Link></li>
                <li><span className="font-xs color-gray-500">{post.title}</span></li>
              </ul>
            </div>
          </div>
        </div>

        <section className="section-box shop-template mt-10">
          <div className="container">
            <div className="row">
              {/* Left Column: Blog Content */}
              <div className="col-lg-9 order-first order-lg-last">
                <div className="row">
                  <div className="col-lg-12 mb-50 display-list">
                    <Link className="tag-dot font-xs" to="/blog">{post.category}</Link>
                    <h3 className="mt-15 mb-25">{post.title}</h3>
                    
                    <div className="box-author mb-5">
                      <div className="img-author mr-30">
                        <img src="/assets/imgs/page/blog/author.png" alt="author" />
                        <span className="font-md-bold">By {post.author}</span>
                      </div>
                      <span className="datepost color-gray-500 font-sm mr-30">{post.date}</span>
                      <span className="timeread color-gray-500 font-sm">4 Mins read</span>
                    </div>

                    <div className="image-feature">
                      <img src={post.image} alt={post.title} style={{ width: "100%", borderRadius: "8px" }} />
                    </div>

                    <div className="content-text mt-30">
                      <p className="lead font-md-bold color-gray-900 mb-20">{post.excerpt}</p>
                      <p>{post.content}</p>
                      <p>
                        As consumer demand for high-quality portable devices increases, manufacturers are focusing heavily on lightweight materials, energy-efficient processors, and premium ergonomics. BUXAA smart gadgets and electronics carry-cases are designed to meet this standard, keeping your technology safe and accessible wherever your journey takes you.
                      </p>
                      <h4 className="mt-20 mb-20">The Future of Multi-device Integration</h4>
                      <p>
                        With modern workflows shifting to hybrid environments, travelers are finding themselves carrying multiple screens, peripherals, and charging units. Having dedicated organization systems that offer anti-static coatings, shockproof dividers, and water-resistant zippers is no longer a luxury—it is an absolute necessity for protecting precious hardware.
                      </p>
                    </div>

                    <div className="border-bottom-4 mb-20"></div>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="box-tags">
                          {post.tags?.map((tag) => (
                            <Link key={tag} className="btn btn-tags mr-10 hover-up" to="/blog">
                              {tag}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="col-lg-6 text-end">
                        <div className="d-inline-block pt-5 pb-5">
                          <div className="share-link">
                            <span className="font-md-bold color-brand-3 mr-15">Share</span>
                            <a className="facebook hover-up" href="#"></a>
                            <a className="printest hover-up" href="#"></a>
                            <a className="twitter hover-up" href="#"></a>
                            <a className="instagram hover-up" href="#"></a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-bottom-4 mt-20 mb-30"></div>

                    {/* Comments List */}
                    <h5 className="font-md-bold mb-30">Comments ({comments.length})</h5>
                    <div className="comment-box mb-60">
                      {comments.map((comment) => (
                        <div key={comment.id} className="comment-item comment-item-small mb-20" style={{ borderBottom: "1px solid #f2f2f2", paddingBottom: "15px" }}>
                          <div className="top-comment">
                            <div className="image-author">
                              <img src="/assets/imgs/page/blog/author.png" alt="avatar" />
                            </div>
                            <div className="author-name">
                              <span className="font-md-bold color-gray-900 mr-20">{comment.author}</span>
                              <span className="font-sm color-gray-500">{comment.date}</span>
                            </div>
                          </div>
                          <div className="comment-content font-md mt-10">
                            {comment.content}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Comments Form */}
                    <div className="border-bottom-4 mt-40 mb-40"></div>
                    <h5 className="font-md-bold mb-30">Leave a comment</h5>
                    <form onSubmit={handlePostComment} className="form-comment">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group mb-15">
                            <textarea
                              className="form-control"
                              placeholder="Write comment*"
                              rows="5"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mb-15">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Name*"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group mb-15">
                            <input
                              className="form-control"
                              type="email"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <input className="btn btn-buy w-auto" type="submit" value="Post Comment" />
                          </div>
                        </div>
                      </div>
                    </form>

                  </div>
                </div>
              </div>

              {/* Right Column: Sidebar */}
              <div className="col-lg-3 order-last order-lg-first">
                <div className="sidebar-border">
                  <div className="sidebar-head">
                    <h6 className="color-gray-900">Blog Categories</h6>
                  </div>
                  <div className="sidebar-content">
                    <ul className="list-nav-arrow">
                      <li><Link to="/blog">Technology Trending<span className="number">09</span></Link></li>
                      <li><Link to="/blog">Entertainment<span class="number">12</span></Link></li>
                      <li><Link to="/blog">Tech Reviews<span class="number">24</span></Link></li>
                      <li><Link to="/blog">Gaming Blog<span class="number">34</span></Link></li>
                      <li><Link to="/blog">Crypto news<span class="number">65</span></Link></li>
                    </ul>
                  </div>
                </div>

                {/* Trending News widget */}
                <div className="box-slider-item mb-30 mt-30">
                  <div className="head pb-15 border-brand-2">
                    <h5 className="color-gray-900">Trending News</h5>
                  </div>
                  <div className="content-slider mt-15">
                    {trendingBlogs.map((b) => (
                      <div key={b.id} className="card-grid-style-2 card-none-border mb-30 pb-5 mh-auto d-flex gap-15">
                        <div className="image-box mw-84" style={{ width: "80px", flexShrink: 0 }}>
                          <Link to={`/blog/${b.slug}`}>
                            <img src={b.image} alt={b.title} style={{ borderRadius: "4px" }} />
                          </Link>
                        </div>
                        <div className="info-right">
                          <Link className="color-brand-3 font-sm" to={`/blog/${b.slug}`}>
                            {b.title}
                          </Link>
                          <div className="row mt-5">
                            <div className="col-12">
                              <span className="color-gray-500 font-xs">{b.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular Tags widget */}
                <div className="box-slider-item">
                  <div className="head pb-15 border-brand-2">
                    <h5 className="color-gray-900">Popular Tags</h5>
                  </div>
                  <div className="content-slider mb-50 mt-15">
                    <Link className="btn btn-border mr-5 mb-5" to="/blog">Games</Link>
                    <Link className="btn btn-border mr-5 mb-5" to="/blog">Electronics</Link>
                    <Link className="btn btn-border mr-5 mb-5" to="/blog">Video</Link>
                    <Link className="btn btn-border mr-5 mb-5" to="/blog">Cellphone</Link>
                    <Link className="btn btn-border mr-5 mb-5" to="/blog">Laptop</Link>
                    <Link className="btn btn-border mr-5 mb-5" to="/blog">Keyboard</Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default BlogSinglePage;
