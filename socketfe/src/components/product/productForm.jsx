import React from "react";
import Select from "../Select";

const ProductForm = ({ productData, setProductData, errors, setError }) => {
  const handleChange = (e, val) => {
    console.log("🚀 ~ handleChange ~ val:", val, e);
    setProductData({
      ...productData,
      [val ? e : e?.target?.name]: val ? val : e?.target?.value,
    });

    console.log("🚀  ~ handleChange ~ errors:", errors);
    delete errors[val ? e : e?.target?.name];
    setError({ ...(errors || {}) });
  };

  const categoryOptions = [
    {
      label: "Electronics",
      value: "Electronics",
    },
    {
      label: "Clothing",
      value: "Clothing",
    },
    {
      label: "Grocery",
      value: "Grocery",
    },
    {
      label: "Books",
      value: "Books",
    },
    {
      label: "Furniture",
      value: "Furniture",
    },
  ];
  const handleFile = async (e) => {
    const files = e?.target?.files;
    console.log(
      "🚀 ~ file: modalComponent.jsx ~ handleFile ~ e",
      e.target.files,
      Array.from(files)
    );
    let imageData = await Promise.all(
      Array.from(files).map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target.result);
          };
          reader.readAsDataURL(file);
        });
      })
    );
    console.log("🚀 ~ handleFile ~ imageData:", imageData);
    setProductData({
      ...productData,
      images: [...(productData?.images || []), ...imageData],
    });
    delete errors["images"];
    setError({ ...errors });
  };

  const removeImage = (index) => {
    setProductData({
      ...productData,
      images: productData?.images?.filter((_, i) => i !== index),
    });
  };
  return (
    <div>
      <div className="max-w-[650px] mx-auto px-4 bg-gray-800 rounded-md shadow-md form-container">
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={productData?.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            />
            {errors?.name && (
              <p className="text-red-500 mt-2 text-[11px]">{errors?.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Price
            </label>
            <input
              type="number"
              id="email"
              onChange={handleChange}
              name="price"
              value={productData?.price}
              placeholder="price"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            />
            {errors?.price && (
              <p className="text-red-500 mt-2 text-[11px]">{errors?.price}</p>
            )}
          </div>
          {/* <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              SKU
            </label>
            <input
              type="string"
              maxLength={10}
              id="email"
              onChange={handleChange}
              name="sku"
              value={productData?.sku}
              placeholder="sku"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            />
            {errors?.sku && (
              <p className="text-red-500 mt-2 text-[11px]">{errors?.sku}</p>
            )}
          </div> */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Stock quantity
            </label>
            <input
              type="number"
              id="email"
              onChange={handleChange}
              name="stockQty"
              value={productData?.stockQty}
              placeholder="stock quantity"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            />
            {errors?.stockQty && (
              <p className="text-red-500 mt-2 text-[11px]">
                {errors?.stockQty}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Discount
            </label>
            <input
              type="number"
              id="email"
              onChange={handleChange}
              name="discount"
              value={productData?.discount}
              placeholder="stock quantity"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            />
            {errors?.discount && (
              <p className="text-red-500 mt-2 text-[11px]">
                {errors?.discount}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Category
            </label>
            <Select
              // value={selectedOption}
              onChange={(e) => handleChange("category", e?.value)}
              name={"category"}
              value={categoryOptions?.find(
                (emp) => emp?.value === productData?.category
              )}
              // onChange={this.handleChange}
              options={categoryOptions}
            />

            {errors?.category && (
              <p className=" text-red-500 mt-2 text-[11px]">
                {errors?.category}
              </p>
            )}
          </div>
          <div className="mb-4 ">
            <div className="mb-6 pt-4">
              <label className="mb-5 block text-xl font-semibold text-white">
                Upload File
              </label>

              <div className="mb-8">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="sr-only"
                  multiple
                  onChange={handleFile}
                />
                <label
                  htmlFor="file"
                  className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                >
                  <div>
                    <span className="mb-2 block text-xl font-semibold text-white">
                      Drop files here
                    </span>
                    <span className="mb-2 block text-base font-medium text-slate-400">
                      Or
                    </span>
                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-white">
                      Browse
                    </span>
                  </div>
                </label>
              </div>
              <section className="py-2 ">
                <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {productData?.images?.map((image, index) => {
                    return (
                      <article className="rounded-xl  shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                        <a href="#">
                          <div className="relative flex items-end overflow-hidden rounded-xl">
                            <img
                              src={image}
                              alt="Hotel Photo"
                              className="h-[130px] w-[190px]"
                            />
                            <button
                              className="text-[#07074D] absolute top-0 right-0 mr-3 mt-3"
                              onClick={() => removeImage(index)}
                              type="button"
                            >
                              <svg
                                width="10"
                                height="10"
                                viewBox="0 0 10 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                                  fill="currentColor"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          </div>
                        </a>
                      </article>
                    );
                  })}
                </div>
                {errors?.images && (
                  <p className=" text-red-500 mt-2 text-[11px]">
                    {errors?.images}
                  </p>
                )}
              </section>
            </div>
          </div>
          <div className="mb-4"></div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
