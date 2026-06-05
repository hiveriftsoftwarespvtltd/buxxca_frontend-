import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SEO } from "../../components/common/SEO";

const registerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password confirmation must be at least 6 characters")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = (data) => {
    if (!agree) {
      alert("Please agree to our terms and policy.");
      return;
    }
    // Simulate successful registration
    setRegisterSuccess(true);
    alert("Registration successful! Redirecting you to login...");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <>
      <SEO title="Create an Account - BUXAA" description="Join BUXAA marketplace. Access exclusive travel gear deals, track your orders, and manage wishlist." />

      <main className="main">
        {/* Breadcrumb */}
        <div className="section-box">
          <div className="breadcrumbs-div">
            <div className="container">
              <ul className="breadcrumb">
                <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                <li><a className="font-xs color-gray-500" href="#page">Pages</a></li>
                <li><a className="font-xs color-gray-500" href="#register">Register</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Register Section */}
        <section className="section-box shop-template mt-60">
          <div className="container">
            <div className="row mb-100">
              <div className="col-lg-1"></div>

              {/* Left Column: Register Form */}
              <div className="col-lg-5">
                <h3>Create an account</h3>
                <p className="font-md color-gray-500">Access to all features. No credit card required.</p>
                
                <div className="form-register mt-30 mb-30">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <label className="mb-5 font-sm color-gray-700">Full Name *</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Steven job"
                        {...register("fullName")}
                        required
                      />
                      {errors.fullName && (
                        <p className="text-red-500 mt-5" style={{ color: "#ef5350", fontSize: "11px" }}>{errors.fullName.message}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="mb-5 font-sm color-gray-700">Email *</label>
                      <input
                        className="form-control"
                        type="email"
                        placeholder="stevenjob@gmail.com"
                        {...register("email")}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 mt-5" style={{ color: "#ef5350", fontSize: "11px" }}>{errors.email.message}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="mb-5 font-sm color-gray-700">Username *</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="stevenjob"
                        {...register("username")}
                        required
                      />
                      {errors.username && (
                        <p className="text-red-500 mt-5" style={{ color: "#ef5350", fontSize: "11px" }}>{errors.username.message}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="mb-5 font-sm color-gray-700">Password *</label>
                      <input
                        className="form-control"
                        type="password"
                        placeholder="******************"
                        {...register("password")}
                        required
                      />
                      {errors.password && (
                        <p className="text-red-500 mt-5" style={{ color: "#ef5350", fontSize: "11px" }}>{errors.password.message}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="mb-5 font-sm color-gray-700">Re-Password *</label>
                      <input
                        className="form-control"
                        type="password"
                        placeholder="******************"
                        {...register("confirmPassword")}
                        required
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 mt-5" style={{ color: "#ef5350", fontSize: "11px" }}>{errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label>
                        <input
                          className="checkagree"
                          type="checkbox"
                          style={{ marginRight: "6px" }}
                          checked={agree}
                          onChange={(e) => setAgree(e.target.checked)}
                        />
                        By clicking Register button, you agree our terms and policy.
                      </label>
                    </div>

                    <div className="form-group">
                      <input className="font-md-bold btn btn-buy" type="submit" value="Register" />
                    </div>
                  </form>

                  <div className="mt-20">
                    <span className="font-xs color-gray-500 font-medium">Already have an account?</span>
                    <Link className="font-xs color-brand-3 font-medium" to="/login"> Sign In</Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Social Sign Up */}
              <div className="col-lg-5">
                <div className="box-login-social pt-65 pl-50">
                  <h5 className="text-center">Use Social Network Account</h5>
                  <div className="box-button-login mt-25">
                    <a className="btn btn-login font-md-bold color-brand-3 mb-15" href="#social" onClick={(e) => e.preventDefault()}>
                      Sign up with<img src="/assets/imgs/page/account/google.svg" alt="Google" style={{ marginLeft: "10px" }} />
                    </a>
                    <a className="btn btn-login font-md-bold color-brand-3 mb-15" href="#social" onClick={(e) => e.preventDefault()}>
                      Sign up with<span className="color-blue font-md-bold" style={{ color: "#1877f2", fontWeight: "bold", marginLeft: "10px" }}>Facebook</span>
                    </a>
                    <a className="btn btn-login font-md-bold color-brand-3 mb-15" href="#social" onClick={(e) => e.preventDefault()}>
                      Sign up with<img src="/assets/imgs/page/account/amazon.svg" alt="Amazon" style={{ marginLeft: "10px" }} />
                    </a>
                  </div>
                  <div className="mt-10 text-center">
                    <span className="font-xs color-gray-900">Buying for work? </span>
                    <a className="color-brand-1 font-xs" href="#business" onClick={(e) => e.preventDefault()}>Create a free business account</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="section-box box-newsletter">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7 col-sm-12">
                <h3 className="color-white">Subscrible &amp; Get <span className="color-warning">10%</span> Discount</h3>
                <p className="font-lg color-white">Get E-mail updates about our latest shop and <span className="font-lg-bold">special offers.</span></p>
              </div>
              <div className="col-lg-4 col-md-5 col-sm-12">
                <div className="box-form-newsletter mt-15">
                  <form className="form-newsletter" onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }}>
                    <input className="input-newsletter font-xs" type="email" placeholder="Your email Address" required />
                    <button className="btn btn-brand-2" type="submit">Sign Up</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RegisterPage;
