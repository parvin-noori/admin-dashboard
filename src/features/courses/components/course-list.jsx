import React from "react";
import { useLoaderData } from "react-router-dom";
import Course from "./course";

export default function CourseList({courses}) {
  return (
    <div className="row">
      {courses.map((course) => (
        <div className="col-xxl-3 col-md-6" key={course.id}>
          <Course {...course} />
        </div>
      ))}
    </div>
  );
}
