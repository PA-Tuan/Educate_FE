"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Calendar, Users, Phone, Briefcase, UserCircle,
  GraduationCap, FileText, BookOpen, ClipboardList, HelpCircle,
  UserCheck, DollarSign, ChevronRight, ChevronDown, Menu
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  children?: NavItem[];
}

const navGroups = [
  {
    group: "OVERVIEW",
    items: [
      { label: "Tổng quan", icon: <LayoutDashboard size={18} />, href: "/admin/dashboard" },
      { label: "Lịch", icon: <Calendar size={18} />, href: "/admin/calendar" },
    ],
  },
  {
    group: "CRM",
    items: [
      { label: "Quản lý khách hàng", icon: <Users size={18} />, href: "/admin/customers" },
      { label: "Tổng đài quản lý", icon: <Phone size={18} />, href: "/admin/callcenter" },
    ],
  },
  {
    group: "HRM",
    items: [
      { label: "Quản lý công việc", icon: <Briefcase size={18} />, href: "/admin/tasks" },
      { label: "Quản lý nhân viên", icon: <UserCircle size={18} />, href: "/admin/users" },
      { label: "Quản lý giáo viên", icon: <GraduationCap size={18} />, href: "/admin/teacher" },
      { label: "Quản lý đơn xin nghỉ", icon: <FileText size={18} />, href: "/admin/leaves" },
    ],
  },
  {
    group: "QUẢN LÝ LỚP HỌC",
    items: [
      { label: "Quản lý khóa học", icon: <BookOpen size={18} />, href: "/admin/courses" },
      { label: "Quản lý lớp học", icon: <ClipboardList size={18} />, href: "/admin/classes" },
      { label: "Quản lý bài tập", icon: <FileText size={18} />, href: "/admin/homework" },
      { label: "Ngân hàng câu hỏi", icon: <HelpCircle size={18} />, href: "/admin/questions" },
    ],
  },
  {
    group: "QUẢN LÝ HỌC VIÊN",
    items: [
      { label: "Quản lý học viên", icon: <UserCheck size={18} />, href: "/admin/students" },
      { label: "Theo dõi số dư học phí", icon: <DollarSign size={18} />, href: "/admin/finance" },
    ],
  },
];

export default function Sidebar({ collapsed }: { collapsed?: boolean }) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "h-full flex flex-col bg-white border-r border-border transition-all duration-300 overflow-hidden shrink-0",
        collapsed ? "w-[70px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="h-[64px] flex items-center px-5 border-b border-border shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white font-black text-lg shadow-md shrink-0">
            N
          </div>
          {!collapsed && (
            <span className="font-bold text-[15px] text-text-main truncate">Center Brain</span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {navGroups.map((group) => (
          <div key={group.group} className="mb-2">
            {!collapsed && (
              <p className="text-[10px] font-semibold tracking-widest text-text-muted uppercase px-2 py-1 mb-1">
                {group.group}
              </p>
            )}
            {group.items.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 px-2 py-2 rounded-btn text-sm font-medium transition-all duration-150 group",
                    active
                      ? "bg-primary-light text-primary"
                      : "text-text-muted hover:bg-gray-100 hover:text-text-main"
                  )}
                >
                  <span className={cn("shrink-0", active ? "text-primary" : "text-gray-400 group-hover:text-text-main")}>
                    {item.icon}
                  </span>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {!collapsed && active && (
                    <ChevronRight size={14} className="ml-auto text-primary" />
                  )}
                </Link>
              );
            })}
            {collapsed && <hr className="my-1 border-border" />}
          </div>
        ))}
      </nav>
    </aside>
  );
}
