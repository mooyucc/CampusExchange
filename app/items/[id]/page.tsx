import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import ExchangeButton from "@/components/ExchangeButton";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ItemDetailBreadcrumb, ItemDetailNotFound, ItemDetailInfo, ItemDetailPublisher, ItemDetailOwnerMessage, ItemDetailLoginPrompt } from "@/components/ItemDetailContent";
import { ItemDetailTags } from "@/components/ItemDetailTags";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      owner: true,
      exchangeRequests: {
        where: session
          ? {
              requesterId: session.user.id,
            }
          : undefined,
        include: {
          requester: true,
        },
      },
    },
  });

  if (!item) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <ItemDetailNotFound />
      </div>
    );
  }

  const images = JSON.parse(item.images || "[]");
  const isOwner = session?.user.id === item.ownerId;
  const hasRequested = item.exchangeRequests.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <ItemDetailBreadcrumb itemTitle={item.title} />

        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* 图片区域 */}
            <div>
              {images.length > 0 ? (
                <div className="relative w-full h-96 rounded-lg overflow-hidden bg-beige-light">
                  <Image
                    src={images[0]}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-96 bg-beige-light rounded-lg flex items-center justify-center text-black/20">
                  <svg
                    className="w-24 h-24"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* 信息区域 */}
            <div>
              <ItemDetailTags category={item.category} condition={item.condition} status={item.status} />

              <h1 className="text-4xl font-serif font-normal text-black mb-6 tracking-tight">
                {item.title}
              </h1>

              <ItemDetailInfo>
                <p className="text-black/70 whitespace-pre-wrap leading-relaxed">
                  {item.description}
                </p>
              </ItemDetailInfo>

              <ItemDetailPublisher>
                <p className="text-black/70">
                  {item.owner.name}
                  {item.owner.grade && ` · ${item.owner.grade}`}
                </p>
              </ItemDetailPublisher>

              {session && !isOwner && item.status === "available" && (
                <ExchangeButton
                  itemId={item.id}
                  ownerId={item.ownerId}
                  hasRequested={hasRequested}
                  requestId={item.exchangeRequests[0]?.id}
                />
              )}

              {isOwner && <ItemDetailOwnerMessage />}

              {!session && <ItemDetailLoginPrompt />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

