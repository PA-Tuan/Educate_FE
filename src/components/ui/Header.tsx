"use client";

import { Bell, Globe, Search, Menu, ChevronDown, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

const breadcrumbMap: Record<string, string[]> = {
  "/admin/dashboard": ["Dashboard"],
  "/admin/customers": ["Dashboard", "Danh sách khách hàng"],
  "/admin/students": ["Dashboard", "Danh sách học viên"],
  "/admin/classes": ["Dashboard", "Quản lý lớp học"],
  "/admin/teacher": ["Dashboard", "Quản lý giáo viên"],
  "/admin/finance": ["Dashboard", "Theo dõi học phí"],
  "/admin/users": ["Dashboard", "Quản lý nhân viên"],
  "/admin/questions": ["Dashboard", "Ngân hàng câu hỏi"],
  "/admin/courses": ["Dashboard", "Quản lý khóa học"],
  "/admin/homework": ["Dashboard", "Quản lý bài tập"],
  "/admin/tasks": ["Dashboard", "Quản lý công việc"],
  "/admin/leaves": ["Dashboard", "Đơn xin nghỉ"],
  "/admin/calendar": ["Dashboard", "Lịch"],
  "/admin/callcenter": ["Dashboard", "Tổng đài quản lý"],
};

export default function Header({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const pathname = usePathname();
  const crumbs = breadcrumbMap[pathname] ?? ["Dashboard"];

  return (
    <header className="h-[64px] bg-white border-b border-border flex items-center justify-between px-5 gap-4 shrink-0 z-10">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-gray-100 text-text-muted transition-colors"
        >
          <Menu size={18} />
        </button>

        {/* Team badge */}
        <div className="flex items-center gap-1.5 border border-border rounded-btn px-3 py-1.5 text-sm font-semibold text-text-main cursor-pointer hover:bg-gray-50">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-blue-500" />
          Team 1
          <span className="bg-success-light text-success-dark text-[10px] px-1.5 py-0.5 rounded-full font-semibold">Cao cấp</span>
          <ChevronDown size={14} className="text-gray-400" />
        </div>

        {/* Balance */}
        <div className="flex items-center gap-1.5 bg-warning-light border border-warning/20 px-3 py-1.5 rounded-btn text-sm font-semibold text-warning-dark">
          <span className="text-base">🪙</span>
          Số dư: 1.000.000 ₫
        </div>
      </div>

      {/* Center */}
      <div className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-text-muted">
        <Sparkles size={16} className="text-primary" />
        Center Brain
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-gray-100 text-text-muted transition-colors">
          <Search size={17} />
        </button>
        <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-gray-100 text-text-muted transition-colors">
          <Globe size={17} />
        </button>
        {/* Flag */}
        <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-gray-100 text-base transition-colors">
          🇬🇧
        </button>
        <button className="relative w-8 h-8 rounded-btn flex items-center justify-center hover:bg-gray-100 text-text-muted transition-colors">
          <Bell size={17} />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-error rounded-full border border-white" />
        </button>
        <div className="flex items-center gap-2 ml-1 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-300 text-white font-bold text-[13px] flex items-center justify-center shadow-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
