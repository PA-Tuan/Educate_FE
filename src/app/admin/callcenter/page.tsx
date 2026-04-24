"use client";
import { Card } from "@/components/ui/Card";
import { Phone, Plus, Search, PhoneCall, PhoneMissed, PhoneIncoming } from "lucide-react";
import { useState } from "react";

const calls = [
  { id: "GD-001", customer: "Nguyễn Trung Hiếu", phone: "0909141284", duration: "09:14:00", result: "Liên hệ thành công", agent: "Trần Minh Đức", time: "21/06/2024 03:14:00", type: "out" },
  { id: "GD-002", customer: "Đào Thị Hồng Thắm", phone: "0912345678", duration: "05:32:00", result: "Tư vấn kiểm tra đầu vào", agent: "Vũ Thị Hằng", time: "20/06/2024 14:30:00", type: "in" },
  { id: "GD-003", customer: "Trần Văn Quyết", phone: "0977123456", duration: "00:00:00", result: "Không nghe máy", agent: "Trần Minh Đức", time: "19/06/2024 10:00:00", type: "missed" },
  { id: "GD-004", customer: "Nguyễn Văn Nam", phone: "0966666666", duration: "12:05:00", result: "Tư vấn khóa học", agent: "Vũ Thị Hằng", time: "18/06/2024 09:00:00", type: "out" },
];

const callIcon = { out: <PhoneCall size={14} className="text-success" />, in: <PhoneIncoming size={14} className="text-primary" />, missed: <PhoneMissed size={14} className="text-error" /> };
const callLabel = { out: "Gọi đi", in: "Gọi đến", missed: "Nhỡ" };
const callColor = { out: "bg-success-light text-success-dark", in: "bg-primary-light text-primary", missed: "bg-error-light text-error-dark" };

export default function CallCenterPage() {
  const [search, setSearch] = useState("");
  const filtered = calls.filter(c => c.customer.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Tổng đài quản lý</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Tổng đài quản lý</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
          <Phone size={16} /> Gọi mới
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Tổng cuộc gọi", value: calls.length, icon: <PhoneCall size={16} />, color: "bg-primary-light text-primary" },
          { label: "Thành công", value: calls.filter(c => c.type !== "missed").length, icon: <PhoneCall size={16} />, color: "bg-success-light text-success-dark" },
          { label: "Nhỡ máy", value: calls.filter(c => c.type === "missed").length, icon: <PhoneMissed size={16} />, color: "bg-error-light text-error-dark" },
        ].map(s => (
          <Card key={s.label} className="flex items-center gap-3 p-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>{s.icon}</div>
            <div><p className="text-xs text-text-muted">{s.label}</p><p className="text-2xl font-bold text-text-main">{s.value}</p></div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="w-full pl-9 pr-3 py-2 border border-border rounded-btn text-sm outline-none focus:border-primary" placeholder="Tìm cuộc gọi..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="space-y-3">
          {filtered.map(c => (
            <div key={c.id} className="flex items-center gap-4 p-4 border border-border rounded-btn hover:bg-gray-50/60 transition-colors">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-primary text-white`}>{c.customer[0]}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text-main">{c.customer}</p>
                <p className="text-xs text-text-muted">{c.phone} · {c.time}</p>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${callColor[c.type as keyof typeof callColor]}`}>
                  {callIcon[c.type as keyof typeof callIcon]} {callLabel[c.type as keyof typeof callLabel]}
                </span>
                <p className="text-xs text-text-muted mt-1">{c.result}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-mono text-text-main">{c.duration}</p>
                <p className="text-xs text-text-muted">Thời gian</p>
              </div>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-full bg-success-light text-success-dark flex items-center justify-center hover:bg-success hover:text-white transition-colors">
                  <Phone size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
