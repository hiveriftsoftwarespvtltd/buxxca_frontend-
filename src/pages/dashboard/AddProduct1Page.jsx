import React from "react";

export const AddProduct1Page = () => {
  return (
    <>
      <div className="row">
        <div className="col-9">
          <div className="content-header">
            <h2 className="content-title">Add New Product</h2>
            <div>
              <button className="btn btn-light rounded font-sm mr-5 text-body hover-up">Save to draft</button>
              <button className="btn btn-md rounded font-sm hover-up">Publish</button>
            </div>
          </div>
        </div>

        {/* Left column — Basic + Shipping */}
        <div className="col-lg-6">
          {/* Basic Info */}
          <div className="card mb-4">
            <div className="card-header">
              <h4>Basic</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-4">
                  <label className="form-label" htmlFor="product_name">Product title</label>
                  <input className="form-control" id="product_name" type="text" placeholder="Type here" />
                </div>
                <div className="mb-4">
                  <label className="form-label">Full description</label>
                  <textarea className="form-control" placeholder="Type here" rows="4"></textarea>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <label className="form-label">Regular price</label>
                      <input className="form-control" placeholder="$" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <label className="form-label">Promotional price</label>
                      <input className="form-control" placeholder="$" type="text" />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <label className="form-label">Currency</label>
                    <select className="form-select">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>RUBL</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="tax_rate">Tax rate</label>
                  <input className="form-control" id="tax_rate" type="text" placeholder="%" />
                </div>
                <label className="form-check mb-4">
                  <input className="form-check-input" type="checkbox" />
                  <span className="form-check-label"> Make a template</span>
                </label>
              </form>
            </div>
          </div>

          {/* Shipping */}
          <div className="card mb-4">
            <div className="card-header">
              <h4>Shipping</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">Width</label>
                      <input className="form-control" type="text" placeholder="inch" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">Height</label>
                      <input className="form-control" type="text" placeholder="inch" />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Weight</label>
                    <input className="form-control" type="text" placeholder="gam" />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Shipping fees</label>
                    <input className="form-control" type="text" placeholder="$" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right column — Media + Organization */}
        <div className="col-lg-3">
          {/* Media upload */}
          <div className="card mb-4">
            <div className="card-header">
              <h4>Media</h4>
            </div>
            <div className="card-body">
              <div className="input-upload">
                <img src="/dash-assets/imgs/theme/upload.svg" alt="" />
                <input className="form-control" type="file" />
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="card mb-4">
            <div className="card-header">
              <h4>Organization</h4>
            </div>
            <div className="card-body">
              <div className="row gx-2">
                <div className="col-sm-6 mb-3">
                  <label className="form-label">Category</label>
                  <select className="form-select">
                    <option>Automobiles</option>
                    <option>Home items</option>
                    <option>Electronics</option>
                    <option>Smartphones</option>
                    <option>Sport items</option>
                    <option>Baby and Toys</option>
                  </select>
                </div>
                <div className="col-sm-6 mb-3">
                  <label className="form-label">Sub-category</label>
                  <select className="form-select">
                    <option>Nissan</option>
                    <option>Honda</option>
                    <option>Mercedes</option>
                    <option>Chevrolet</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="form-label">Tags</label>
                  <input className="form-control" type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddProduct1Page;
