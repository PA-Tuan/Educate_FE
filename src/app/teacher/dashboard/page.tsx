"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { 
  BookOpen, Calendar, Clock, FileText, CheckCircle, AlertCircle, ChevronRight, Users, GraduationCap, Star
} from "lucide-react";
import { classes, homework, events, teachers } from "@/mockData";

export default function TeacherDashboard() {
  // Mock logic: Giả sử giáo viên đăng nhập là "Nguyễn Minh Tuấn"
  const teacherName = "Tuấn";
  const teacherInfo = teachers.find(t => t.name === teacherName);
  
  const myClasses = classes.filter(c => c.teacher === teacherName);
  const myEvents = events.filter(e => e.teacher === teacherName);
  // Get homework for classes taught by this teacher
  const classNames = myClasses.map(c => c.name.split(" - ")[0]); // simple matching based on mock data structure
  const myHomework = homework.filter(h => classNames.some(cn => h.class.includes(cn)));
  const pendingToGrade = myHomework.reduce((acc, curr) => acc + (curr.submitted || 0), 0) - myHomework.reduce((acc, curr) => acc + Math.floor(curr.submitted * 0.8), 0); // Mock un-graded amount

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-2xl font-bold mb-2">Chào buổi sáng, thầy {teacherName}! 👋</h1>
          <p className="text-white/80 text-sm">
            Hôm nay thầy có {myEvents.length} ca dạy và {pendingToGrade} bài tập học viên nộp chờ chấm điểm. Chúc thầy một ngày làm việc hiệu quả!
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
            <p className="text-sm text-text-muted mb-1">Lớp đang phụ trách</p>
            <p className="text-2xl font-bold text-text-main">{myClasses.length}</p>
          </div>
        </Card>
        
        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1">Tổng số học viên</p>
            <p className="text-2xl font-bold text-text-main">{teacherInfo?.students || 0}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-warning-light text-warning-dark flex items-center justify-center shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1">Bài tập chờ chấm</p>
            <p className="text-2xl font-bold text-text-main">{pendingToGrade}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Star size={24} />
          </div>
          <div>
            <p className="text-sm text-text-muted mb-1">Đánh giá TB</p>
            <p className="text-2xl font-bold text-text-main">{teacherInfo?.rating || "N/A"}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="xl:col-span-2 space-y-6">
          {/* Lịch dạy hôm nay */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg text-text-main">Lịch dạy hôm nay</h3>
              <button className="text-sm text-primary hover:underline flex items-center gap-1">
                Xem toàn bộ <ChevronRight size={14} />
              </button>
            </div>
            <div className="space-y-4">
              {myEvents.length > 0 ? myEvents.map((event, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-border hover:shadow-sm transition-shadow">
                  <div className="w-16 flex flex-col items-center justify-center border-r border-border pr-4 shrink-0">
                    <span className="text-sm font-semibold text-text-muted">{event.hour === 0 ? "7:00" : "14:00"}</span>
                    <span className="text-xs text-gray-400">{event.hour === 0 ? "9:30" : "16:30"}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-text-main mb-1">{event.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-text-muted">
                      <span className="flex items-center gap-1"><Clock size={12} /> Phòng: {event.room}</span>
                      <span className="flex items-center gap-1"><Users size={12} /> Sĩ số: 20</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="default">Sắp diễn ra</Badge>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-text-muted">Hôm nay thầy không có lịch dạy.</div>
              )}
            </div>
          </Card>

          {/* Lớp học của tôi (Quick View) */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg text-text-main">Tiến độ lớp học</h3>
            </div>
            <div className="space-y-4">
              {myClasses.map((cls, idx) => (
                <div key={cls.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-primary">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-text-main">{cls.name}</p>
                      <p className="text-xs text-text-muted">{cls.schedule}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{cls.students}/{cls.maxStudents} HV</p>
                    <p className="text-xs text-text-muted">{cls.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Bài tập cần chấm */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg text-text-main">Cần chấm điểm</h3>
            </div>
            <div className="space-y-4">
              {myHomework.map(hw => {
                const unGraded = Math.floor(hw.submitted * 0.2) + 1; // fake un-graded number
                return (
                  <div key={hw.id} className="flex gap-3 group">
                    <div className="mt-0.5">
                      <AlertCircle size={18} className="text-warning-dark" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-text-main group-hover:text-primary transition-colors cursor-pointer line-clamp-2 mb-1">
                        {hw.title}
                      </p>
                      <p className="text-xs text-text-muted flex items-center justify-between">
                        <span className="flex items-center gap-1"><GraduationCap size={12} /> {hw.class}</span>
                        <span className="font-medium text-warning-dark">{unGraded} bài</span>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Cập nhật mới */}
          <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 border-none">
            <h3 className="font-bold text-lg text-text-main mb-3">Thông báo nội bộ</h3>
            <div className="space-y-3">
              <div className="p-3 bg-white/60 rounded-xl">
                <p className="text-sm font-semibold text-text-main mb-1">Họp chuyên môn</p>
                <p className="text-xs text-text-muted">14:00 Thứ 6 tuần này, tại phòng họp tầng 3.</p>
              </div>
              <div className="p-3 bg-white/60 rounded-xl">
                <p className="text-sm font-semibold text-text-main mb-1">Nộp bảng điểm</p>
                <p className="text-xs text-text-muted">Hạn chót nộp bảng điểm lớp TOEIC 600 là ngày 28/06.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
