import React, { useEffect } from "react";
import logo from "@assets/images/logo.svg";
import {
  Link,
  Form,
  useSubmit,
  useNavigate,
  useNavigation,
  useActionData,
  useRouteError,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { httpService } from "@core/http-service";
import { useTranslation } from "react-i18next";

export default function register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const formSubmit = useSubmit();
  const onsubmit = (data) => {
    const { confirmPassword, ...formData } = data;
    formSubmit(formData, { method: "POST" });
  };

  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const isSuccessOperation = useActionData();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccessOperation) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [isSuccessOperation]);

  const routerErrors=useRouteError()

  const {t}=useTranslation()

  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h2"> {t('register.title')}</h1>
        <p className="lead">
          {t('register.introMessage')}
        </p>
        <p className="lead">
        {t('register.alreadyRegistered')}
          <Link to="/login" className="me-2">
          {t('register.signin')}{" "}
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <Form onSubmit={handleSubmit(onsubmit)}>
              <div className="mb-3">
                <label className="form-label">{t('login.mobile')}</label>
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
                    {t('register.validation.mobileRequired')}
                  </p>
                )}
                {errors.mobile &&
                  (errors.mobile.type === "maxLength" ||
                    errors.mobile.type === "minLength") && (
                    <p className="text-danger small fw-bold mt-1">
                      {t('register.mobileLength')}
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t('login.password')}</label>
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
                    {t('register.validation.passwordRequired')}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">{t('register.repeatPassword')}</label>
                <input
                  className={`form-control form-control-lg ${
                    errors.confirmPassword && "is-invalid"
                  }`}
                  type="password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return t("register.validation.notMatching");
                      }
                    },
                  })}
                />
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "required" && (
                    <p className="text-danger small fw-bold mt-1">
                      {t('register.validation.repeatPasswordRequired')}
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
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-lg btn-primary"
                >
                  {t('register.register')}
                  {/* {isSubmitting ? "در حال انجام عملیات" : "ثبت نام کنید"} */}
                </button>
              </div>
              {isSuccessOperation && (
                <div className="alert alert-success text-success p-2 mt-3">
                  {t('register.successOperation')}
                </div>
              )}
              {routerErrors &&(
                <div className="alert alert-danger text-danger p-2 mt-3">
                  {routerErrors.response?.data.map(error=>(
                    <p className="mb-0">  <p className="mb-0">{t(`register.validation.${error.code}`)}</p></p>
                  ))}
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function registerAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const response = await httpService.post("/Users", data);
  return response.status === 200;
}
