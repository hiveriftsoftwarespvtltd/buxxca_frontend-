import React from "react";
import { Link, useParams } from "react-router-dom";

export const OrderDetailPage = () => {
  const { id } = useParams();
  const orderId = id || "3453012";

  return (
    <>
      {/* Page Header */}
      <div className="content-header">
        <div>
          <h2 className="content-title card-title">Order detail</h2>
          <p>Details for Order ID: {orderId}</p>
        </div>
      </div>

      <div className="card">
        {/* Card Header */}
        <header className="card-header">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 mb-lg-0 mb-15">
              <span>
                <i className="material-icons md-calendar_today"></i>
                <b>Wed, Aug 13, 2022, 4:34PM</b>
              </span>
              <br />
              <small className="text-muted">Order ID: {orderId}</small>
            </div>
            <div className="col-lg-6 col-md-6 ms-auto text-md-end">
              <select className="form-select d-inline-block mb-lg-0 mb-15 mw-200">
                <option>Change status</option>
                <option>Awaiting payment</option>
                <option>Confirmed</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
              <a className="btn btn-primary" href="#">Save</a>
              <a className="btn btn-secondary print ms-2" href="#">
                <i className="icon material-icons md-print"></i>
              </a>
            </div>
          </div>
        </header>

        <div className="card-body">
          {/* Order Info Row */}
          <div className="row mb-50 mt-20 order-info-wrap">
            <div className="col-md-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle bg-primary-light">
                  <i className="text-primary material-icons md-person"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Customer</h6>
                  <p className="mb-1">
                    John Alexander<br />
                    alex@example.com<br />
                    +998 99 22123456
                  </p>
                  <a href="#">View profile</a>
                </div>
              </article>
            </div>
            <div className="col-md-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle bg-primary-light">
                  <i className="text-primary material-icons md-local_shipping"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Order info</h6>
                  <p className="mb-1">
                    Shipping: Fargo express<br />
                    Pay method: card<br />
                    Status: new
                  </p>
                  <a href="#">Download info</a>
                </div>
              </article>
            </div>
            <div className="col-md-4">
              <article className="icontext align-items-start">
                <span className="icon icon-sm rounded-circle bg-primary-light">
                  <i className="text-primary material-icons md-place"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Deliver to</h6>
                  <p className="mb-1">
                    City: Tashkent, Uzbekistan<br />
                    Block A, House 123, Floor 2<br />
                    Po Box 10000
                  </p>
                  <a href="#">View profile</a>
                </div>
              </article>
            </div>
          </div>

          {/* Order Items table + Payment info */}
          <div className="row">
            <div className="col-lg-7">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th width="40%">Product</th>
                      <th width="20%">Unit Price</th>
                      <th width="20%">Quantity</th>
                      <th className="text-end" width="20%">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { img: "/dash-assets/imgs/items/1.jpg", name: "T-shirt blue, XXL size",        price: "$44.25", qty: 2, total: "$99.50"  },
                      { img: "/dash-assets/imgs/items/2.jpg", name: "Winter jacket for men",         price: "$7.50",  qty: 2, total: "$15.00"  },
                      { img: "/dash-assets/imgs/items/3.jpg", name: "Jeans wear for men",            price: "$43.50", qty: 2, total: "$102.04" },
                      { img: "/dash-assets/imgs/items/4.jpg", name: "Product name color and size",   price: "$99.00", qty: 3, total: "$297.00" },
                    ].map((item, i) => (
                      <tr key={i}>
                        <td>
                          <a className="itemside" href="#">
                            <div className="left">
                              <img className="img-xs" src={item.img} alt="Item" width="40" height="40" />
                            </div>
                            <div className="info">{item.name}</div>
                          </a>
                        </td>
                        <td>{item.price}</td>
                        <td>{item.qty}</td>
                        <td className="text-end">{item.total}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="4">
                        <article className="float-end">
                          <dl className="dlist">
                            <dt>Subtotal:</dt>
                            <dd>$973.35</dd>
                          </dl>
                          <dl className="dlist">
                            <dt>Shipping cost:</dt>
                            <dd>$10.00</dd>
                          </dl>
                          <dl className="dlist">
                            <dt>Grand total:</dt>
                            <dd><b className="h5">$983.00</b></dd>
                          </dl>
                          <dl className="dlist">
                            <dt className="text-muted">Status:</dt>
                            <dd>
                              <span className="badge rounded-pill alert-success text-success">Payment done</span>
                            </dd>
                          </dl>
                        </article>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Link className="btn btn-primary" to="/dashboard/orders/SK2540/tracking">
                View Order Tracking
              </Link>
            </div>

            <div className="col-lg-1"></div>

            {/* Payment Info + Notes */}
            <div className="col-lg-4">
              <div className="box shadow-sm bg-light">
                <h6 className="mb-15">Payment info</h6>
                <p>
                  <img className="border" src="/dash-assets/imgs/card-brands/2.png" height="20" alt="" /> Master Card **** **** 4768<br />
                  Business name: Grand Market LLC<br />
                  Phone: +1 (800) 555-154-52
                </p>
              </div>
              <div className="h-25 pt-4">
                <div className="mb-3">
                  <label>Notes</label>
                  <textarea className="form-control" id="notes" name="notes" placeholder="Type some note"></textarea>
                </div>
                <button className="btn btn-primary">Save note</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderDetailPage;
