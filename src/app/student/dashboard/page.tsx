"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { 
  BookOpen, Calendar, Clock, FileText, CheckCircle, AlertCircle, ChevronRight, GraduationCap 
} from "lucide-react";
import { classes, homework, events, progressData } from "@/mockData";

export default function StudentDashboard() {
  const pendingHomework = homework.filter(h => h.status === "Đang mở");
  const myClasses = classes.filter(c => c.status === "Đang học").slice(0, 3);
  const todayEvents = events.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-violet-500 to-primary rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-2xl font-bold mb-2">Chào buổi sáng, Nguyễn Trung Hiếu! 👋</h1>
          <p className="text-white/80 text-sm">
            Bạn có {todayEvents.length} lịch học hôm nay và {pendingHomework.length} bài tập cần hoàn thành trong tuần này. Chúc bạn một ngày học tập hiệu quả!
          </p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 translate-x-10" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1">Khóa học đang tham gia</p>
            <p className="text-2xl font-bold text-text-main">{myClasses.length}</p>
          </div>
        </Card>
        
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-warning-light text-warning-dark flex items-center justify-center shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1">Bài tập cần làm</p>
            <p className="text-2xl font-bold text-text-main">{pendingHomework.length}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1">Tỷ lệ chuyên cần</p>
            <p className="text-2xl font-bold text-text-main">92%</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1">Điểm trung bình</p>
            <p className="text-2xl font-bold text-text-main">8.5</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="xl:col-span-2 space-y-6">
          {/* Lịch học hôm nay */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg text-text-main">Lịch học hôm nay</h3>
              <button className="text-sm text-primary hover:underline flex items-center gap-1">
                Xem tất cả <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-4">
              {todayEvents.map((event, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-border hover:shadow-sm transition-shadow">
                  <div className="w-16 flex flex-col items-center justify-center border-r border-border pr-4 shrink-0">
                    <span className="text-sm font-semibold text-text-muted">7:00</span>
                    <span className="text-xs text-gray-400">9:30</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-text-main mb-1">{event.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1"><Clock size={12} /> {event.room}</span>
                      <span className="flex items-center gap-1"><GraduationCap size={12} /> {event.teacher}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="default">Đang diễn ra</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Tiến độ học tập */}
          <Card className="p-6">
            <h3 className="font-bold text-lg text-text-main mb-5">Tiến độ khóa học</h3>
            <div className="space-y-5">
              {progressData.slice(0, 3).map((prog, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-text-main">{prog.name}</span>
                    <span className="text-text-muted">{prog.percent}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500" 
                      style={{ width: `${prog.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Bài tập cần làm */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg text-text-main">Bài tập cần làm</h3>
            </div>
            <div className="space-y-4">
              {pendingHomework.slice(0, 4).map(hw => (
                <div key={hw.id} className="flex gap-3 group">
                  <div className="mt-0.5">
                    <AlertCircle size={18} className="text-warning-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-main group-hover:text-primary transition-colors cursor-pointer line-clamp-2 mb-1">
                      {hw.title}
                    </p>
                    <p className="text-xs text-text-muted flex items-center gap-1">
                      <Clock size={12} /> Hạn: {hw.deadline}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Cập nhật mới */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-none">
            <h3 className="font-bold text-lg text-text-main mb-3">Thông báo mới</h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/60 rounded-xl">
                <p className="text-sm font-semibold text-text-main mb-1">Khai giảng lớp giao tiếp</p>
                <p className="text-xs text-text-muted">Trung tâm sắp mở lớp giao tiếp với giáo viên bản ngữ.</p>
              </div>
              <div className="p-3 bg-white/60 rounded-xl">
                <p className="text-sm font-semibold text-text-main mb-1">Nghỉ lễ 30/4 - 1/5</p>
                <p className="text-xs text-text-muted">Các lớp nghỉ học từ ngày 30/4 đến hết ngày 1/5.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
