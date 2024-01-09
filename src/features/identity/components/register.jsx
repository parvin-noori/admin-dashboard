import React from "react";
import logo from "@assets/images/logo.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onsubmit = (data) => console.log(data);

  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h2">پلتفرم آموزش آنلاین</h1>
        <p className="lead">
          جهت استفاده از ویژگی های پلتفرم آموزش آنلاین کلاسبن ثبت نام کنید
        </p>
        <p className="lead">
          قبلا ثبت نام کرده اید؟
          <Link to="/login" className="me-2">
            وارد شوید{" "}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="mb-3">
                <label className="form-label">موبایل</label>
                <input
                  className={`form-control form-control-lg ${
                    errors.mobile && "is-invalid"
                  }`}
                  {...register("mobile", {
                    required: "وارد کردن شماره تلفن ضروری است",
                    maxLength: 11,
                    minLength: 11,
                  })}
                />
                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small fw-bold mt-1">
                    {errors.mobile?.message}
                  </p>
                )}
                {errors.mobile &&
                  (errors.mobile.type === "maxLength" ||
                    errors.mobile.type === "minLength") && (
                    <p className="text-danger small fw-bold mt-1">
                      شماره همراه باید ۱۱ رقم باشد
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">رمز عبور</label>
                <input
                  className={`form-control form-control-lg ${
                    errors.password && "is-invalid"
                  }`}
                  type="password"
                  {...register("password", {
                    required: "وارد کردن رمز عبور الزامی ست",
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bold mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">تکرار رمز عبور</label>
                <input
                  className={`form-control form-control-lg ${
                    errors.confirmPassword && "is-invalid"
                  }`}
                  type="password"
                  {...register("confirmPassword", {
                    required: "تکرار رمز عبور الزامی ست",
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return "عدم تطابق با رمز وارد شده";
                      }
                    },
                  })}
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <p className="text-danger small fw-bold mt-1">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
                   {errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <p className="text-danger small fw-bold mt-1">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-lg btn-primary">
                  ثبت نام کنید
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
