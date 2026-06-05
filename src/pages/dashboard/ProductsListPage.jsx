import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";

export const ProductsListPage = () => {
  const [list, setList] = useState(products);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const statusBadge = (i) => {
    const opts = ["alert-success", "alert-success", "alert-warning", "alert-success", "alert-danger", "alert-warning", "alert-success"];
    const labels = ["Active", "Active", "Archived", "Active", "Disabled", "Archived", "Active"];
    const idx = i % opts.length;
    return <span className={`badge rounded-pill ${opts[idx]}`}>{labels[idx]}</span>;
  };

  return (
    <>
      {/* Page Header */}
      <div className="content-header">
        <div>
          <h2 className="content-title card-title">Products List</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div>
          <a className="btn btn-light rounded font-md" href="#">Export</a>
          <a className="btn btn-light rounded font-md" href="#">Import</a>
          <Link className="btn btn-primary btn-sm rounded" to="/dashboard/products/add">Create new</Link>
        </div>
      </div>

      <div className="card mb-4">
        {/* Card Header filters */}
        <header className="card-header">
          <div className="row align-items-center">
            <div className="col col-check flex-grow-0">
              <div className="form-check ms-2">
                <input className="form-check-input" type="checkbox" />
              </div>
            </div>
            <div className="col-md-3 col-12 me-auto mb-md-0 mb-3">
              <select className="form-select">
                <option>All category</option>
                <option>Electronics</option>
                <option>Clothes</option>
                <option>Automobile</option>
              </select>
            </div>
            <div className="col-md-2 col-6">
              <input className="form-control" type="date" defaultValue="2022-05-02" />
            </div>
            <div className="col-md-2 col-6">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div>
          </div>
        </header>

        {/* Card Body — itemlist rows */}
        <div className="card-body">
          {list.slice(0, 10).map((p, i) => (
            <article key={p.id} className="itemlist">
              <div className="row align-items-center">
                <div className="col col-check flex-grow-0">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                  </div>
                </div>
                <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                  <a className="itemside" href="#">
                    <div className="left">
                      <img
                        className="img-sm img-thumbnail"
                        src={p.images ? p.images[0] : "/dash-assets/imgs/items/1.jpg"}
                        alt="Item"
                      />
                    </div>
                    <div className="info">
                      <h6 className="mb-0">{p.name}</h6>
                    </div>
                  </a>
                </div>
                <div className="col-lg-2 col-sm-2 col-4 col-price">
                  <span>${p.price?.toFixed(2)}</span>
                </div>
                <div className="col-lg-2 col-sm-2 col-4 col-status">
                  {statusBadge(i)}
                </div>
                <div className="col-lg-1 col-sm-2 col-4 col-date">
                  <span>02.11.2022</span>
                </div>
                <div className="col-lg-2 col-sm-2 col-4 col-action text-end">
                  <Link className="btn btn-sm font-sm rounded btn-brand mr-5" to="/dashboard/products/add">
                    <i className="material-icons md-edit"></i> Edit
                  </Link>
                  <button
                    className="btn btn-sm font-sm btn-light rounded"
                    onClick={() => handleDelete(p.id)}
                  >
                    <i className="material-icons md-delete_forever"></i> Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination-area mt-30 mb-50">
        <nav>
          <ul className="pagination justify-content-start">
            <li className="page-item active"><a className="page-link" href="#">01</a></li>
            <li className="page-item"><a className="page-link" href="#">02</a></li>
            <li className="page-item"><a className="page-link" href="#">03</a></li>
            <li className="page-item"><a className="page-link dot" href="#">...</a></li>
            <li className="page-item"><a className="page-link" href="#">16</a></li>
            <li className="page-item">
              <a className="page-link" href="#"><i className="material-icons md-chevron_right"></i></a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default ProductsListPage;
