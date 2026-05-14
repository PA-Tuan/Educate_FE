"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/Table";
import { Download, CreditCard, DollarSign, History, AlertCircle } from "lucide-react";
import { studentTransactions } from "@/mockData";

export default function StudentFinancePage() {
  // Mock data for student finance view is imported from mockData

  const columns = [
    { header: "Mã GD", accessor: "id" as const },
    { header: "Ngày giao dịch", accessor: "date" as const },
    { header: "Loại giao dịch", accessor: "type" as const },
    { header: "Phương thức", accessor: "method" as const },
    { 
      header: "Số tiền", 
      accessor: (row: any) => (
        <span className={row.amount.startsWith("+") ? "text-success-dark font-bold" : "text-error-dark font-bold"}>
          {row.amount}
        </span>
      ) 
    },
    { 
      header: "Trạng thái", 
      accessor: (row: any) => (
        <Badge variant={row.status === "Thành công" ? "success" : row.status === "Đang xử lý" ? "warning" : "danger"}>
          {row.status}
        </Badge>
      )
    },
    {
      header: "Thao tác",
      accessor: () => (
        <Button variant="secondary" className="text-xs h-8 px-3 flex items-center gap-1">
          <Download size={12} /> Biên lai
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-main mb-1">Tài chính & Học phí</h1>
          <p className="text-sm text-text-muted">Quản lý số dư và lịch sử thanh toán</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <CreditCard size={16} /> Nạp tiền ngay
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2 bg-gradient-to-r from-violet-600 to-primary text-white border-none relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <DollarSign size={20} />
              <span className="font-medium">Số dư ví học phí</span>
            </div>
            <h2 className="text-4xl font-black mb-6 tracking-tight">1.000.000 ₫</h2>
            
            <div className="flex gap-6 text-sm">
              <div>
                <p className="opacity-80 mb-1">Tổng đã nạp</p>
                <p className="font-semibold text-lg">15.000.000 ₫</p>
              </div>
              <div>
                <p className="opacity-80 mb-1">Tổng đã thanh toán</p>
                <p className="font-semibold text-lg">14.000.000 ₫</p>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute right-0 top-0 h-full w-64 bg-white/10 skew-x-12 translate-x-10 blur-2xl" />
          <div className="absolute right-10 bottom-10 opacity-20">
            <CreditCard size={120} />
          </div>
        </Card>

        <Card className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-text-main mb-4">
              <AlertCircle size={20} className="text-warning-dark" />
              <h3 className="font-bold text-lg">Học phí cần đóng</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Khóa TOEIC 600</span>
                <span className="font-semibold">3.500.000 ₫</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-text-muted">Tài liệu học tập</span>
                <span className="font-semibold">500.000 ₫</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-text-main">Tổng cộng</span>
                <span className="font-bold text-lg text-error-dark">4.000.000 ₫</span>
              </div>
            </div>
          </div>
          <Button variant="primary" className="w-full mt-6">Thanh toán ngay</Button>
        </Card>
      </div>

      <Card>
        <div className="p-5 border-b border-border flex items-center gap-2">
          <History size={18} className="text-text-muted" />
          <h3 className="font-bold text-lg text-text-main">Lịch sử giao dịch</h3>
        </div>
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((col, idx) => (
                  <TableHead key={idx}>{col.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentTransactions.map((row, idx) => (
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
        </div>
      </Card>
    </div>
  );
}
