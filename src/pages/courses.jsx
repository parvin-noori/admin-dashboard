import React from "react";
import { httpInterceptedService } from "../core/http-service";
import CourseList from "../features/courses/components/course-list";

export default function Courses() {
  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex align-items-center justify-content-between mb-5">
          <a className="btn btn-primary fw-bolder mt-n1">افزودن دوره جدید</a>
        </div>
        <CourseList />
      </div>
    </div>
  );
}
export async function coursesList() {
  const response = await httpInterceptedService.get("/Course/list");
  return response.data;
}
