import React, { Suspense, useState } from "react";
import { defer, useLoaderData, Await, useNavigate } from "react-router-dom";
import { httpInterceptedService } from "../core/http-service";
import CategoryList from "../features/categories/components/category-list";
import Modal from "../components/modal";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function CourseCategories() {
  const data = useLoaderData();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const { t } = useTranslation();

  const deleteCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowDeleteModal(true);
  };

  const navigate = useNavigate();

  const handleDeleteCategory = async () => {
    setShowDeleteModal(false);
    const response = httpInterceptedService.delete(
        `/CourseCategory/${selectedCategory}`
    );

    toast.promise(
        response,
        {
            pending: "در حال حذف ...",
            success: {
                render() {
                    const url = new URL(window.location.href);
                    navigate(url.pathname + url.search);
                    return "عملیات با موفقیت انجام شد";
                },
            },
            error: {
                render({ data }) {
                    return t("categoryList." + data.response.data.code);
                },
            },
        },
        {
            position: toast.POSITION.BOTTOM_LEFT,
        }
    );
};
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <a className="btn btn-primary fw-bolder mt-n1">افزودن دسته جدید</a>
          </div>

          <Suspense
            fallback={<p className="text-info">در حال دریافت اطلاعات</p>}
          >
            <Await resolve={data.categories}>
              {(loadedCategories) => (
                <CategoryList
                  deleteCategory={deleteCategory}
                  categories={loadedCategories}
                />
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <Modal
        isOpen={showDeleteModal}
        open={setShowDeleteModal}
        title="حذف"
        body="آیا از حذف این دسته اطمینان دارید؟"
      >
        <button
          className="btn btn-secondary fw-bolder"
          onClick={() => setShowDeleteModal(false)}
        >
          انصراف
        </button>
        <button
          className="btn btn-primary fw-bolder"
          onClick={handleDeleteCategory}
        >
          حذف
        </button>
      </Modal>
    </>
  );
}

export async function categoriesLoader({ request }) {
  return defer({
    categories: loadCategories(request),
  });
}

const loadCategories = async (request) => {
  const page = new URL(request.url).searchParams.get("page") || 1;
  const pageSize = import.meta.env.VITE_PAGEE_SIZE;
  let url = "/CourseCategory/sieve";
  url += `?page=${page}&pageSize=${pageSize}`;
  const response = await httpInterceptedService.get(url);
  return response.data;
};
