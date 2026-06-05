import React from "react";

export const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Subscribed successfully! Welcome to BUXAA!");
    e.target.reset();
  };

  return (
    <section className="section-box box-newsletter">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-7 col-sm-12">
            <h3 className="color-white">Travel Smarter with BUXXA</h3>
            <p className="font-lg color-white">
              Receive travel tips, product updates, and exclusive member benefits.
            </p>
          </div>
          <div className="col-lg-4 col-md-5 col-sm-12">
            <div className="box-form-newsletter mt-15">
              <form className="form-newsletter" onSubmit={handleSubmit}>
                <input className="input-newsletter font-xs" placeholder="Your email Address" required type="email" />
                <button className="btn btn-brand-2" type="submit">Get Updates</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
