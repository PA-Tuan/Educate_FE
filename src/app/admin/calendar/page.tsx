"use client";

import { Card } from "@/components/ui/Card";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { days, hours, events } from "@/mockData";

export default function CalendarPage() {
  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Lịch</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Lịch hoạt động</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-btn border border-border flex items-center justify-center hover:bg-gray-50 text-text-muted"><ChevronLeft size={15} /></button>
          <span className="text-sm font-semibold text-text-main px-2">Tuần 16 - Tháng 4/2024</span>
          <button className="w-8 h-8 rounded-btn border border-border flex items-center justify-center hover:bg-gray-50 text-text-muted"><ChevronRight size={15} /></button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm ml-2">
            <Plus size={16} /> Thêm lịch
          </button>
        </div>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Header */}
            <div className="grid border-b border-border" style={{ gridTemplateColumns: "60px repeat(7, 1fr)" }}>
              <div className="p-3 border-r border-border bg-gray-50" />
              {days.map((d, i) => (
                <div key={i} className="p-3 text-center border-r border-border bg-gray-50 last:border-r-0">
                  <p className="text-xs font-semibold text-text-muted">{d}</p>
                  <p className="text-lg font-bold text-text-main mt-0.5">{14 + i}</p>
                </div>
              ))}
            </div>

            {/* Time slots */}
            {hours.map((hour, hi) => (
              <div key={hi} className="grid border-b border-border last:border-b-0" style={{ gridTemplateColumns: "60px repeat(7, 1fr)" }}>
                <div className="p-2 border-r border-border bg-gray-50/50 flex items-start justify-center">
                  <span className="text-[10px] text-text-muted">{hour}</span>
                </div>
                {days.map((_, di) => {
                  const event = events.find(e => e.day === di && e.hour === hi);
                  return (
                    <div key={di} className="border-r border-border last:border-r-0 min-h-[52px] p-1 hover:bg-gray-50/50 relative">
                      {event && (
                        <div className={`rounded p-1.5 border-l-2 ${event.color} cursor-pointer hover:opacity-90`}>
                          <p className="text-[10px] font-bold leading-tight">{event.title}</p>
                          <p className="text-[9px] opacity-70 mt-0.5">{event.teacher} · {event.room}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
