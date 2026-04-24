"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Search, Plus, Filter, MoreHorizontal, Eye, Shield, ChevronLeft, ChevronRight } from "lucide-react";

const users = [
  { id: "NV-001", name: "Nguyễn Thị Lan", email: "lannt@centerbrain.vn", phone: "0901111111", role: "Admin", department: "Quản lý", status: "Hoạt động", lastLogin: "20/04/2024 14:32" },
  { id: "NV-002", name: "Trần Minh Đức", email: "ductm@centerbrain.vn", phone: "0902222222", role: "Tư vấn viên", department: "CRM", status: "Hoạt động", lastLogin: "20/04/2024 09:15" },
  { id: "NV-003", name: "Phạm Thị Thu", email: "thupt@centerbrain.vn", phone: "0903333333", role: "Kế toán", department: "Tài chính", status: "Hoạt động", lastLogin: "19/04/2024 17:00" },
  { id: "NV-004", name: "Lê Văn Khoa", email: "khoalv@centerbrain.vn", phone: "0904444444", role: "Tư vấn viên", department: "CRM", status: "Tạm khóa", lastLogin: "15/04/2024 10:00" },
  { id: "NV-005", name: "Vũ Thị Hằng", email: "hangvt@centerbrain.vn", phone: "0905555555", role: "Hành chính", department: "HRM", status: "Hoạt động", lastLogin: "20/04/2024 08:00" },
];

const roleColor: Record<string, string> = {
  "Admin": "bg-violet-100 text-violet-700",
  "Tư vấn viên": "bg-primary-light text-primary",
  "Kế toán": "bg-amber-100 text-amber-700",
  "Hành chính": "bg-emerald-100 text-emerald-700",
};

const statusColor: Record<string, string> = {
  "Hoạt động": "bg-success-light text-success-dark",
  "Tạm khóa": "bg-error-light text-error-dark",
};

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Quản lý nhân viên</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Quản lý nhân viên</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
          <Plus size={16} /> Thêm nhân viên
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tổng nhân viên", value: users.length, color: "text-primary bg-primary-light" },
          { label: "Đang hoạt động", value: users.filter(u => u.status === "Hoạt động").length, color: "text-success-dark bg-success-light" },
          { label: "Tạm khóa", value: users.filter(u => u.status === "Tạm khóa").length, color: "text-error-dark bg-error-light" },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-4 p-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>
              <Shield size={18} />
            </div>
            <div>
              <p className="text-xs text-text-muted">{s.label}</p>
              <p className="text-2xl font-bold text-text-main">{s.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full pl-9 pr-3 py-2 border border-border rounded-btn text-sm outline-none focus:border-primary bg-white"
              placeholder="Tìm nhân viên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 border border-border rounded-btn px-3 py-2 text-sm text-text-muted hover:bg-gray-50">
            <Filter size={14} /> Bộ lọc
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-text-muted">Mã NV</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Họ tên</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Vai trò</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Bộ phận</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Đăng nhập gần nhất</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Trạng thái</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-mono text-xs text-text-muted">{u.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-primary text-white text-xs font-bold flex items-center justify-center">{u.name[0]}</div>
                      <div>
                        <p className="font-semibold text-text-main">{u.name}</p>
                        <p className="text-xs text-text-muted">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${roleColor[u.role] ?? "bg-gray-100 text-gray-600"}`}>{u.role}</span>
                  </td>
                  <td className="py-3 px-4 text-text-muted">{u.department}</td>
                  <td className="py-3 px-4 text-xs text-text-muted">{u.lastLogin}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[u.status]}`}>{u.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-primary-light text-text-muted hover:text-primary transition-colors">
                        <Eye size={15} />
                      </button>
                      <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-gray-100 text-text-muted">
                        <MoreHorizontal size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <p className="text-sm text-text-muted">Hiển thị {filtered.length}/{users.length} nhân viên</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-btn border border-border hover:bg-gray-50 flex items-center justify-center text-text-muted"><ChevronLeft size={15} /></button>
            <button className="w-8 h-8 rounded-btn bg-primary text-white text-sm">1</button>
            <button className="w-8 h-8 rounded-btn border border-border hover:bg-gray-50 flex items-center justify-center text-text-muted"><ChevronRight size={15} /></button>
          </div>
        </div>
      </Card>
    </div>
  );
}
