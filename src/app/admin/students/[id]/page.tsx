"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowLeft, Star, Mail, Phone, ChevronLeft, ChevronRight, Edit2 } from "lucide-react";
import Link from "next/link";

const tabs = ["Dashboard", "Thông tin chung", "Công việc", "Hóa đơn", "Học phí", "Học tập", "Điểm danh"];

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

const financeItems = [
  { label: "Học phí đã mua", value: "4.500.000 ₫", color: "#2563EB" },
  { label: "Học phí đã sử dụng", value: "2.525.000 ₫", color: "#10B981" },
  { label: "Học phí đã hoàn", value: "4.500.000 ₫", color: "#F59E0B" },
  { label: "Số dư học phí", value: "-2.525.000 ₫", color: "#EF4444" },
];

const reviews = [
  { author: "Nguyễn Trung Hiếu", rating: 4, text: "Giáo viên dạy rất nhiệt tình, dễ hiểu. Tôi đã cải thiện kỹ năng nghe nói rõ rệt.", date: "20/09/2024" },
  { author: "Nguyễn Trung Hiếu", rating: 5, text: "Lớp học online tiện lợi, tài liệu phong phú. Rất hài lòng với chương trình học.", date: "15/09/2024" },
];

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      {/* Top */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/admin/students">
              <button className="flex items-center gap-1.5 text-text-muted hover:text-primary text-sm transition-colors">
                <ArrowLeft size={15} /> Danh sách học viên trong Trung Tâm
              </button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-text-main">Chi tiết học viên Nguyễn Trung Hiếu</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Danh sách học viên trong Trung Tâm • Chi tiết học viên</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border bg-white rounded-t-card overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === i
                ? "border-primary text-primary"
                : "border-transparent text-text-muted hover:text-text-main"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Attendance */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-base">Báo cáo điểm danh</h3>
              <select className="border border-border rounded-md px-2 py-1 text-xs outline-none bg-white">
                <option>Tháng 1</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-[160px] h-[160px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={attendanceData} innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value">
                      {attendanceData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-bold text-xl text-text-main">100%</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 text-xs">
                {attendanceData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-text-muted">{item.name}: <strong className="text-text-main">{item.value}%</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Homework */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-base">Báo cáo bài tập</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-[160px] h-[160px] shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={homeworkData} innerRadius={50} outerRadius={70} paddingAngle={3} dataKey="value">
                      {homeworkData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-bold text-xl text-text-main">100%</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 text-xs">
                {homeworkData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-text-muted">{item.name}: <strong className="text-text-main">{item.value}%</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Progress */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-base">Tiến độ môn học</h3>
              <select className="border border-border rounded-md px-2 py-1 text-xs outline-none bg-white"><option>Tháng 1</option></select>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={progressData} layout="vertical" barSize={8}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F0F0" />
                <XAxis type="number" tick={{ fontSize: 10, fill: "#9CA3AF" }} tickLine={false} axisLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#6B7280" }} width={40} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="percent" fill="#2563EB" radius={[0, 4, 4, 0]} background={{ fill: "#EFF6FF", radius: 4 }} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Finance */}
          <Card>
            <div className="mb-4">
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-24 h-24 mb-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[{ value: 50 }, { value: 50 }]} innerRadius={30} outerRadius={42} dataKey="value" startAngle={90} endAngle={-270}>
                        <Cell fill="#7C3AED" />
                        <Cell fill="#E5E7EB" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-bold text-sm text-violet-600">50%</span>
                  </div>
                </div>
                <p className="text-xs text-text-muted">Tỷ lệ hoàn thành khóa học</p>
              </div>
              <div className="space-y-2 mt-2">
                {financeItems.map((f, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-text-muted">{f.label}</span>
                    <div className="flex-1 mx-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: "60%", backgroundColor: f.color }} />
                    </div>
                    <span className="font-semibold text-text-main whitespace-nowrap" style={{ color: f.color }}>{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Review */}
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-base">Đánh giá</h3>
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-gray-50"><ChevronLeft size={13} /></button>
                <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-gray-50"><ChevronRight size={13} /></button>
                <a href="#" className="text-primary text-sm font-medium hover:underline">Xem tất cả</a>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="text-center shrink-0">
                <p className="text-5xl font-black text-text-main">4.5</p>
                <div className="flex gap-0.5 mt-1 justify-center">
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} size={14} className={n <= 4 ? "text-amber-400 fill-amber-400" : "text-gray-300"} />
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-3">
                {reviews.map((r, i) => (
                  <div key={i} className="border border-border rounded-btn p-3 text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">{r.author[0]}</div>
                      <span className="font-semibold text-text-main">{r.author}</span>
                      <div className="flex gap-0.5 ml-1">
                        {[1,2,3,4,5].map(n => (
                          <Star key={n} size={11} className={n <= r.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="text-xs text-text-muted ml-auto">{r.date}</span>
                    </div>
                    <p className="text-text-muted">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 1 && (
        <Card>
          <h3 className="font-semibold text-base mb-5">Thông tin chung</h3>
          <div className="grid grid-cols-2 gap-x-10 gap-y-4 text-sm max-w-2xl">
            {[
              ["Tên học viên", "Nguyễn Trung Hiếu"],
              ["Email", "nguyentrunghieu@gmail.com"],
              ["Số điện thoại", "0909141284"],
              ["Nguồn", "Facebook"],
              ["Ngày sinh", "14/12/1990"],
              ["Giới tính", "Nam"],
              ["Ngày liên hệ", "14/12/1990"],
              ["Người phụ trách", "Admin"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-text-muted mb-0.5">{label}</p>
                <p className="font-medium text-text-main">{value}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab !== 0 && activeTab !== 1 && (
        <Card className="flex items-center justify-center h-48 text-text-muted">
          <p className="text-center">
            <span className="block text-3xl mb-2">🚧</span>
            Tab <strong>{tabs[activeTab]}</strong> đang được phát triển
          </p>
        </Card>
      )}
    </div>
  );
}
