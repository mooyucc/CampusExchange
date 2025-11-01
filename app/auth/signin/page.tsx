"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/contexts/LanguageContext";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type SigninForm = z.infer<typeof signinSchema>;

function SigninForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setRegistered(true);
    }
  }, [searchParams]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninForm) => {
    setLoading(true);
    setError("");
    setRegistered(false);

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError(t.auth.signIn.error);
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-32">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-sm p-10">
        <h1 className="text-4xl font-serif font-normal text-center mb-8 text-black tracking-tight">
          {t.auth.signIn.title}
        </h1>

        {registered && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {t.auth.signIn.success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.auth.signIn.email}
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={t.auth.signIn.emailPlaceholder}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t.auth.signIn.password}
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder={t.auth.signIn.passwordPlaceholder}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t.auth.signIn.submitting : t.auth.signIn.submit}
          </button>
        </form>

        <p className="mt-8 text-center text-black/70">
          {t.auth.signIn.noAccount}{" "}
          <Link href="/auth/signup" className="text-primary-600 hover:text-primary-700 font-semibold transition">
            {t.auth.signIn.signUp}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SigninPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-32">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-lg shadow-sm p-10">
          <h1 className="text-4xl font-serif font-normal text-center mb-8 text-black tracking-tight">
            登录
          </h1>
          <div className="animate-pulse">加载中...</div>
        </div>
      </div>
    }>
      <SigninForm />
    </Suspense>
  );
}

