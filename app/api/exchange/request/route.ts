import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "未登录" }, { status: 401 });
    }

    const body = await request.json();
    const { itemId, message } = body;

    const item = await prisma.item.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      return NextResponse.json({ error: "物品不存在" }, { status: 404 });
    }

    if (item.ownerId === session.user.id) {
      return NextResponse.json(
        { error: "不能对自己发布的物品发起请求" },
        { status: 400 }
      );
    }

    if (item.status !== "available") {
      return NextResponse.json(
        { error: "该物品不可交换" },
        { status: 400 }
      );
    }

    // 检查是否已有请求
    const existingRequest = await prisma.exchangeRequest.findFirst({
      where: {
        requesterId: session.user.id,
        itemId,
        status: "pending",
      },
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: "您已发送过交换请求" },
        { status: 400 }
      );
    }

    const exchangeRequest = await prisma.exchangeRequest.create({
      data: {
        requesterId: session.user.id,
        receiverId: item.ownerId,
        itemId,
        message: message || null,
      },
    });

    return NextResponse.json({ request: exchangeRequest }, { status: 201 });
  } catch (error) {
    console.error("Create exchange request error:", error);
    return NextResponse.json(
      { error: "请求失败，请重试" },
      { status: 500 }
    );
  }
}

