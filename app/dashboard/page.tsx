import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ItemCard from "@/components/ItemCard";
import ExchangeRequestCard from "@/components/ExchangeRequestCard";
import Navbar from "@/components/Navbar";
import DashboardContent from "@/components/DashboardContent";
import { DashboardSectionHeader, DashboardEmpty } from "@/components/DashboardSection";

// 强制动态渲染，避免构建时连接数据库
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const [myItems, myRequests, receivedRequests] = await Promise.all([
    prisma.item.findMany({
      where: { ownerId: session.user.id },
      include: { owner: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.exchangeRequest.findMany({
      where: { requesterId: session.user.id },
      include: {
        item: {
          include: { owner: true },
        },
        requester: true,
        receiver: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.exchangeRequest.findMany({
      where: { receiverId: session.user.id },
      include: {
        item: true,
        requester: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <DashboardContent>
          {/* 我的物品 */}
          <section className="mb-16">
            <DashboardSectionHeader type="myItems" />
            {myItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {myItems.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <DashboardEmpty type="myItems" />
            )}
          </section>

          {/* 我发送的请求 */}
          <section className="mb-16">
            <DashboardSectionHeader type="sentRequests" />
            {myRequests.length > 0 ? (
              <div className="space-y-4">
                {myRequests.map((request) => (
                  <ExchangeRequestCard
                    key={request.id}
                    request={request}
                    type="sent"
                  />
                ))}
              </div>
            ) : (
              <DashboardEmpty type="sentRequests" />
            )}
          </section>

          {/* 收到的请求 */}
          <section>
            <DashboardSectionHeader type="receivedRequests" />
            {receivedRequests.length > 0 ? (
              <div className="space-y-4">
                {receivedRequests.map((request) => (
                  <ExchangeRequestCard
                    key={request.id}
                    request={request}
                    type="received"
                  />
                ))}
              </div>
            ) : (
              <DashboardEmpty type="receivedRequests" />
            )}
          </section>
        </DashboardContent>
      </main>
    </div>
  );
}

