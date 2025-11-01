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
    const { title, description, category, condition, images } = body;

    if (!title || !description || !category || !condition) {
      return NextResponse.json(
        { error: "请填写所有必填项" },
        { status: 400 }
      );
    }

    const item = await prisma.item.create({
      data: {
        title,
        description,
        category,
        condition,
        images: JSON.stringify(images || []),
        ownerId: session.user.id,
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error("Create item error:", error);
    return NextResponse.json(
      { error: "发布失败，请重试" },
      { status: 500 }
    );
  }
}

