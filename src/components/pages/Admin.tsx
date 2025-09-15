import React, { useState, useEffect } from "react";
import { Section } from "../Section";
import { LoginForm } from "../LoginForm";
import { ProductManager } from "../ProductManager";
import { Product } from "../ProductGrid";

export function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>([]);

  useEffect(() => {
    if (loggedIn) {
      fetch("http://localhost:3001/api/products")
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setHeroImages(data.heroImages);
        })
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, [loggedIn]);

  const handleLogin = (password: string) => {
    if (password === "password") {
      setLoggedIn(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleUpdate = (
    updatedProducts: Product[],
    updatedHeroImages: string[]
  ) => {
    fetch("http://localhost:3001/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: updatedProducts,
        heroImages: updatedHeroImages,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Data updated successfully!");
        setProducts(updatedProducts);
        setHeroImages(updatedHeroImages);
      })
      .catch((err) => {
        console.error("Error updating data:", err);
        alert("Error updating data.");
      });
  };

  return (
    <Section title="Admin Panel" subtitle="Manage your products and images">
      {loggedIn ? (
        <ProductManager
          products={products}
          heroImages={heroImages}
          onUpdate={handleUpdate}
        />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </Section>
  );
}
