"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Search, Filter, ChevronLeft, ChevronRight, TrendingUp, TrendingDown, DollarSign, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

import { monthlyData, transactions } from "@/mockData";

const statusColor: Record<string, string> = {
  "Thành công": "bg-success-light text-success-dark",
  "Đang xử lý": "bg-warning-light text-warning-dark",
  "Thất bại": "bg-error-light text-error-dark",
};

const summaryCards = [
  { label: "Tổng thu tháng", value: "85,4M ₫", change: "+18%", up: true, icon: <TrendingUp size={18} />, color: "bg-success-light text-success-dark" },
  { label: "Tổng chi tháng", value: "22,1M ₫", change: "+5%", up: false, icon: <TrendingDown size={18} />, color: "bg-error-light text-error-dark" },
  { label: "Lợi nhuận", value: "63,3M ₫", change: "+22%", up: true, icon: <DollarSign size={18} />, color: "bg-primary-light text-primary" },
  { label: "Học phí chưa thu", value: "12,5M ₫", change: "8 HV", up: false, icon: <AlertCircle size={18} />, color: "bg-warning-light text-warning-dark" },
];

export default function FinancePage() {
  const [search, setSearch] = useState("");
  const filtered = transactions.filter((t) =>
    t.student.toLowerCase().includes(search.toLowerCase()) || t.id.includes(search)
  );

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Theo dõi học phí</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Theo dõi số dư học phí</p>
        </div>
        <div className="flex gap-2">
          <select className="border border-border rounded-btn px-3 py-2 text-sm outline-none bg-white">
            <option>Tháng 4 / 2024</option>
          </select>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((s) => (
          <Card key={s.label} className="p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>{s.icon}</div>
            <div>
              <p className="text-xs text-text-muted">{s.label}</p>
              <p className="text-lg font-bold text-text-main">{s.value}</p>
              <p className={`text-xs font-semibold ${s.up ? "text-success" : "text-error"}`}>{s.change}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-base text-text-main">Doanh thu & Chi phí</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} barSize={12} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="income" name="Thu" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expense" name="Chi" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-base text-text-main">Xu hướng học phí</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="income" name="Thu" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-base text-text-main">Lịch sử giao dịch</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="pl-8 pr-3 py-1.5 border border-border rounded-btn text-sm outline-none focus:border-primary bg-white"
                placeholder="Tìm giao dịch..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 border border-border rounded-btn px-3 py-1.5 text-sm text-text-muted hover:bg-gray-50">
              <Filter size={14} /> Bộ lọc
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-text-muted">Mã HĐ</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Học viên</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Loại</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Số tiền</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Phương thức</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Ngày</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b border-border last:border-0 hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-mono text-xs text-text-muted">{t.id}</td>
                  <td className="py-3 px-4 font-semibold text-text-main">{t.student}</td>
                  <td className="py-3 px-4 text-text-muted">{t.type}</td>
                  <td className={`py-3 px-4 font-semibold ${t.amount.startsWith("+") ? "text-success" : "text-error"}`}>{t.amount}</td>
                  <td className="py-3 px-4 text-text-muted">{t.method}</td>
                  <td className="py-3 px-4 text-text-muted">{t.date}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColor[t.status]}`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <p className="text-sm text-text-muted">Hiển thị {filtered.length}/{transactions.length} giao dịch</p>
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
