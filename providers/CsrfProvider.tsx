"use client";

import { ensureCsrfToken } from "@/lib/csrf.client";
import { useEffect } from "react";

export default function CsrfProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void ensureCsrfToken();
  }, []);

  return <>{children}</>;
}
