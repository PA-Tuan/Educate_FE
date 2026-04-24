"use client";
import { Card } from "@/components/ui/Card";
import { FileText, Plus, Search, Filter, MoreHorizontal, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const homework = [
  { id: "BT-001", title: "TOEIC Practice Test 1 - Part 5 & 6", class: "TOEIC 600", deadline: "20/04/2024", submitted: 14, total: 18, status: "Đang mở" },
  { id: "BT-002", title: "IELTS Writing Task 2 - Opinion Essay", class: "IELTS 6.5", deadline: "22/04/2024", submitted: 10, total: 15, status: "Đang mở" },
  { id: "BT-003", title: "MOV Vocabulary Unit 3", class: "MOV Basic", deadline: "18/04/2024", submitted: 12, total: 12, status: "Hết hạn" },
  { id: "BT-004", title: "STR Pronunciation Practice", class: "STR Advanced", deadline: "25/04/2024", submitted: 5, total: 10, status: "Đang mở" },
  { id: "BT-005", title: "TOEIC Listening - Part 1 & 2", class: "TOEIC 450", deadline: "19/04/2024", submitted: 8, total: 8, status: "Hết hạn" },
];

const statusColor: Record<string, string> = {
  "Đang mở": "bg-success-light text-success-dark",
  "Hết hạn": "bg-error-light text-error-dark",
};

export default function HomeworkPage() {
  const [search, setSearch] = useState("");
  const filtered = homework.filter(h => h.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Quản lý bài tập</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Quản lý bài tập</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
          <Plus size={16} /> Tạo bài tập
        </button>
      </div>

      <Card>
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="w-full pl-9 pr-3 py-2 border border-border rounded-btn text-sm outline-none focus:border-primary" placeholder="Tìm bài tập..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button className="flex items-center gap-2 border border-border rounded-btn px-3 py-2 text-sm text-text-muted hover:bg-gray-50">
            <Filter size={14} /> Bộ lọc
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                {["Mã BT", "Tên bài tập", "Lớp", "Hạn nộp", "Tiến độ nộp", "Trạng thái", "Thao tác"].map(h => (
                  <th key={h} className="text-left py-3 px-4 font-medium text-text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((hw) => (
                <tr key={hw.id} className="border-b border-border last:border-0 hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-mono text-xs text-text-muted">{hw.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-btn bg-primary-light flex items-center justify-center"><FileText size={13} className="text-primary" /></div>
                      <span className="font-semibold text-text-main">{hw.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-muted">{hw.class}</td>
                  <td className="py-3 px-4 text-text-muted">{hw.deadline}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full max-w-[80px]">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${(hw.submitted / hw.total) * 100}%` }} />
                      </div>
                      <span className="text-xs font-medium text-text-muted">{hw.submitted}/{hw.total}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[hw.status]}`}>{hw.status}</span></td>
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
          <p className="text-sm text-text-muted">Hiển thị {filtered.length}/{homework.length} bài tập</p>
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
