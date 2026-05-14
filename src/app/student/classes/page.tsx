"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BookOpen, Calendar, Clock, GraduationCap, Users, PlayCircle, FolderOpen } from "lucide-react";
import { classes } from "@/mockData";

export default function StudentClassesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-xl font-bold text-text-main mb-1">Lớp học của tôi</h1>
          <p className="text-sm text-text-muted">Quản lý và truy cập các khóa học bạn đang tham gia</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {classes.slice(0, 4).map((cls) => {
          const isCompleted = cls.status === "Hoàn thành";
          const progress = isCompleted ? 100 : Math.floor(Math.random() * 60) + 20;

          return (
            <Card key={cls.id} className="overflow-hidden flex flex-col group hover:shadow-md transition-shadow border border-border">
              {/* Card Header with Graphic */}
              <div className="h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative p-5 flex items-end">
                <div className="absolute top-4 right-4">
                  <Badge variant={isCompleted ? "success" : "default"} className={!isCompleted ? "bg-white/20 text-white border-white/30 backdrop-blur-sm" : ""}>
                    {cls.status}
                  </Badge>
                </div>
                <div className="text-white relative z-10 w-full">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{cls.name}</h3>
                  <div className="flex items-center justify-between text-white/80 text-xs font-medium">
                    <span>{cls.course}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center gap-3 text-sm text-text-muted">
                    <GraduationCap size={16} className="text-gray-400" />
                    <span className="font-medium text-text-main">{cls.teacher}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-muted">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{cls.schedule.split(" | ")[0]}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-muted">
                    <Clock size={16} className="text-gray-400" />
                    <span>{cls.schedule.split(" | ")[1]}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-muted">
                    <Users size={16} className="text-gray-400" />
                    <span>Sĩ số: {cls.students}/{cls.maxStudents}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span className="text-text-muted">Tiến độ khóa học</span>
                    <span className="text-text-main">{progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-success' : 'bg-primary'}`} 
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto">
                  <Button variant="primary" className="flex-1 text-sm h-9 flex items-center justify-center gap-2">
                    <PlayCircle size={16} /> Vào học
                  </Button>
                  <Button variant="secondary" className="px-3 h-9 flex items-center justify-center" title="Tài liệu">
                    <FolderOpen size={16} className="text-text-muted" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
