"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Search, Plus, Filter, MoreHorizontal, Eye, Star, ChevronLeft, ChevronRight, Mail, Phone } from "lucide-react";

const teachers = [
  { id: "GV-001", name: "Nguyễn Minh Tuấn", email: "tuannm@centerbrain.vn", phone: "0901234567", subject: "TOEIC", classes: 3, students: 52, rating: 4.8, status: "Đang dạy", joined: "01/09/2022" },
  { id: "GV-002", name: "Trần Thị Hoa", email: "hoatt@centerbrain.vn", phone: "0912345678", subject: "IELTS", classes: 2, students: 30, rating: 4.9, status: "Đang dạy", joined: "15/01/2023" },
  { id: "GV-003", name: "Phạm Văn Lộc", email: "locpv@centerbrain.vn", phone: "0923456789", subject: "MOV", classes: 1, students: 12, rating: 4.5, status: "Đang dạy", joined: "01/03/2023" },
  { id: "GV-004", name: "Lê Thị Mai", email: "mailt@centerbrain.vn", phone: "0934567890", subject: "TOEIC", classes: 2, students: 28, rating: 4.7, status: "Đang dạy", joined: "01/06/2023" },
  { id: "GV-005", name: "Nguyễn Văn Hùng", email: "hungnv@centerbrain.vn", phone: "0945678901", subject: "PRM", classes: 0, students: 0, rating: 4.6, status: "Nghỉ phép", joined: "01/08/2022" },
  { id: "GV-006", name: "Đỗ Thị Lan", email: "landt@centerbrain.vn", phone: "0956789012", subject: "STR", classes: 1, students: 10, rating: 4.4, status: "Đang dạy", joined: "15/10/2023" },
];

const statusColor: Record<string, string> = {
  "Đang dạy": "bg-success-light text-success-dark",
  "Nghỉ phép": "bg-warning-light text-warning-dark",
  "Nghỉ việc": "bg-error-light text-error-dark",
};

export default function TeacherPage() {
  const [search, setSearch] = useState("");

  const filtered = teachers.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Quản lý giáo viên</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Quản lý giáo viên</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
          <Plus size={16} /> Thêm giáo viên
        </button>
      </div>

      {/* Teacher Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <Card key={t.id} className="flex flex-col gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-primary text-white font-bold text-lg flex items-center justify-center shrink-0">
                {t.name[0]}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-text-main truncate">{t.name}</p>
                <p className="text-xs text-text-muted">{t.id} · {t.subject}</p>
              </div>
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ${statusColor[t.status]}`}>{t.status}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center bg-gray-50 rounded-btn p-3">
              <div>
                <p className="text-lg font-bold text-text-main">{t.classes}</p>
                <p className="text-xs text-text-muted">Lớp</p>
              </div>
              <div>
                <p className="text-lg font-bold text-text-main">{t.students}</p>
                <p className="text-xs text-text-muted">Học viên</p>
              </div>
              <div>
                <div className="flex items-center justify-center gap-0.5">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span className="text-lg font-bold text-text-main">{t.rating}</span>
                </div>
                <p className="text-xs text-text-muted">Đánh giá</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-text-muted">
              <div className="flex items-center gap-2">
                <Mail size={12} className="shrink-0" />
                <span className="truncate">{t.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={12} className="shrink-0" />
                <span>{t.phone}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1 border-t border-border">
              <button className="flex-1 py-1.5 text-xs font-medium text-primary border border-primary rounded-btn hover:bg-primary-light transition-colors">
                Chi tiết
              </button>
              <button className="flex-1 py-1.5 text-xs font-medium text-text-muted border border-border rounded-btn hover:bg-gray-50 transition-colors">
                Lịch dạy
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Also a table view */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base text-text-main">Danh sách giáo viên</h3>
          <div className="relative max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="pl-8 pr-3 py-1.5 border border-border rounded-btn text-sm outline-none focus:border-primary bg-white"
              placeholder="Tìm giáo viên..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-text-muted">Mã GV</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Họ tên</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Môn giảng</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Lớp / HV</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Đánh giá</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Trạng thái</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-mono text-xs text-text-muted">{t.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-primary text-white text-xs font-bold flex items-center justify-center">{t.name[0]}</div>
                      <div>
                        <p className="font-semibold text-text-main">{t.name}</p>
                        <p className="text-xs text-text-muted">{t.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-text-main">{t.subject}</td>
                  <td className="py-3 px-4 text-text-muted">{t.classes} lớp · {t.students} HV</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <Star size={13} className="text-amber-400 fill-amber-400" />
                      <span className="font-medium text-text-main">{t.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[t.status]}`}>{t.status}</span>
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
      </Card>
    </div>
  );
}
