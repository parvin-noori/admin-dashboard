import React from "react";
import logo from "@assets/images/logo.svg";
import {
  Link,
  redirect,
  useNavigation,
  useRouteError,
  useSubmit,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { httpService } from "@core/http-service";

export default function login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitForm = useSubmit();

  const onSubmit = (data) => {
    submitForm(data, { method: "POST" });
  };

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const routerErrors = useRouteError();

  const { t } = useTranslation();
  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h2"> {t("login.title")}</h1>
        <p className="lead">{t("login.introMessage")}</p>
        <p className="lead">
          {t("login.areNotRegistered")}
          <Link to="/register" className="me-2">
            {t("login.register")}{" "}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t("login.mobile")}</label>
                <input
                  className={`form-control form-control-lg ${
                    errors.mobile && "is-invalid"
                  }`}
                  {...register("mobile", {
                    required: true,
                    maxLength: 11,
                    minLength: 11,
                  })}
                />
                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small fw-bold mt-1">
                    {t("login.validation.mobileRequired")}
                  </p>
                )}
                {errors.mobile &&
                  (errors.mobile.type === "maxLength" ||
                    errors.mobile.type === "minLength") && (
                    <p className="text-danger small fw-bold mt-1">
                      {t("register.mobileLength")}
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t("login.password")}</label>
                <input
                  className={`form-control form-control-lg ${
                    errors.password && "is-invalid"
                  }`}
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bold mt-1">
                    {t("login.validation.passwordRequired")}
                  </p>
                )}
              </div>
              <div className="text-center mt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg btn-primary"
                >
                  {isSubmitting ? t("login.signingin") : t("login.signin")}
                </button>
              </div>
              {routerErrors &&(
                <div className="alert alert-danger text-danger p-2 mt-3">
                  {routerErrors.response?.data.map(error=>(
                    <p className="mb-0">{t(`login.validation.${error.code}`)}</p>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function loginAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/Users/login", data);
  if (response.status === 200) {
    localStorage.setItem("token", response?.data.token);
    return redirect('/')
  }
}
