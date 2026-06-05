import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { HelpCircle } from "lucide-react";
import { SEO } from "../../components/common/SEO";
import { useAuth } from "../../hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data) => {
    const res = login(data.email, data.password);
    if (res.success) {
      if (res.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } else {
      setErrorMsg("Invalid email or password combinations.");
    }
  };

  return (
    <>
      <SEO title="Member Login - BUXAA" description="Sign in to your BUXAA account to manage orders, wishlist, and settings." />

      <main className="main">
        {/* Breadcrumb */}
        <div className="section-box">
          <div className="breadcrumbs-div">
            <div className="container">
              <ul className="breadcrumb">
                <li><Link className="font-xs color-gray-1000" to="/">Home</Link></li>
                <li><a className="font-xs color-gray-500" href="#page">Pages</a></li>
                <li><a className="font-xs color-gray-500" href="#login">Login</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Login Form Section */}
        <section className="section-box shop-template mt-60">
          <div className="container">
            <div className="row mb-100">
              <div className="col-lg-1"></div>
              
              {/* Left Column: Login Form */}
              <div className="col-lg-5">
                <h3>Member Login</h3>
                <p className="font-md color-gray-500">Welcome back!</p>
                
                {/* Admin Bypass note */}
                <div className="bg-yellow-50 border border-brand-gold border-opacity-30 p-3 rounded mt-20 mb-10 text-brand-dark" style={{ borderRadius: "4px", backgroundColor: "#fffde7", border: "1px solid #ffe082", padding: "12px" }}>
                  <div className="flex items-center gap-1.5 text-brand-gold font-bold mb-5" style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "bold" }}>
                    <HelpCircle className="w-4 h-4 text-brand-gold" style={{ width: "16px", height: "16px" }} />
                    <span>Quick Admin Demo</span>
                  </div>
                  <p className="font-xs color-gray-600" style={{ margin: 0, fontSize: "11px" }}>
                    Log in with email <span className="font-bold text-brand-primary" style={{ fontWeight: "bold" }}>admin@buxaa.com</span> (any password) to access the Admin Dashboard.
                  </p>
                </div>

                <div className="form-register mt-30 mb-30">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {errorMsg && (
                      <p className="text-red-500 font-bold mb-10" style={{ color: "#ef5350", fontWeight: "bold", fontSize: "12px" }}>{errorMsg}</p>
                    )}

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

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <label className="color-gray-500 font-xs">
                            <input className="checkagree" type="checkbox" style={{ marginRight: "6px" }} />Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-6 text-end">
                        <div className="form-group">
                          <a className="font-xs color-gray-500" href="#forgot" onClick={(e) => e.preventDefault()}>Forgot your password?</a>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <input className="font-md-bold btn btn-buy" type="submit" value="Sign In" />
                    </div>
                  </form>

                  <div className="mt-20">
                    <span className="font-xs color-gray-500 font-medium">Have not an account? </span>
                    <Link className="font-xs color-brand-3 font-medium" to="/register">Sign Up</Link>
                  </div>
                </div>
              </div>

              {/* Right Column (Spacer matching page-login.html layout) */}
              <div className="col-lg-5"></div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
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

export default LoginPage;
