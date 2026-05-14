"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { events, days, hours } from "@/mockData";

export default function StudentCalendarPage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const nextWeek = () => {
    const next = new Date(currentWeek);
    next.setDate(next.getDate() + 7);
    setCurrentWeek(next);
  };

  const prevWeek = () => {
    const prev = new Date(currentWeek);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeek(prev);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-border">
        <div>
          <h1 className="text-xl font-bold text-text-main mb-1">Thời khóa biểu</h1>
          <p className="text-sm text-text-muted">Theo dõi lịch học các lớp của bạn</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#F4F6FB] p-1 rounded-lg">
            <Button variant="secondary" className="h-8 px-2 border-transparent bg-white shadow-sm" onClick={prevWeek}>
              <ChevronLeft size={16} />
            </Button>
            <span className="text-sm font-semibold px-2 w-32 text-center">
              Tuần này
            </span>
            <Button variant="secondary" className="h-8 px-2 border-transparent bg-white shadow-sm" onClick={nextWeek}>
              <ChevronRight size={16} />
            </Button>
          </div>
          <Button variant="primary">Đồng bộ lịch Google</Button>
        </div>
      </div>

      <Card className="overflow-hidden border border-border shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="grid grid-cols-8 border-b border-border bg-[#F8FAFC]">
              <div className="p-4 border-r border-border text-center">
                <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Thời gian</span>
              </div>
              {days.map((day, idx) => (
                <div key={day} className="p-4 border-r border-border last:border-0 text-center">
                  <div className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">{day}</div>
                  <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold ${idx === 3 ? "bg-primary text-white shadow-md shadow-primary/20" : "text-text-main"}`}>
                    {15 + idx}
                  </div>
                </div>
              ))}
            </div>

            {/* Body */}
            <div className="relative bg-white">
              {hours.map((hour, hourIdx) => (
                <div key={hour} className="grid grid-cols-8 border-b border-gray-100 last:border-0">
                  <div className="p-3 border-r border-border text-center relative bg-[#F8FAFC]/50">
                    <span className="text-[13px] font-medium text-text-muted">{hour}</span>
                  </div>
                  {days.map((_, dayIdx) => {
                    const event = events.find(
                      (e) => e.day === dayIdx && e.hour === hourIdx
                    );
                    return (
                      <div key={`${dayIdx}-${hourIdx}`} className="p-1 border-r border-gray-100 last:border-0 h-[80px] relative group hover:bg-gray-50/50 transition-colors">
                        {event && (
                          <div className={`absolute inset-1 p-2 rounded-xl border ${event.color} cursor-pointer shadow-sm hover:shadow-md transition-all`}>
                            <div className="text-xs font-bold mb-1 line-clamp-1">{event.title}</div>
                            <div className="flex items-center gap-1 opacity-80 mb-0.5">
                              <MapPin size={10} />
                              <span className="text-[10px] truncate">{event.room}</span>
                            </div>
                            <div className="flex items-center gap-1 opacity-80">
                              <Clock size={10} />
                              <span className="text-[10px] truncate">1h 30m</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
