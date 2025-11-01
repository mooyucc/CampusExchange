import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import HomeContent from "@/components/HomeContent";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const items = await prisma.item.findMany({
    where: { status: "available" },
    include: { owner: true },
    orderBy: { createdAt: "desc" },
    take: 12,
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HomeContent items={items} />
    </div>
  );
}

