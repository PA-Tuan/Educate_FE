"use client";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <Card className="w-full max-w-md p-8 shadow-card rounded-card">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-text-main mb-2">Đăng ký tài khoản</h1>
        <p className="text-text-muted">Tạo tài khoản mới cho Center Brain</p>
      </div>

      <form className="space-y-4" onSubmit={handleRegister}>
        <div>
          <label className="block text-sm font-medium text-text-main mb-1" htmlFor="name">
            Họ và tên
          </label>
          <Input id="name" type="text" placeholder="Nhập họ và tên" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-1" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" placeholder="Nhập email của bạn" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-1" htmlFor="password">
            Mật khẩu
          </label>
          <Input id="password" type="password" placeholder="Tạo mật khẩu" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-1" htmlFor="confirm-password">
            Xác nhận mật khẩu
          </label>
          <Input id="confirm-password" type="password" placeholder="Nhập lại mật khẩu" required />
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full h-11 text-base">
            Đăng ký
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-text-muted">
        Đã có tài khoản?{" "}
        <Link href="/login" className="text-primary hover:text-primary-dark font-medium transition-colors">
          Đăng nhập
        </Link>
      </div>
    </Card>
  );
}
