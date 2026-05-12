"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Search, Plus, Filter, MoreHorizontal, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import { students } from "@/mockData";

const statusColor: Record<string, string> = {
  "Đang học": "bg-success-light text-success-dark",
  "Hoàn thành": "bg-primary-light text-primary",
  "Tạm dừng": "bg-warning-light text-warning-dark",
};

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.includes(search);
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Quản lý học viên</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Danh sách học viên</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
          <Plus size={16} />
          Thêm học viên
        </button>
      </div>

      <Card>
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full pl-9 pr-3 py-2 border border-border rounded-btn text-sm outline-none focus:border-primary bg-white"
              placeholder="Tìm học viên, mã học viên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="border border-border rounded-btn px-3 py-2 text-sm outline-none bg-white"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="Đang học">Đang học</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Tạm dừng">Tạm dừng</option>
          </select>
          <button className="flex items-center gap-2 border border-border rounded-btn px-3 py-2 text-sm text-text-muted hover:bg-gray-50">
            <Filter size={14} />
            Bộ lọc
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-text-muted rounded-tl-md">Mã HV</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Họ và tên</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Liên hệ</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Lớp đang học</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Trạng thái</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Số dư học phí</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Ngày vào</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted rounded-tr-md">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-text-muted">{s.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-violet-400 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {s.name[0]}
                      </div>
                      <span className="font-semibold text-text-main">{s.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-muted">
                    <div>{s.email}</div>
                    <div className="text-xs">{s.phone}</div>
                  </td>
                  <td className="py-3 px-4 text-text-main">{s.class}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[s.status]}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-text-main">{s.balance}</td>
                  <td className="py-3 px-4 text-text-muted">{s.joined}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Link href={`/admin/students/${s.id}`}>
                        <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-primary-light text-text-muted hover:text-primary transition-colors">
                          <Eye size={15} />
                        </button>
                      </Link>
                      <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-gray-100 text-text-muted transition-colors">
                        <MoreHorizontal size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <p className="text-sm text-text-muted">Hiển thị {filtered.length}/{students.length} học viên</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-btn flex items-center justify-center border border-border hover:bg-gray-50 text-text-muted">
              <ChevronLeft size={15} />
            </button>
            <button className="w-8 h-8 rounded-btn bg-primary text-white text-sm font-medium">1</button>
            <button className="w-8 h-8 rounded-btn flex items-center justify-center border border-border hover:bg-gray-50 text-text-muted text-sm">2</button>
            <button className="w-8 h-8 rounded-btn flex items-center justify-center border border-border hover:bg-gray-50 text-text-muted">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
