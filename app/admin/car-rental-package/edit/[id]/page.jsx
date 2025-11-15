"use client";

import CarRentalPackageForm from "@/components/car-rental-package-form";

import { use } from "react";

export default function EditCarRentalPackagePage({ params }) {
  const { id } = use(params);
  return <CarRentalPackageForm packageId={id} />;
}
