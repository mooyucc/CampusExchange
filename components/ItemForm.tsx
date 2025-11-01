"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";

const itemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
  category: z.string().min(1),
  condition: z.string().min(1),
  images: z.array(z.string()).optional(),
});

type ItemFormData = z.infer<typeof itemSchema>;

export default function ItemForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // 简单的本地预览，实际项目中应该上传到云存储
    const urls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        urls.push(url);
        if (urls.length === files.length) {
          setImageUrls([...imageUrls, ...urls]);
          setValue("images", [...imageUrls, ...urls]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ItemFormData) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          images: imageUrls,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error || t.item.form.publishFailed);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError(t.item.form.networkError);
      setLoading(false);
    }
  };

  const getCategoryLabel = (cat: string) => {
    return (t.items.categoryOptions as Record<string, string>)[cat] || cat;
  };

  const getConditionLabel = (cond: string) => {
    return (t.items.conditionOptions as Record<string, string>)[cond] || cond;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.item.form.titleLabel}
          </label>
          <input
            {...register("title")}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder={t.item.form.titlePlaceholder}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.item.form.descriptionLabel}
          </label>
          <textarea
            {...register("description")}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder={t.item.form.descriptionPlaceholder}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.item.form.categoryLabel}
            </label>
            <select
              {...register("category")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">{t.item.form.selectPlaceholder}</option>
              <option value="书籍">{getCategoryLabel("书籍")}</option>
              <option value="文具">{getCategoryLabel("文具")}</option>
              <option value="电子产品">{getCategoryLabel("电子产品")}</option>
              <option value="服装">{getCategoryLabel("服装")}</option>
              <option value="体育用品">{getCategoryLabel("体育用品")}</option>
              <option value="其他">{getCategoryLabel("其他")}</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.item.form.conditionLabel}
            </label>
            <select
              {...register("condition")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">{t.item.form.selectPlaceholder}</option>
              <option value="全新">{getConditionLabel("全新")}</option>
              <option value="良好">{getConditionLabel("良好")}</option>
              <option value="一般">{getConditionLabel("一般")}</option>
              <option value="需修理">{getConditionLabel("需修理")}</option>
            </select>
            {errors.condition && (
              <p className="mt-1 text-sm text-red-600">
                {errors.condition.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t.item.form.imagesLabel}
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {imageUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`预览 ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newUrls = imageUrls.filter((_, i) => i !== index);
                      setImageUrls(newUrls);
                      setValue("images", newUrls);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t.item.form.submitting : t.item.form.submit}
        </button>
      </form>
    </div>
  );
}

