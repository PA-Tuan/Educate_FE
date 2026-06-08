"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/Table";
import { Search, Filter, FileText, CheckCircle, Clock, Plus } from "lucide-react";
import { useState } from "react";
import { homework, classes } from "@/mockData";

export default function TeacherHomeworkPage() {
  const [search, setSearch] = useState("");
  
  const teacherName = "Tuấn";
  const myClasses = classes.filter(c => c.teacher === teacherName);
  const classNames = myClasses.map(c => c.name.split(" - ")[0]);
  
  // Filter homework for teacher's classes
  const myHomework = homework.filter(h => classNames.some(cn => h.class.includes(cn)));

  const columns = [
    { header: "Tên bài tập", accessor: "title" as const },
    { header: "Lớp học", accessor: "class" as const },
    { header: "Hạn nộp", accessor: "deadline" as const },
    { 
      header: "Trạng thái", 
      accessor: (row: any) => {
        if (row.status === "Đang mở") return <Badge variant="success">Đang mở</Badge>;
        if (row.status === "Hết hạn") return <Badge variant="danger">Đã đóng</Badge>;
        return <Badge variant="default">{row.status}</Badge>;
      }
    },
    { 
      header: "Tiến độ nộp bài", 
      accessor: (row: any) => (
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{row.submitted}/{row.total}</span>
          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${row.submitted === row.total ? 'bg-success' : 'bg-primary'}`} 
              style={{ width: `${(row.submitted / row.total) * 100}%` }}
            />
          </div>
        </div>
      ) 
    },
    {
      header: "Thao tác",
      accessor: (row: any) => (
        <div className="flex items-center gap-2">
          <Button variant="primary" className="text-xs h-8 px-3">
            {row.submitted > 0 ? "Chấm bài" : "Chi tiết"}
          </Button>
        </div>
      )
    }
  ];

  const totalGrading = myHomework.reduce((acc, curr) => acc + curr.submitted, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main mb-1">Quản lý bài tập</h1>
          <p className="text-sm text-text-muted">Giao bài, theo dõi tiến độ nộp và chấm điểm</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus size={16} /> Giao bài mới
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Tổng số bài đã giao", value: myHomework.length, icon: <FileText size={20} />, color: "bg-blue-50 text-blue-600" },
          { label: "Bài tập đang mở", value: myHomework.filter(h => h.status === "Đang mở").length, icon: <Clock size={20} />, color: "bg-emerald-50 text-emerald-600" },
          { label: "Số bài chờ chấm (ước tính)", value: totalGrading, icon: <CheckCircle size={20} />, color: "bg-warning-light text-warning-dark" },
        ].map(s => (
          <Card key={s.label} className="p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${s.color}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-sm text-text-muted mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-text-main">{s.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              className="w-full pl-9 pr-3 py-2 border border-border rounded-btn text-sm outline-none focus:border-primary transition-colors" 
              placeholder="Tìm kiếm bài tập..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select className="border border-border rounded-btn px-3 py-2 text-sm outline-none focus:border-primary bg-white">
            <option value="">Tất cả các lớp</option>
            {myClasses.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
          <Button variant="secondary" className="flex items-center gap-2 h-[38px] bg-white">
            <Filter size={16} /> Lọc
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead key={idx}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {myHomework.filter(hw => hw.title.toLowerCase().includes(search.toLowerCase())).map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col, colIdx) => (
                  <TableCell key={colIdx}>
                    {typeof col.accessor === "function" ? col.accessor(row) : (row as any)[col.accessor as string]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
