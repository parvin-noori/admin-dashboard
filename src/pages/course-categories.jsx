import React, { Suspense } from "react";
import { defer, useLoaderData, Await } from "react-router-dom";
import { httpInterceptedService } from "../core/http-service";
import CategoryList from "../features/categories/components/category-list";

export default function CourseCategories() {
  const data = useLoaderData();
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <a className="btn btn-primary fw-bolder mt-n1">افزودن دسته جدید</a>
        </div>
   
        <Suspense fallback={<p className="text-info">در حال دریافت اطلاعات</p>}>
          <Await resolve={data.categories}>
            {(loadedCategories) => (
              <CategoryList categories={loadedCategories} />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}

export async function categoriesLoader() {
  return defer({
      categories: loadCategories(),
  });
}

const loadCategories = async () => {
  const response = await httpInterceptedService.get("/CourseCategory/sieve");
  return response.data;
};
