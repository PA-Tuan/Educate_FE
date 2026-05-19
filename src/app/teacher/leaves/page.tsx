"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/Table";
import { FilePlus, FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import { leaves } from "@/mockData";

export default function TeacherLeavesPage() {
  const teacherName = "Nguyễn Minh Tuấn";
  
  // Create some fake leave records for this teacher based on mock data structure
  const myLeaves = [
    {
      id: "XN-101",
      name: teacherName,
      role: "Giáo viên TOEIC",
      type: "Nghỉ phép năm",
      from: "25/04/2024",
      to: "26/04/2024",
      days: 2,
      reason: "Việc gia đình",
      status: "Chờ duyệt",
      submitted: "20/04/2024",
    },
    {
      id: "XN-102",
      name: teacherName,
      role: "Giáo viên TOEIC",
      type: "Nghỉ ốm",
      from: "10/03/2024",
      to: "11/03/2024",
      days: 2,
      reason: "Bệnh",
      status: "Đã duyệt",
      submitted: "09/03/2024",
    }
  ];

  const columns = [
    { header: "Loại nghỉ phép", accessor: "type" as const },
    { header: "Từ ngày", accessor: "from" as const },
    { header: "Đến ngày", accessor: "to" as const },
    { header: "Số ngày", accessor: "days" as const },
    { header: "Lý do", accessor: "reason" as const },
    { header: "Ngày nộp", accessor: "submitted" as const },
    { 
      header: "Trạng thái", 
      accessor: (row: any) => {
        if (row.status === "Đã duyệt") return <Badge variant="success">Đã duyệt</Badge>;
        if (row.status === "Từ chối") return <Badge variant="danger">Từ chối</Badge>;
        return <Badge variant="warning">Chờ duyệt</Badge>;
      }
    },
    {
      header: "Thao tác",
      accessor: (row: any) => (
        <Button variant="secondary" className="text-xs h-8 px-3">
          Chi tiết
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main mb-1">Đơn xin nghỉ phép</h1>
          <p className="text-sm text-text-muted">Quản lý và tạo mới các đơn xin nghỉ phép, nghỉ ốm</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <FilePlus size={16} /> Tạo đơn mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Tổng số đơn", value: myLeaves.length, icon: <FileText size={20} />, color: "bg-blue-50 text-blue-600" },
          { label: "Chờ duyệt", value: myLeaves.filter(l => l.status === "Chờ duyệt").length, icon: <Clock size={20} />, color: "bg-warning-light text-warning-dark" },
          { label: "Đã duyệt", value: myLeaves.filter(l => l.status === "Đã duyệt").length, icon: <CheckCircle size={20} />, color: "bg-emerald-50 text-emerald-600" },
          { label: "Từ chối", value: myLeaves.filter(l => l.status === "Từ chối").length, icon: <XCircle size={20} />, color: "bg-error-light text-error-dark" },
        ].map(s => (
          <Card key={s.label} className="p-4 flex items-center gap-4 border border-border">
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
        <div className="p-5 border-b border-border flex items-center gap-2">
          <FileText size={18} className="text-text-muted" />
          <h3 className="font-bold text-lg text-text-main">Lịch sử xin nghỉ</h3>
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
            {myLeaves.map((row, idx) => (
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
