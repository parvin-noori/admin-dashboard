import React from "react";
import { useForm } from "react-hook-form";
import { httpInterceptedService } from "../../../core/http-service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddOrUpdateCategory({ setShowAddCategory }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setShowAddCategory(false);
    const response = httpInterceptedService.post(`/CourseCategory/`, data);
    toast.promise(
      response,
      {
        pending: "در حال ذخیره اطلاعات ...",
        success: {
          render() {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
            return "عملیات با موفقیت انجام شد";
          },
        },
        error: {
          render({ data }) {
            if (data.response.status === 400) {
              return t("categoryList." + data.response.data.code);
            } else {
              return "خطار در انجام عملیات";
            }
          },
        },
      },
      {
        position: toast.POSITION.BOTTOM_LEFT,
      }
    );
  };
  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <div>
              <label className="form-label">نام</label>
              <input
                {...register("name", { required: true })}
                className={`form-control form-control-lg ${
                  errors.name && "is-invalid"
                }`}
              />
              {errors.name && errors.name.type === "required" && (
                <p className="text-danger small fw-bold mt-1 ">
                  نام الزامی است
                </p>
              )}
            </div>
            <div className="text-start mt-3">
              <button
                className="btn btn-lg btn-secondary ms-2"
                type="button"
                onClick={() => setShowAddCategory(false)}
              >
                بستن
              </button>
              <button className="btn btn-lg btn-primary ms-2" type="submit">
                ثبت تغییرات
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
