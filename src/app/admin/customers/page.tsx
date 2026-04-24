"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Search, Plus, Filter, MoreHorizontal, Eye, Users, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const customers = [
  { id: "CT-001", name: "Nguyễn Trung Hiếu", email: "tungtranthe@gmail.com", phone: "0909141284", source: "Facebook", status: "Đang diễn ra", assignees: ["A", "B", "C"], students: 2, date: "14/12/2024" },
  { id: "CT-002", name: "Đào Thị Hồng Thắm", email: "hocthu@gmail.com", phone: "0912345678", source: "Zalo", status: "Đã chuyển đổi", assignees: ["D"], students: 1, date: "13/12/2024" },
  { id: "CT-003", name: "Vũ Thị Vân Anh", email: "vuvannanh@gmail.com", phone: "0987654321", source: "Website", status: "Mới", assignees: ["A", "E"], students: 0, date: "12/12/2024" },
  { id: "CT-004", name: "Trần Văn Quyết", email: "tranvanquyet@gmail.com", phone: "0977123456", source: "Giới thiệu", status: "Đang diễn ra", assignees: ["B"], students: 3, date: "11/12/2024" },
  { id: "CT-005", name: "Nguyễn Văn Nam", email: "nguyenvannam@gmail.com", phone: "0966666666", source: "Facebook", status: "Tư vấn", assignees: ["C", "D"], students: 1, date: "10/12/2024" },
];

const statusMap: Record<string, string> = {
  "Đang diễn ra": "bg-primary-light text-primary",
  "Đã chuyển đổi": "bg-success-light text-success-dark",
  "Mới": "bg-gray-100 text-gray-600",
  "Tư vấn": "bg-warning-light text-warning-dark",
};

const avatarColors = ["bg-primary", "bg-violet-500", "bg-pink-500", "bg-emerald-500", "bg-amber-500"];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [showDetail, setShowDetail] = useState<typeof customers[0] | null>(null);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search)
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Quản lý khách hàng</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Danh sách khách hàng</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
          <Plus size={16} /> Thêm khách hàng
        </button>
      </div>

      <div className="flex gap-4">
        {/* List */}
        <div className={`flex-1 transition-all duration-300 ${showDetail ? "max-w-[calc(100%-380px)]" : ""}`}>
          <Card>
            <div className="flex gap-3 mb-5">
              <div className="relative flex-1 max-w-sm">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  className="w-full pl-9 pr-3 py-2 border border-border rounded-btn text-sm outline-none focus:border-primary bg-white"
                  placeholder="Tìm khách hàng..."
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
                    <th className="text-left py-3 px-4 font-medium text-text-muted">Mã KH</th>
                    <th className="text-left py-3 px-4 font-medium text-text-muted">Khách hàng</th>
                    <th className="text-left py-3 px-4 font-medium text-text-muted">Nguồn</th>
                    <th className="text-left py-3 px-4 font-medium text-text-muted">Trạng thái</th>
                    <th className="text-left py-3 px-4 font-medium text-text-muted">Phụ trách</th>
                    <th className="text-left py-3 px-4 font-medium text-text-muted">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      className={`border-b border-border last:border-0 hover:bg-gray-50/60 cursor-pointer transition-colors ${showDetail?.id === c.id ? "bg-primary-light/30" : ""}`}
                      onClick={() => setShowDetail(showDetail?.id === c.id ? null : c)}
                    >
                      <td className="py-3 px-4 font-mono text-xs text-text-muted">{c.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-violet-400 text-white text-xs font-bold flex items-center justify-center">{c.name[0]}</div>
                          <div>
                            <p className="font-semibold text-text-main">{c.name}</p>
                            <p className="text-xs text-text-muted">{c.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-text-muted text-xs">{c.source}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusMap[c.status]}`}>{c.status}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex -space-x-2">
                          {c.assignees.slice(0, 3).map((a, i) => (
                            <div key={i} className={`w-7 h-7 rounded-full ${avatarColors[i]} text-white text-[10px] font-bold flex items-center justify-center border-2 border-white`}>{a}</div>
                          ))}
                          {c.assignees.length > 3 && (
                            <div className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 text-[10px] font-bold flex items-center justify-center border-2 border-white">+{c.assignees.length - 3}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-gray-100 text-text-muted" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <p className="text-sm text-text-muted">Hiển thị {filtered.length}/{customers.length} khách hàng</p>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-btn flex items-center justify-center border border-border hover:bg-gray-50 text-text-muted"><ChevronLeft size={15} /></button>
                <button className="w-8 h-8 rounded-btn bg-primary text-white text-sm font-medium">1</button>
                <button className="w-8 h-8 rounded-btn flex items-center justify-center border border-border hover:bg-gray-50 text-text-muted"><ChevronRight size={15} /></button>
              </div>
            </div>
          </Card>
        </div>

        {/* Detail Panel */}
        {showDetail && (
          <div className="w-[360px] shrink-0">
            <Card className="sticky top-0 overflow-y-auto max-h-[calc(100vh-140px)]">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-primary font-semibold">{showDetail.id}</span>
                <button onClick={() => setShowDetail(null)} className="text-gray-400 hover:text-text-main text-lg leading-none">×</button>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusMap[showDetail.status]}`}>{showDetail.status}</span>
              </div>

              <h2 className="text-lg font-bold text-text-main mb-4">{showDetail.name}</h2>

              <div className="space-y-2 text-sm mb-5">
                {[
                  ["Tên khách hàng", showDetail.name],
                  ["Email", showDetail.email],
                  ["Số điện thoại", showDetail.phone],
                  ["Nguồn", showDetail.source],
                  ["Ngày liên hệ", showDetail.date],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-2 gap-2">
                    <span className="text-text-muted">{label}</span>
                    <span className="font-medium text-text-main">{value}</span>
                  </div>
                ))}
              </div>

              {/* Activity Log */}
              <div className="border-t border-border pt-4">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-1.5"><Clock size={14} /> Nhật ký hoạt động</h4>
                <div className="space-y-3">
                  {[
                    { name: showDetail.name, action: "Đăng ký liên hệ", time: "Hôm nay - 19/09/2024, 17:45" },
                    { name: "Admin", action: "Tư vấn kiểm tra đầu vào", time: "1 ngày trước - 19/09/2024, 17:45" },
                    { name: showDetail.name, action: "Tham gia buổi học thử", time: "2 ngày trước - 19/09/2024, 17:45" },
                    { name: "Admin", action: "Cập nhật thông tin", time: "3 ngày trước - 19/09/2024, 17:45" },
                  ].map((log, i) => (
                    <div key={i} className="flex gap-2.5 text-xs">
                      <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0 mt-0.5">{log.name[0]}</div>
                      <div>
                        <p><span className="font-semibold text-text-main">{log.name}</span> <span className="text-primary">{log.action}</span></p>
                        <p className="text-text-muted">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
