import React from "react";
import { httpInterceptedService } from "../core/http-service";

export default function Courses() {
  return <div>courses</div>;
}
export async function coursesList() {
  const response = await httpInterceptedService.get("/Course/list");
  return response;
}
