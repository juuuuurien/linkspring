import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Appearance = () => {
  return <div>appearance</div>;
};

export default Appearance;

Appearance.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
