"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/Table";
import { Search, Filter, FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { studentHomework } from "@/mockData";

export default function StudentHomeworkPage() {
  const [search, setSearch] = useState("");
  
  // Fake data is now imported from mockData

  const columns = [
    { header: "Tên bài tập", accessor: "title" as const },
    { header: "Lớp học", accessor: "class" as const },
    { header: "Hạn nộp", accessor: "deadline" as const },
    { 
      header: "Trạng thái", 
      accessor: (row: any) => {
        if (row.studentStatus === "Đã chấm") return <Badge variant="success">Đã chấm</Badge>;
        if (row.studentStatus === "Đã nộp") return <Badge variant="default">Đã nộp</Badge>;
        if (row.studentStatus === "Quá hạn") return <Badge variant="danger">Quá hạn</Badge>;
        return <Badge variant="warning">Chưa nộp</Badge>;
      }
    },
    { 
      header: "Điểm số", 
      accessor: (row: any) => (
        <span className={row.score !== "-" && row.score !== "Chờ chấm" ? "font-bold text-success-dark" : "text-text-muted"}>
          {row.score}
        </span>
      ) 
    },
    {
      header: "Thao tác",
      accessor: (row: any) => (
        row.studentStatus === "Chưa nộp" ? (
          <Button variant="primary" className="text-xs h-8 px-3">Làm bài</Button>
        ) : (
          <Button variant="secondary" className="text-xs h-8 px-3">Xem lại</Button>
        )
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main mb-1">Bài tập</h1>
          <p className="text-sm text-text-muted">Quản lý bài tập về nhà và bài kiểm tra</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Tổng số bài tập", value: studentHomework.length, icon: <FileText size={20} />, color: "bg-blue-50 text-blue-600" },
          { label: "Đã nộp", value: studentHomework.filter(h => h.studentStatus === "Đã nộp" || h.studentStatus === "Đã chấm").length, icon: <CheckCircle size={20} />, color: "bg-emerald-50 text-emerald-600" },
          { label: "Chưa nộp", value: studentHomework.filter(h => h.studentStatus === "Chưa nộp").length, icon: <Clock size={20} />, color: "bg-warning-light text-warning-dark" },
          { label: "Quá hạn", value: studentHomework.filter(h => h.studentStatus === "Quá hạn").length, icon: <AlertTriangle size={20} />, color: "bg-error-light text-error-dark" },
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
          <Button variant="secondary" className="flex items-center gap-2 h-[38px] bg-white">
            <Filter size={16} /> Lọc trạng thái
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
            {studentHomework.filter(hw => hw.title.toLowerCase().includes(search.toLowerCase())).map((row, idx) => (
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
