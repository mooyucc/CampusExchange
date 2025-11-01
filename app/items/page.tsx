import { prisma } from "@/lib/prisma";
import ItemCard from "@/components/ItemCard";
import { Suspense } from "react";
import ItemsFilter from "@/components/ItemsFilter";
import Navbar from "@/components/Navbar";
import ItemsPageHeader from "@/components/ItemsPageHeader";
import NoItemsMessage from "@/components/NoItemsMessage";
import LoadingSpinner from "@/components/LoadingSpinner";

interface SearchParams {
  category?: string;
  condition?: string;
  search?: string;
}

export default async function ItemsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const { category, condition, search } = params;

  const where: any = { status: "available" };

  if (category) where.category = category;
  if (condition) where.condition = condition;
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const items = await prisma.item.findMany({
    where,
    include: { owner: true },
    orderBy: { createdAt: "desc" },
  });

  const categories = [
    "书籍",
    "文具",
    "电子产品",
    "服装",
    "体育用品",
    "其他",
  ];

  const conditions = ["全新", "良好", "一般", "需修理"];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <ItemsPageHeader />

        <Suspense fallback={<LoadingSpinner />}>
          <ItemsFilter
            categories={categories}
            conditions={conditions}
            currentCategory={category}
            currentCondition={condition}
            currentSearch={search}
          />
        </Suspense>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {items.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <NoItemsMessage />
        )}
      </main>
    </div>
  );
}

