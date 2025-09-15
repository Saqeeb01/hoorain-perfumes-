import React, { useState } from "react";
import { Product } from "./ProductGrid";
import { classNames, goldText } from "../utils";

export function ProductManager({
  products,
  heroImages,
  onUpdate,
}: {
  products: Product[];
  heroImages: string[];
  onUpdate: (products: Product[], heroImages: string[]) => void;
}) {
  const [localProducts, setLocalProducts] = useState(products);
  const [localHeroImages, setLocalHeroImages] = useState(heroImages);

  const handleProductChange = (id: string, field: string, value: any) => {
    const newProducts = localProducts.map((p) => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    });
    setLocalProducts(newProducts);
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: `new-product-${Date.now()}`,
      name: "New Product",
      note: "",
      price: 0,
      img: "",
      tag: "New",
      category: "perfumes",
    };
    setLocalProducts([...localProducts, newProduct]);
  };

  const handleDeleteProduct = (id: string) => {
    const newProducts = localProducts.filter((p) => p.id !== id);
    setLocalProducts(newProducts);
  };

  const handleHeroImageChange = (index: number, value: string) => {
    const newHeroImages = [...localHeroImages];
    newHeroImages[index] = value;
    setLocalHeroImages(newHeroImages);
  };

  const handleAddHeroImage = () => {
    setLocalHeroImages([...localHeroImages, ""]);
  };

  const handleRemoveHeroImage = (index: number) => {
    const newHeroImages = [...localHeroImages];
    newHeroImages.splice(index, 1);
    setLocalHeroImages(newHeroImages);
  };

  const handleSave = () => {
    onUpdate(localProducts, localHeroImages);
  };

  const categories = ["perfumes", "attar", "agarbatti"];

  return (
    <div className="space-y-4">
      <h3 className={classNames("text-2xl font-serif mb-4", goldText)}>
        Manage Products
      </h3>
      <button
        onClick={handleAddProduct}
        className="mb-4 px-4 py-2.5 rounded-xl bg-green-500 text-white font-semibold hover:brightness-95"
      >
        Add New Product
      </button>

      {localProducts.map((product) => (
        <div
          key={product.id}
          className="p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="flex justify-between items-center">
            <div className="font-serif text-lg">{product.name}</div>
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs"
            >
              Delete
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="grid gap-2">
              <label className="text-sm text-yellow-200/80">Name</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) =>
                  handleProductChange(product.id, "name", e.target.value)
                }
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-yellow-200/80">Price</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) =>
                  handleProductChange(
                    product.id,
                    "price",
                    Number(e.target.value)
                  )
                }
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-yellow-200/80">Image URL</label>
              <input
                type="text"
                value={product.img}
                onChange={(e) =>
                  handleProductChange(product.id, "img", e.target.value)
                }
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-yellow-200/80">Note</label>
              <input
                type="text"
                value={product.note}
                onChange={(e) =>
                  handleProductChange(product.id, "note", e.target.value)
                }
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-yellow-200/80">Tag</label>
              <input
                type="text"
                value={product.tag}
                onChange={(e) =>
                  handleProductChange(product.id, "tag", e.target.value)
                }
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-yellow-200/80">Category</label>
              <select
                value={product.category}
                onChange={(e) =>
                  handleProductChange(product.id, "category", e.target.value)
                }
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      <h3 className={classNames("text-2xl font-serif mt-8 mb-4", goldText)}>
        Manage Hero Images
      </h3>
      <div className="space-y-4">
        {localHeroImages.map((image, index) => (
          <div key={index} className="flex items-center gap-4">
            <input
              type="text"
              value={image}
              onChange={(e) => handleHeroImageChange(index, e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
            />
            <button
              onClick={() => handleRemoveHeroImage(index)}
              className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddHeroImage}
        className="mt-4 px-4 py-2.5 rounded-xl bg-green-500 text-white font-semibold hover:brightness-95"
      >
        Add Hero Image
      </button>

      <div className="mt-8">
        <button
          onClick={handleSave}
          className="px-4 py-2.5 rounded-xl bg-yellow-400 text-black font-semibold hover:brightness-95"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
}
