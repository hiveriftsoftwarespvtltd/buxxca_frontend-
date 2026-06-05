import React from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- Exact chart data from the original custom-chart.js ---
const lineChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Sales",
      tension: 0.3,
      fill: true,
      backgroundColor: "rgba(44, 120, 220, 0.2)",
      borderColor: "rgba(44, 120, 220)",
      data: [18, 17, 4, 3, 2, 20, 25, 31, 25, 22, 20, 9],
    },
    {
      label: "Visitors",
      tension: 0.3,
      fill: true,
      backgroundColor: "rgba(4, 209, 130, 0.2)",
      borderColor: "rgb(4, 209, 130)",
      data: [40, 20, 17, 9, 23, 35, 39, 30, 34, 25, 27, 17],
    },
    {
      label: "Products",
      tension: 0.3,
      fill: true,
      backgroundColor: "rgba(380, 200, 230, 0.2)",
      borderColor: "rgb(380, 200, 230)",
      data: [30, 10, 27, 19, 33, 15, 19, 20, 24, 15, 37, 6],
    },
  ],
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: { usePointStyle: true },
    },
  },
};

const barChartData = {
  labels: ["900", "1200", "1400", "1600"],
  datasets: [
    { label: "US",     backgroundColor: "#5897fb", barThickness: 10, data: [233, 321, 783, 900] },
    { label: "Europe", backgroundColor: "#7bcf86", barThickness: 10, data: [408, 547, 675, 734] },
    { label: "Asian",  backgroundColor: "#ff9076", barThickness: 10, data: [208, 447, 575, 634] },
    { label: "Africa", backgroundColor: "#d595e5", barThickness: 10, data: [123, 345, 122, 302] },
  ],
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: { usePointStyle: true },
    },
  },
  scales: {
    y: { beginAtZero: true },
  },
};

