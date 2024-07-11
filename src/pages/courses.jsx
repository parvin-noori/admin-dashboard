import React, { Suspense } from "react";
import { httpInterceptedService } from "../core/http-service";
import CourseList from "../features/courses/components/course-list";
import { Await, defer, useLoaderData } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Courses() {
  const { t } = useTranslation();

  const data = useLoaderData();
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <a className="btn btn-primary fw-bolder mt-n1"> {t("pages.courses.AddNewCourse")}</a>
        </div>
        <Suspense fallback={<p className="text-info">در حال دریافت اطلاعات</p>}>
          <Await resolve={data.courses}>
            {(loadedCourses) => <CourseList courses={loadedCourses} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
export async function coursesList() {
  return defer({
    courses: loadCourses(),
  });
}
const loadCourses = async () => {
  const response = await httpInterceptedService.get("/Course/list");
  return response.data;
};
