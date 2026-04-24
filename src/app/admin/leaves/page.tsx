"use client";
import { Card } from "@/components/ui/Card";
import { FileText, Plus, Search, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const leaves = [
  { id: "XN-001", name: "Nguyễn Văn Hùng", role: "Giáo viên PRM", type: "Nghỉ phép năm", from: "20/04/2024", to: "25/04/2024", days: 5, reason: "Du lịch gia đình", status: "Chờ duyệt", submitted: "18/04/2024" },
  { id: "XN-002", name: "Phạm Thị Thu", role: "Kế toán", type: "Nghỉ ốm", from: "19/04/2024", to: "20/04/2024", days: 2, reason: "Bệnh cần nghỉ ngơi", status: "Đã duyệt", submitted: "18/04/2024" },
  { id: "XN-003", name: "Lê Văn Khoa", role: "Tư vấn viên", type: "Nghỉ không lương", from: "22/04/2024", to: "22/04/2024", days: 1, reason: "Việc cá nhân", status: "Từ chối", submitted: "17/04/2024" },
];

const statusColor: Record<string, string> = {
  "Chờ duyệt": "bg-warning-light text-warning-dark",
  "Đã duyệt": "bg-success-light text-success-dark",
  "Từ chối": "bg-error-light text-error-dark",
};

export default function LeavesPage() {
  const [search, setSearch] = useState("");
  const filtered = leaves.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Quản lý đơn xin nghỉ</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Quản lý đơn xin nghỉ</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
          <Plus size={16} /> Tạo đơn
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Chờ duyệt", value: leaves.filter(l => l.status === "Chờ duyệt").length, color: "bg-warning-light text-warning-dark" },
          { label: "Đã duyệt", value: leaves.filter(l => l.status === "Đã duyệt").length, color: "bg-success-light text-success-dark" },
          { label: "Từ chối", value: leaves.filter(l => l.status === "Từ chối").length, color: "bg-error-light text-error-dark" },
        ].map(s => (
          <Card key={s.label} className="flex items-center gap-3 p-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><FileText size={18} /></div>
            <div><p className="text-xs text-text-muted">{s.label}</p><p className="text-2xl font-bold text-text-main">{s.value}</p></div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="w-full pl-9 pr-3 py-2 border border-border rounded-btn text-sm outline-none focus:border-primary" placeholder="Tìm đơn xin nghỉ..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                {["Mã đơn", "Nhân viên", "Loại nghỉ", "Từ ngày", "Đến ngày", "Số ngày", "Lý do", "Trạng thái", "Thao tác"].map(h => (
                  <th key={h} className="text-left py-3 px-4 font-medium text-text-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} className="border-b border-border last:border-0 hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-mono text-xs text-text-muted">{l.id}</td>
                  <td className="py-3 px-4"><p className="font-semibold text-text-main">{l.name}</p><p className="text-xs text-text-muted">{l.role}</p></td>
                  <td className="py-3 px-4 text-text-muted">{l.type}</td>
                  <td className="py-3 px-4 text-text-muted">{l.from}</td>
                  <td className="py-3 px-4 text-text-muted">{l.to}</td>
                  <td className="py-3 px-4 font-medium text-text-main">{l.days} ngày</td>
                  <td className="py-3 px-4 text-text-muted max-w-[120px] truncate">{l.reason}</td>
                  <td className="py-3 px-4"><span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[l.status]}`}>{l.status}</span></td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      {l.status === "Chờ duyệt" && (
                        <>
                          <button className="px-3 py-1 bg-success text-white rounded-btn text-xs font-medium hover:bg-success-dark">Duyệt</button>
                          <button className="px-3 py-1 bg-error text-white rounded-btn text-xs font-medium hover:bg-error-dark">Từ chối</button>
                        </>
                      )}
                      <button className="w-7 h-7 rounded-btn flex items-center justify-center hover:bg-gray-100 text-text-muted"><MoreHorizontal size={14} /></button>
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
