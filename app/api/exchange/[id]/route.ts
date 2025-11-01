import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const exchangeRequest = await prisma.exchangeRequest.findUnique({
      where: { id },
      include: { item: true },
    });

    if (!exchangeRequest) {
      return NextResponse.json({ error: "请求不存在" }, { status: 404 });
    }

    // 只有接收者可以接受或拒绝
    if (exchangeRequest.receiverId !== session.user.id) {
      return NextResponse.json({ error: "无权限" }, { status: 403 });
    }

    // 更新请求状态
    const updated = await prisma.exchangeRequest.update({
      where: { id },
      data: { status },
    });

    // 如果接受，更新物品状态为pending
    if (status === "accepted") {
      await prisma.item.update({
        where: { id: exchangeRequest.itemId },
        data: { status: "pending" },
      });
    }

    return NextResponse.json({ request: updated });
  } catch (error) {
    console.error("Update exchange request error:", error);
    return NextResponse.json(
      { error: "操作失败，请重试" },
      { status: 500 }
    );
  }
}

