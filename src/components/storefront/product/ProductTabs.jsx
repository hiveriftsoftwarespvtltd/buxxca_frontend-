import React, { useState } from "react";

export const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("desc");
  const [reviewsList, setReviewsList] = useState(product.reviews || []);
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState("");
  const [formName, setFormName] = useState("");

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newRev = {
      id: reviewsList.length + 1,
      author: formName,
      rating: formRating,
      date: new Date().toISOString().split("T")[0],
      comment: formComment
    };

    setReviewsList((prev) => [newRev, ...prev]);
    setFormName("");
    setFormComment("");
    alert("Thank you! Your review has been added.");
  };

  return (
    <div className="pt-30 mb-10 w-100">
      <ul className="nav nav-tabs nav-tabs-product" role="tablist">
        <li>
          <a
            className={activeTab === "desc" ? "active" : ""}
            href="#tab-description"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("desc");
            }}
          >
            Description
          </a>
        </li>
        <li>
          <a
            className={activeTab === "specs" ? "active" : ""}
            href="#tab-specification"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("specs");
            }}
          >
            Specification
          </a>
        </li>
        <li>
          <a
            className={activeTab === "reviews" ? "active" : ""}
            href="#tab-reviews"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab("reviews");
            }}
          >
            Reviews ({reviewsList.length})
          </a>
        </li>
      </ul>
      <div className="tab-content mt-20">
        {/* 1. Description Panel */}
        {activeTab === "desc" && (
          <div className="tab-pane fade active show">
            <div className="display-text-short">
              <p>{product.description}</p>
              <p>
                Whether you are flying for business or embarking on a long-deserved family holiday,
                BUXAA ensures you travel in style. Our electronics catalog, smartphones, laptops,
                smartwatches and accessories set standard expectations.
              </p>
            </div>
          </div>
        )}

        {/* 2. Specifications Panel */}
        {activeTab === "specs" && (
          <div className="tab-pane fade active show">
            <h5 className="mb-25">Specification</h5>
            <div className="table-responsive">
              <table className="table table-striped">
                <tbody>
                  {Object.entries(product.specs || {}).map(([key, value]) => (
                    <tr key={key}>
                      <td style={{ fontWeight: "bold", width: "30%" }}>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Reviews Panel */}
        {activeTab === "reviews" && (
          <div className="tab-pane fade active show">
            <div className="comments-area">
              <div className="row">
                <div className="col-lg-8">
                  <h4 className="mb-30 title-question">Customer questions &amp; answers</h4>
                  <div className="comment-list">
                    {reviewsList.length === 0 ? (
                      <p className="font-sm color-gray-900">
                        No reviews yet. Be the first to review this product!
                      </p>
                    ) : (
                      reviewsList.map((rev) => (
                        <div
                          key={rev.id}
                          className="single-comment justify-content-between d-flex mb-30 hover-up w-100"
                        >
                          <div className="user justify-content-between d-flex w-100">
                            <div className="thumb text-center mr-15">
                              <img
                                src="/assets/imgs/page/product/author-2.png"
                                alt="Author"
                                style={{ width: "60px", borderRadius: "50%" }}
                              />
                              <br />
                              <a className="font-heading text-brand" href="#">
                                {rev.author}
                              </a>
                            </div>
                            <div className="desc w-100">
                              <div className="d-flex justify-content-between mb-10 align-items-center">
                                <span className="font-xs color-gray-700">{rev.date}</span>
                                <div className="rating">
                                  {[...Array(5)].map((_, i) => (
                                    <img
                                      key={i}
                                      src="/assets/imgs/template/icons/star.svg"
                                      alt="star"
                                      style={{
                                        opacity: i < rev.rating ? 1 : 0.3,
                                        width: "12px",
                                        display: "inline-block"
                                      }}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="mb-10 font-sm color-gray-900">"{rev.comment}"</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Review Form */}
                  <div className="border-t border-brand-border pt-30 mt-30 max-w-xl">
                    <h4 className="mb-30 title-question">Write a Review</h4>
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div className="mb-3">
                        <label className="form-label font-md color-brand-3 font-semibold mr-15">
                          Your Rating:
                        </label>
                        <select
                          value={formRating}
                          onChange={(e) => setFormRating(Number(e.target.value))}
                          className="form-control d-inline-block w-auto"
                        >
                          <option value={5}>5 Stars</option>
                          <option value={4}>4 Stars</option>
                          <option value={3}>3 Stars</option>
                          <option value={2}>2 Stars</option>
                          <option value={1}>1 Star</option>
                        </select>
                      </div>
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Enter your name"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <textarea
                          required
                          rows="4"
                          value={formComment}
                          onChange={(e) => setFormComment(e.target.value)}
                          placeholder="Write your review here..."
                          className="form-control"
                        />
                      </div>
                      <button type="submit" className="btn btn-buy w-auto">
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
