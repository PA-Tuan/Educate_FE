"use client";

import { Card } from "@/components/ui/Card";
import { BookOpen, Plus, Search, Filter, MoreHorizontal, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const courses = [
  { id: "KH-001", name: "TOEIC Cơ bản", code: "TOEIC-BASIC", classes: 4, students: 72, duration: "3 tháng", fee: "3.500.000 ₫", status: "Đang mở" },
  { id: "KH-002", name: "IELTS 6.5+", code: "IELTS-65", classes: 2, students: 30, duration: "5 tháng", fee: "6.000.000 ₫", status: "Đang mở" },
  { id: "KH-003", name: "MOV Foundation", code: "MOV-FOUND", classes: 1, students: 12, duration: "2 tháng", fee: "2.000.000 ₫", status: "Đang mở" },
  { id: "KH-004", name: "PRM Advanced", code: "PRM-ADV", classes: 0, students: 0, duration: "4 tháng", fee: "5.000.000 ₫", status: "Tạm dừng" },
  { id: "KH-005", name: "STR Speaking", code: "STR-SPEAK", classes: 1, students: 10, duration: "2 tháng", fee: "2.500.000 ₫", status: "Đang mở" },
];

const statusColor: Record<string, string> = {
  "Đang mở": "bg-success-light text-success-dark",
  "Tạm dừng": "bg-warning-light text-warning-dark",
  "Đã hết": "bg-gray-100 text-gray-600",
};

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const filtered = courses.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Quản lý khóa học</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Quản lý khóa học</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
          <Plus size={16} /> Tạo khóa học
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tổng khóa học", value: courses.length, icon: <BookOpen size={18} />, color: "bg-primary-light text-primary" },
          { label: "Đang mở", value: courses.filter(c => c.status === "Đang mở").length, icon: <BookOpen size={18} />, color: "bg-success-light text-success-dark" },
          { label: "Tổng học viên", value: courses.reduce((a, c) => a + c.students, 0), icon: <BookOpen size={18} />, color: "bg-violet-50 text-violet-600" },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-4 p-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>{s.icon}</div>
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
            <input className="w-full pl-9 pr-3 py-2 border border-border rounded-btn text-sm outline-none focus:border-primary" placeholder="Tìm khóa học..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="flex items-center gap-2 border border-border rounded-btn px-3 py-2 text-sm text-text-muted hover:bg-gray-50">
            <Filter size={14} /> Bộ lọc
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                {["Mã KH", "Tên khóa học", "Lớp học", "Học viên", "Thời lượng", "Học phí", "Trạng thái", "Thao tác"].map(h => (
                  <th key={h} className="text-left py-3 px-4 font-medium text-text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-mono text-xs text-text-muted">{c.id}</td>
                  <td className="py-3 px-4"><p className="font-semibold text-text-main">{c.name}</p><p className="text-xs text-text-muted">{c.code}</p></td>
                  <td className="py-3 px-4 text-text-muted">{c.classes} lớp</td>
                  <td className="py-3 px-4 text-text-muted">{c.students} HV</td>
                  <td className="py-3 px-4 text-text-muted">{c.duration}</td>
                  <td className="py-3 px-4 font-medium text-text-main">{c.fee}</td>
                  <td className="py-3 px-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[c.status]}`}>{c.status}</span></td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-primary-light text-text-muted hover:text-primary"><Eye size={15} /></button>
                      <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-gray-100 text-text-muted"><MoreHorizontal size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <p className="text-sm text-text-muted">Hiển thị {filtered.length}/{courses.length} khóa học</p>
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
