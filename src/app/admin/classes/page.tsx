"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Search, Plus, Filter, MoreHorizontal, Eye, ChevronLeft, ChevronRight, Users, BookOpen } from "lucide-react";

const classes = [
  { id: "LH-001", name: "TOEIC 600 - Buổi sáng", course: "TOEIC", teacher: "Nguyễn Minh Tuấn", students: 18, maxStudents: 20, schedule: "T2-T4-T6 | 7:30 - 9:30", status: "Đang học", startDate: "01/03/2024", endDate: "01/06/2024" },
  { id: "LH-002", name: "IELTS 6.5 - Buổi tối", course: "IELTS", teacher: "Trần Thị Hoa", students: 15, maxStudents: 15, schedule: "T3-T5-T7 | 18:00 - 20:00", status: "Đang học", startDate: "15/03/2024", endDate: "15/07/2024" },
  { id: "LH-003", name: "MOV Basic - Cuối tuần", course: "MOV", teacher: "Phạm Văn Lộc", students: 12, maxStudents: 20, schedule: "T7-CN | 9:00 - 11:30", status: "Đang học", startDate: "01/04/2024", endDate: "01/07/2024" },
  { id: "LH-004", name: "TOEIC 450 - Cấp tốc", course: "TOEIC", teacher: "Lê Thị Mai", students: 8, maxStudents: 10, schedule: "T2-T4-T6-T7 | 14:00 - 16:00", status: "Sắp khai giảng", startDate: "01/05/2024", endDate: "01/07/2024" },
  { id: "LH-005", name: "PRM Advanced - Buổi tối", course: "PRM", teacher: "Nguyễn Văn Hùng", students: 20, maxStudents: 20, schedule: "T2-T4 | 19:00 - 21:00", status: "Hoàn thành", startDate: "01/01/2024", endDate: "01/04/2024" },
  { id: "LH-006", name: "STR Advanced - Cuối tuần", course: "STR", teacher: "Đỗ Thị Lan", students: 10, maxStudents: 15, schedule: "CN | 14:00 - 17:00", status: "Đang học", startDate: "10/04/2024", endDate: "10/07/2024" },
];

const statusColor: Record<string, string> = {
  "Đang học": "bg-success-light text-success-dark",
  "Sắp khai giảng": "bg-primary-light text-primary",
  "Hoàn thành": "bg-gray-100 text-gray-600",
};

export default function ClassesPage() {
  const [search, setSearch] = useState("");

  const filtered = classes.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Quản lý lớp học</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Quản lý lớp học</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
          <Plus size={16} /> Tạo lớp học
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tổng lớp học", value: classes.length, icon: <BookOpen size={18} />, color: "bg-primary-light text-primary" },
          { label: "Đang hoạt động", value: classes.filter(c => c.status === "Đang học").length, icon: <Users size={18} />, color: "bg-success-light text-success-dark" },
          { label: "Tổng học viên", value: classes.reduce((a, c) => a + c.students, 0), icon: <Users size={18} />, color: "bg-violet-50 text-violet-600" },
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
            <input
              className="w-full pl-9 pr-3 py-2 border border-border rounded-btn text-sm outline-none focus:border-primary bg-white"
              placeholder="Tìm lớp học, khóa học..."
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
                <th className="text-left py-3 px-4 font-medium text-text-muted">Mã lớp</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Tên lớp</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Giáo viên</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Học viên</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Lịch học</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Thời gian</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Trạng thái</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-gray-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-text-muted">{c.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-text-main">{c.name}</p>
                    <p className="text-xs text-text-muted">{c.course}</p>
                  </td>
                  <td className="py-3 px-4 text-text-muted">{c.teacher}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full max-w-[60px]">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(c.students / c.maxStudents) * 100}%` }} />
                      </div>
                      <span className="text-xs font-medium text-text-main">{c.students}/{c.maxStudents}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs text-text-muted">{c.schedule}</td>
                  <td className="py-3 px-4 text-xs text-text-muted">
                    <div>{c.startDate}</div>
                    <div>→ {c.endDate}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[c.status]}`}>{c.status}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-primary-light text-text-muted hover:text-primary transition-colors">
                        <Eye size={15} />
                      </button>
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

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <p className="text-sm text-text-muted">Hiển thị {filtered.length}/{classes.length} lớp học</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-btn border border-border hover:bg-gray-50 flex items-center justify-center text-text-muted"><ChevronLeft size={15} /></button>
            <button className="w-8 h-8 rounded-btn bg-primary text-white text-sm font-medium">1</button>
            <button className="w-8 h-8 rounded-btn border border-border hover:bg-gray-50 flex items-center justify-center text-text-muted"><ChevronRight size={15} /></button>
          </div>
        </div>
      </Card>
    </div>
  );
}
