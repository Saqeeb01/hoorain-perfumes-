import React, { useState } from "react";
import { Section } from "../Section";
import { LoginForm } from "../LoginForm";
import { ProductManager } from "../ProductManager";
import { Product } from "../ProductGrid";

export function Admin({ products }: { products: Product[] }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (password: string) => {
    if (password === "password") {
      setLoggedIn(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleUpdate = (updatedProducts: Product[]) => {
    const data = {
      products: updatedProducts,
      // I need to get the heroImages from somewhere. For now, I'll hardcode them.
      heroImages: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1608571424402-0a3c9e4c0b56?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1920&auto=format&fit=crop",
      ],
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();

    URL.revokeObjectURL(url);

    alert(
      "data.json file has been downloaded. Please replace the existing file in the src directory."
    );
  };

  return (
    <Section title="Admin Panel" subtitle="Manage your products">
      {loggedIn ? (
        <ProductManager products={products} onUpdate={handleUpdate} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </Section>
  );
}
