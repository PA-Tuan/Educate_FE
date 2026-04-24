"use client";
import { Card } from "@/components/ui/Card";
import { Briefcase, Plus, Search, ChevronLeft, ChevronRight, MoreHorizontal, Circle } from "lucide-react";
import { useState } from "react";

const tasks = [
  { id: "CV-001", title: "Tư vấn học viên mới - Nguyễn Trung Hiếu", assignee: "Trần Minh Đức", deadline: "21/04/2024", priority: "Cao", status: "Đang thực hiện" },
  { id: "CV-002", title: "Cập nhật tài liệu khóa học TOEIC 600", assignee: "Nguyễn Minh Tuấn", deadline: "22/04/2024", priority: "Trung bình", status: "Chưa bắt đầu" },
  { id: "CV-003", title: "Liên hệ học viên chưa đóng học phí", assignee: "Phạm Thị Thu", deadline: "20/04/2024", priority: "Cao", status: "Hoàn thành" },
  { id: "CV-004", title: "Sắp xếp lịch học bù lớp IELTS 6.5", assignee: "Vũ Thị Hằng", deadline: "23/04/2024", priority: "Thấp", status: "Chưa bắt đầu" },
  { id: "CV-005", title: "Gửi thông báo khai giảng lớp mới", assignee: "Trần Minh Đức", deadline: "25/04/2024", priority: "Trung bình", status: "Đang thực hiện" },
];

const statusColor: Record<string, string> = {
  "Đang thực hiện": "bg-primary-light text-primary",
  "Chưa bắt đầu": "bg-gray-100 text-gray-600",
  "Hoàn thành": "bg-success-light text-success-dark",
};

const priorityColor: Record<string, string> = {
  "Cao": "bg-error-light text-error-dark",
  "Trung bình": "bg-warning-light text-warning-dark",
  "Thấp": "bg-gray-100 text-gray-600",
};

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const filtered = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Quản lý công việc</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Quản lý công việc</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
          <Plus size={16} /> Tạo công việc
        </button>
      </div>

      {/* Kanban summary */}
      <div className="grid grid-cols-3 gap-4">
        {[{ label: "Chưa bắt đầu", count: tasks.filter(t => t.status === "Chưa bắt đầu").length, color: "bg-gray-100 text-gray-600" },
          { label: "Đang thực hiện", count: tasks.filter(t => t.status === "Đang thực hiện").length, color: "bg-primary-light text-primary" },
          { label: "Hoàn thành", count: tasks.filter(t => t.status === "Hoàn thành").length, color: "bg-success-light text-success-dark" },
        ].map(s => (
          <Card key={s.label} className="flex items-center gap-3 p-4">
            <span className={`text-2xl font-bold ${s.color.split(" ")[1]}`}>{s.count}</span>
            <span className="text-sm text-text-muted">{s.label}</span>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="w-full pl-9 pr-3 py-2 border border-border rounded-btn text-sm outline-none focus:border-primary" placeholder="Tìm công việc..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="space-y-2">
          {filtered.map(t => (
            <div key={t.id} className="flex items-center gap-4 p-3 border border-border rounded-btn hover:bg-gray-50/60 transition-colors">
              <Circle size={16} className={t.status === "Hoàn thành" ? "text-success fill-success" : "text-gray-300"} />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-main truncate">{t.title}</p>
                <p className="text-xs text-text-muted">Phụ trách: {t.assignee} · Hạn: {t.deadline}</p>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${priorityColor[t.priority]}`}>{t.priority}</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${statusColor[t.status]}`}>{t.status}</span>
              <button className="w-7 h-7 rounded-btn flex items-center justify-center hover:bg-gray-100 text-text-muted"><MoreHorizontal size={14} /></button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
