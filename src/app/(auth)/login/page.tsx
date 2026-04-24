"use client";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/dashboard");
  };

  return (
    <Card className="w-full max-w-md p-8 shadow-card rounded-card">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-text-main mb-2">Đăng nhập</h1>
        <p className="text-text-muted">Vui lòng đăng nhập để truy cập hệ thống</p>
      </div>

      <form className="space-y-6" onSubmit={handleLogin}>
        <div>
          <label className="block text-sm font-medium text-text-main mb-1" htmlFor="email">
            Email
          </label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Nhập email của bạn" 
            required 
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-text-main" htmlFor="password">
              Mật khẩu
            </label>
            <Link 
              href="/forgot-password" 
              className="text-sm text-primary hover:text-primary-dark transition-colors"
            >
              Quên mật khẩu?
            </Link>
          </div>
          <Input 
            id="password" 
            type="password" 
            placeholder="Nhập mật khẩu" 
            required 
          />
        </div>

        <Button type="submit" className="w-full h-11 text-base">
          Đăng nhập
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-text-muted">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="text-primary hover:text-primary-dark font-medium transition-colors">
          Đăng ký ngay
        </Link>
      </div>
    </Card>
  );
}
