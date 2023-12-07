"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProductsProvider } from "@/contexts/ProductContext";
import { MyProductsProvider } from "@/contexts/MyProductsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
      <AuthProvider>
        <ProductsProvider>
          <MyProductsProvider>{children}</MyProductsProvider>
        </ProductsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