export const DashboardHome = () => {
  return (
    <>
      {/* Page Header */}
      <div className="content-header">
        <div>
          <h2 className="content-title card-title">Dashboard</h2>
          <p>Whole data about your business here</p>
        </div>
        <div>
          <a className="btn btn-primary" href="#">
            <i className="text-muted material-icons md-post_add"></i> Create report
          </a>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="row">
        <div className="col-lg-3">
          <div className="card card-body mb-4">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle bg-primary-light">
                <i className="text-primary material-icons md-monetization_on"></i>
              </span>
              <div className="text">
                <h6 className="mb-1 card-title">Revenue</h6>
                <span>$13,456.5</span>
                <span className="text-sm">Shipping fees are not included</span>
              </div>
            </article>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card card-body mb-4">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle bg-success-light">
                <i className="text-success material-icons md-local_shipping"></i>
              </span>
              <div className="text">
                <h6 className="mb-1 card-title">Orders</h6>
                <span>53.668</span>
                <span className="text-sm">Excluding orders in transit</span>
              </div>
            </article>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card card-body mb-4">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle bg-warning-light">
                <i className="text-warning material-icons md-qr_code"></i>
              </span>
              <div className="text">
                <h6 className="mb-1 card-title">Products</h6>
                <span>9.856</span>
                <span className="text-sm">In 19 Categories</span>
              </div>
            </article>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="card card-body mb-4">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle bg-info-light">
                <i className="text-info material-icons md-shopping_basket"></i>
              </span>
              <div className="text">
                <h6 className="mb-1 card-title">Monthly Earning</h6>
                <span>$6,982</span>
                <span className="text-sm">Based in your local time.</span>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="row">
        <div className="col-xl-8 col-lg-12">

          {/* Sale Statistics Line Chart */}
          <div className="card mb-4">
            <article className="card-body">
              <h5 className="card-title">Sale statistics</h5>
              <Line data={lineChartData} options={lineChartOptions} />
            </article>
          </div>

          <div className="row">
            {/* New Members */}
            <div className="col-lg-5">
              <div className="card mb-4">
                <article className="card-body">
                  <h5 className="card-title">New Members</h5>
                  <div className="new-member-list">
                    {[
                      { name: "Patric Adams", loc: "Sanfrancisco", img: "/dash-assets/imgs/people/avatar4.jpg" },
                      { name: "Dilan Specter", loc: "Sanfrancisco", img: "/dash-assets/imgs/people/avatar2.jpg" },
                      { name: "Tomas Baker",  loc: "Sanfrancisco", img: "/dash-assets/imgs/people/avatar3.jpg" },
                    ].map((m) => (
                      <div key={m.name} className="d-flex align-items-center justify-content-between mb-4">
                        <div className="d-flex align-items-center">
                          <img className="avatar" src={m.img} alt="" />
                          <div>
                            <h6>{m.name}</h6>
                            <p className="text-muted font-xs">{m.loc}</p>
                          </div>
                        </div>
                        <a className="btn btn-xs" href="#">
                          <i className="material-icons md-add"></i> Add
                        </a>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="col-lg-7">
              <div className="card mb-4">
                <article className="card-body">
                  <h5 className="card-title">Recent activities</h5>
                  <ul className="verti-timeline list-unstyled font-sm">
                    {[
                      { date: "Today",    text: "Lorem ipsum dolor sit amet consectetur" },
                      { date: "17 May",   text: "Debitis nesciunt voluptatum dicta reprehenderit", active: true },
                      { date: "13 May",   text: "Accusamus voluptatibus voluptas." },
                      { date: "05 April", text: "At vero eos et accusamus et iusto odio dignissi" },
                      { date: "26 Mar",   text: 'Responded to need "Volunteer Activities' },
                    ].map((a, i) => (
                      <li key={i} className={`event-list ${a.active ? "active" : ""}`}>
                        <div className="event-timeline-dot">
                          <i className={`material-icons md-play_circle_outline font-xxl ${a.active ? "animation-fade-right" : ""}`}></i>
                        </div>
                        <div className="media">
                          <div className="me-3">
                            <h6>
                              <span>{a.date}</span>
                              <i className="material-icons md-trending_flat text-brand ml-15 d-inline-block"></i>
                            </h6>
                          </div>
                          <div className="media-body">
                            <div>{a.text}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-xl-4 col-lg-12">

          {/* Revenue Base on Area — Bar Chart */}
          <div className="card mb-4">
            <article className="card-body">
              <h5 className="card-title">Revenue Base on Area</h5>
              <Bar data={barChartData} options={barChartOptions} />
            </article>
          </div>

          {/* Marketing Channel */}
          <div className="card mb-4">
            <article className="card-body">
              <h5 className="card-title">Marketing Chanel</h5>
              {[
                { name: "Facebook",  pct: 15 },
                { name: "Instagram", pct: 65 },
                { name: "Google",    pct: 51 },
                { name: "Twitter",   pct: 80 },
                { name: "Other",     pct: 80 },
              ].map((c) => (
                <div key={c.name}>
                  <span className="text-muted font-xs">{c.name}</span>
                  <div className="progress mb-3">
                    <div className="progress-bar" role="progressbar" style={{ width: `${c.pct}%` }}>
                      {c.pct}%
                    </div>
                  </div>
                </div>
              ))}
            </article>
          </div>
        </div>
      </div>

      {/* Latest Orders Table */}
      <div className="card mb-4">
        <header className="card-header">
          <h4 className="card-title">Latest orders</h4>
          <div className="row align-items-center">
            <div className="col-md-3 col-12 me-auto mb-md-0 mb-3">
              <div className="custom_select">
                <select className="form-select select-nice">
                  <option>All Categories</option>
                  <option>Women&apos;s Clothing</option>
                  <option>Men&apos;s Clothing</option>
                  <option>Cellphones</option>
                  <option>Computer &amp; Office</option>
                  <option>Consumer Electronics</option>
                  <option>Jewelry &amp; Accessories</option>
                  <option>Home &amp; Garden</option>
                  <option>Luggage &amp; Bags</option>
                  <option>Shoes</option>
                  <option>Mother &amp; Kids</option>
                </select>
              </div>
            </div>
            <div className="col-md-2 col-6">
              <input className="form-control" type="date" defaultValue="2022-05-02" />
            </div>
            <div className="col-md-2 col-6">
              <div className="custom_select">
                <select className="form-select select-nice">
                  <option>Status</option>
                  <option>All</option>
                  <option>Paid</option>
                  <option>Chargeback</option>
                  <option>Refund</option>
                </select>
              </div>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle table-nowrap mb-0">
              <thead className="table-light">
                <tr>
                  <th className="text-center" scope="col">
                    <div className="form-check align-middle">
                      <input className="form-check-input" id="transactionCheck01" type="checkbox" />
                      <label className="form-check-label" htmlFor="transactionCheck01"></label>
                    </div>
                  </th>
                  <th className="align-middle" scope="col">Order ID</th>
                  <th className="align-middle" scope="col">Billing Name</th>
                  <th className="align-middle" scope="col">Date</th>
                  <th className="align-middle" scope="col">Total</th>
                  <th className="align-middle" scope="col">Payment Status</th>
                  <th className="align-middle" scope="col">Payment Method</th>
                  <th className="align-middle" scope="col">View Details</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "SK2540", name: "Neal Matthews",  date: "07 Oct, 2022", total: "$400", status: "Paid",       cls: "badge-soft-success", method: "Mastercard" },
                  { id: "SK2541", name: "Jamal Burnett",  date: "07 Oct, 2022", total: "$380", status: "Chargeback", cls: "badge-soft-danger",  method: "Visa"       },
                  { id: "SK2542", name: "Juan Mitchell",  date: "06 Oct, 2022", total: "$384", status: "Paid",       cls: "badge-soft-success", method: "Paypal"     },
                  { id: "SK2543", name: "Barry Dick",     date: "05 Oct, 2022", total: "$412", status: "Paid",       cls: "badge-soft-success", method: "Mastercard" },
                  { id: "SK2544", name: "Ronald Taylor",  date: "04 Oct, 2022", total: "$404", status: "Refund",     cls: "badge-soft-warning", method: "Visa"       },
                  { id: "SK2545", name: "Jacob Hunter",   date: "04 Oct, 2022", total: "$392", status: "Paid",       cls: "badge-soft-success", method: "Paypal"     },
                ].map((ord, i) => (
                  <tr key={ord.id}>
                    <td className="text-center">
                      <div className="form-check">
                        <input className="form-check-input" id={`chk-${i}`} type="checkbox" />
                        <label className="form-check-label" htmlFor={`chk-${i}`}></label>
                      </div>
                    </td>
                    <td><Link className="fw-bold" to={`/dashboard/orders/${ord.id}`}>#{ord.id}</Link></td>
                    <td>{ord.name}</td>
                    <td>{ord.date}</td>
                    <td>{ord.total}</td>
                    <td><span className={`badge badge-pill ${ord.cls}`}>{ord.status}</span></td>
                    <td><i className="material-icons md-payment font-xxl text-muted mr-5"></i> {ord.method}</td>
                    <td><Link className="btn btn-xs" to={`/dashboard/orders/${ord.id}`}>View details</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
export default DashboardHome;
