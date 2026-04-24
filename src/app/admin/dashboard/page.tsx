"use client";

import { Card } from "@/components/ui/Card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Users, GraduationCap, BookOpen, DollarSign, TrendingUp, Star, Clock, ArrowUp, ArrowDown } from "lucide-react";

const attendanceData = [
  { name: "Đúng giờ", value: 30, color: "#2563EB" },
  { name: "Đi muộn", value: 20, color: "#F59E0B" },
  { name: "Nghỉ có phép", value: 10, color: "#10B981" },
  { name: "Nghỉ không phép", value: 25, color: "#EF4444" },
  { name: "Chưa điểm danh", value: 15, color: "#9CA3AF" },
];

const homeworkData = [
  { name: "Đã chấm", value: 15, color: "#047857" },
  { name: "Đã nộp", value: 35, color: "#10B981" },
  { name: "Chưa nộp", value: 25, color: "#34D399" },
  { name: "Hết hạn", value: 25, color: "#D1FAE5" },
];

const progressData = [
  { name: "TOEIC", percent: 40 },
  { name: "IELTS", percent: 60 },
  { name: "MOV", percent: 70 },
  { name: "PRM", percent: 10 },
  { name: "STR", percent: 90 },
];

const revenueData = [
  { month: "T1", revenue: 12 },
  { month: "T2", revenue: 19 },
  { month: "T3", revenue: 15 },
  { month: "T4", revenue: 25 },
  { month: "T5", revenue: 22 },
  { month: "T6", revenue: 30 },
  { month: "T7", revenue: 28 },
];

const statCards = [
  { label: "Tổng học viên", value: "1,248", change: "+12%", up: true, icon: <Users size={20} />, color: "bg-blue-50 text-blue-600" },
  { label: "Tổng giáo viên", value: "42", change: "+3%", up: true, icon: <GraduationCap size={20} />, color: "bg-violet-50 text-violet-600" },
  { label: "Lớp đang học", value: "86", change: "-2%", up: false, icon: <BookOpen size={20} />, color: "bg-emerald-50 text-emerald-600" },
  { label: "Doanh thu tháng", value: "85,4M ₫", change: "+18%", up: true, icon: <DollarSign size={20} />, color: "bg-amber-50 text-amber-600" },
];

const recentStudents = [
  { name: "Nguyễn Trung Hiếu", class: "TOEIC 600", status: "Đang học", date: "12/04/2024" },
  { name: "Đào Thị Hồng Thắm", class: "IELTS 6.5", status: "Đang học", date: "11/04/2024" },
  { name: "Vũ Thị Vân Anh", class: "TOEIC 450", status: "Hoàn thành", date: "10/04/2024" },
  { name: "Trần Văn Quyết", class: "PRM Basic", status: "Tạm dừng", date: "09/04/2024" },
  { name: "Nguyễn Văn Nam", class: "STR Advanced", status: "Đang học", date: "08/04/2024" },
];

const statusColor: Record<string, string> = {
  "Đang học": "bg-success-light text-success-dark",
  "Hoàn thành": "bg-primary-light text-primary",
  "Tạm dừng": "bg-warning-light text-warning-dark",
};

export default function DashboardPage() {
  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Dashboard Tổng quan</h1>
          <p className="text-sm text-text-muted mt-0.5">Chào mừng trở lại! Đây là tổng quan hệ thống.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="border border-border rounded-btn px-3 py-2 text-sm outline-none bg-white text-text-main">
            <option>Tháng 4 / 2024</option>
            <option>Tháng 3 / 2024</option>
          </select>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <Card key={i} className="flex items-center gap-4 p-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
              {s.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-text-muted truncate">{s.label}</p>
              <p className="text-xl font-bold text-text-main">{s.value}</p>
              <p className={`text-xs font-semibold flex items-center gap-0.5 ${s.up ? "text-success" : "text-error"}`}>
                {s.up ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                {s.change} so với tháng trước
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Attendance Pie */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-base text-text-main">Báo cáo điểm danh</h3>
            <select className="border border-border rounded-md px-2 py-1 text-xs outline-none bg-white">
              <option>Tháng 1</option>
              <option>Tháng 2</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-[180px] h-[180px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={attendanceData} innerRadius={55} outerRadius={75} paddingAngle={3} dataKey="value">
                    {attendanceData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-bold text-2xl text-text-main">100%</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              {attendanceData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-text-muted">{item.name}: <strong className="text-text-main">{item.value}%</strong></span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Homework Pie */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-base text-text-main">Báo cáo bài tập</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-[180px] h-[180px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={homeworkData} innerRadius={55} outerRadius={75} paddingAngle={3} dataKey="value">
                    {homeworkData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-bold text-2xl text-text-main">100%</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 text-sm">
              {homeworkData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-text-muted">{item.name}: <strong className="text-text-main">{item.value}%</strong></span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Progress Bar Chart */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-base text-text-main">Tiến độ môn học</h3>
            <select className="border border-border rounded-md px-2 py-1 text-xs outline-none bg-white">
              <option>Tháng 1</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={progressData} layout="vertical" barSize={10} margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F0F0" />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "#6B7280" }} width={45} tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="percent" fill="#2563EB" radius={[0, 4, 4, 0]} background={{ fill: "#EFF6FF", radius: 4 }} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue mini chart */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-base text-text-main">Doanh thu</h3>
            <span className="text-xs text-success font-semibold bg-success-light px-2 py-0.5 rounded-full">+18%</span>
          </div>
          <p className="text-2xl font-bold text-text-main mb-1">85,4M ₫</p>
          <p className="text-xs text-text-muted mb-3">Tháng 4 / 2024</p>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={revenueData} barSize={8}>
              <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent students table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base text-text-main">Học viên mới đăng ký</h3>
          <a href="/admin/students" className="text-primary text-sm font-medium hover:underline">Xem tất cả →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-medium text-text-muted">Họ tên</th>
                <th className="text-left py-2 px-3 font-medium text-text-muted">Lớp học</th>
                <th className="text-left py-2 px-3 font-medium text-text-muted">Trạng thái</th>
                <th className="text-left py-2 px-3 font-medium text-text-muted">Ngày đăng ký</th>
              </tr>
            </thead>
            <tbody>
              {recentStudents.map((s, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-gray-50/60">
                  <td className="py-2.5 px-3 font-medium text-text-main">{s.name}</td>
                  <td className="py-2.5 px-3 text-text-muted">{s.class}</td>
                  <td className="py-2.5 px-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor[s.status]}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-text-muted">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
