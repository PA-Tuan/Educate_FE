"use client";

import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Card className="w-full max-w-md p-8 shadow-card rounded-card">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-text-main mb-2">Quên mật khẩu</h1>
        <p className="text-text-muted">
          {isSubmitted 
            ? "Kiểm tra email của bạn để đặt lại mật khẩu" 
            : "Nhập email của bạn để nhận liên kết đặt lại mật khẩu"}
        </p>
      </div>

      {!isSubmitted ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-text-main mb-1" htmlFor="email">
              Email
            </label>
            <Input id="email" type="email" placeholder="Nhập email của bạn" required />
          </div>

          <Button type="submit" className="w-full h-11 text-base">
            Gửi liên kết
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-success-light text-success-dark rounded-md text-sm border border-success/20">
            Chúng tôi đã gửi một liên kết khôi phục đến email của bạn. Vui lòng kiểm tra hộp thư đến (và thư mục rác).
          </div>
          <Button 
            type="button" 
            variant="secondary" 
            className="w-full h-11 text-base"
            onClick={() => router.push("/login")}
          >
            Quay lại trang đăng nhập
          </Button>
        </div>
      )}

      {!isSubmitted && (
        <div className="mt-6 text-center text-sm text-text-muted">
          Nhớ mật khẩu?{" "}
          <Link href="/login" className="text-primary hover:text-primary-dark font-medium transition-colors">
            Quay lại đăng nhập
          </Link>
        </div>
      )}
    </Card>
  );
}
