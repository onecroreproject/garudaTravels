"use client";

import TemplePackageForm from "@/components/temple-package-form";

import { use } from "react";

export default function EditTemplePackagePage({ params }) {
  const { id } = use(params);
  return <TemplePackageForm packageId={id} />;
}
