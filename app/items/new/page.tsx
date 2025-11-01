import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ItemForm from "@/components/ItemForm";
import Navbar from "@/components/Navbar";
import NewItemPageHeader from "@/components/NewItemPageHeader";

// 强制动态渲染，避免构建时连接数据库
export const dynamic = 'force-dynamic';

export default async function NewItemPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <NewItemPageHeader />
        
        <ItemForm />
      </main>
    </div>
  );
}

