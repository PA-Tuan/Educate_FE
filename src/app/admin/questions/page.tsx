"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Search, Plus, Filter, MoreHorizontal, Eye, Sparkles, Star, Trash2, ChevronLeft, ChevronRight, Bold, Italic, Underline, AlignLeft, AlignJustify, Link, Image, MoreVertical, Strikethrough, List } from "lucide-react";

const questions = [
  { id: "CH-001", content: "What is the main purpose of the TOEIC exam?", type: "Nhiều đáp án", subject: "TOEIC", tags: ["Reading", "Vocabulary"], difficulty: 3, answers: 4 },
  { id: "CH-002", content: "Choose the correct form of the verb in the sentence: She ___ to the office every day.", type: "Nối 2 cột", subject: "TOEIC", tags: ["Grammar", "Tense"], difficulty: 2, answers: 2 },
  { id: "CH-003", content: "Nghe đoạn hội thoại và chọn đáp án đúng nhất.", type: "Câu trả lời ngắn", subject: "IELTS", tags: ["Listening"], difficulty: 4, answers: 1 },
  { id: "CH-004", content: "Read the passage and answer: What is the author's main argument?", type: "Nhiều đáp án", subject: "IELTS", tags: ["Reading", "Comprehension"], difficulty: 5, answers: 4 },
  { id: "CH-005", content: "Điền vào chỗ trống: Management ___ a key role in organizational success.", type: "Câu trả lời ngắn", subject: "MOV", tags: ["Vocabulary", "Business"], difficulty: 3, answers: 1 },
];

const difficultyStars = (n: number) => Array.from({ length: 5 }, (_, i) => (
  <Star key={i} size={13} className={i < n ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
));

const answerOptions = [
  { text: "", correct: true },
  { text: "", correct: false },
  { text: "", correct: false },
  { text: "", correct: false },
];

export default function QuestionsPage() {
  const [showCreator, setShowCreator] = useState(false);
  const [search, setSearch] = useState("");
  const [answers, setAnswers] = useState(answerOptions);
  const [difficulty, setDifficulty] = useState(3);
  const [tags, setTags] = useState(["Reading", "Vocabulary", "Tense"]);
  const [questionType, setQuestionType] = useState("Nối 2 cột");

  const filtered = questions.filter((q) =>
    q.content.toLowerCase().includes(search.toLowerCase()) || q.subject.toLowerCase().includes(search.toLowerCase())
  );

  const toggleCorrect = (idx: number) => {
    setAnswers(prev => prev.map((a, i) => ({ ...a, correct: i === idx })));
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-main">Ngân hàng câu hỏi</h1>
          <p className="text-sm text-text-muted mt-0.5">Dashboard • Ngân hàng câu hỏi</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCreator(!showCreator)}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
          >
            <Sparkles size={16} />
            Generative AI
          </button>
          <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
            <Plus size={16} /> Thêm câu hỏi
          </button>
        </div>
      </div>

      {/* AI Creator Panel */}
      {showCreator && (
        <Card className="border-2 border-violet-100">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold bg-gradient-to-r from-violet-500 to-primary bg-clip-text text-transparent">
              Center Brain Generative
            </h2>
            <button className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-primary text-white px-4 py-2 rounded-btn text-sm font-semibold">
              <Sparkles size={14} /> Generative
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Question Settings */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-text-muted mb-1.5">Câu hỏi</p>
                {/* Type Selector */}
                <div className="border border-border rounded-btn p-3 mb-3">
                  <p className="text-xs text-text-muted mb-2">Chọn loại câu hỏi *</p>
                  <div className="flex gap-2 flex-wrap">
                    {["Nối 2 cột", "Chọn nhiều đáp án", "Câu trả lời ngắn"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setQuestionType(t)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors border ${
                          questionType === t
                            ? "bg-primary text-white border-primary"
                            : "border-border text-text-muted hover:border-primary hover:text-primary"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="border border-border rounded-btn p-3 mb-3">
                  <p className="text-xs text-text-muted mb-2">Gán thẻ</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="flex items-center gap-1 bg-primary text-white text-xs px-2.5 py-1 rounded-full font-medium">
                        {tag}
                        <button onClick={() => setTags(tags.filter(t => t !== tag))} className="hover:opacity-70 leading-none">×</button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <p className="text-xs text-text-muted mb-1.5">Độ khó</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} onClick={() => setDifficulty(n)}>
                        <Star size={20} className={n <= difficulty ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content editor */}
              <div>
                <p className="text-xs font-semibold text-text-muted mb-1.5">Nội dung câu hỏi</p>
                <div className="border border-border rounded-btn overflow-hidden">
                  <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border bg-gray-50 text-text-muted flex-wrap">
                    <span className="text-xs mr-1">Font</span>
                    <span className="w-px h-4 bg-border mx-1" />
                    {[Bold, Italic, Underline, Strikethrough].map((Icon, i) => (
                      <button key={i} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 transition-colors">
                        <Icon size={12} />
                      </button>
                    ))}
                    <span className="w-px h-4 bg-border mx-1" />
                    {[AlignLeft, AlignJustify, List].map((Icon, i) => (
                      <button key={i} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 transition-colors">
                        <Icon size={12} />
                      </button>
                    ))}
                    <span className="w-px h-4 bg-border mx-1" />
                    {[Link, Image, MoreVertical].map((Icon, i) => (
                      <button key={i} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 transition-colors">
                        <Icon size={12} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    className="w-full p-3 text-sm text-text-muted outline-none resize-none"
                    rows={4}
                    placeholder="Write something awesome..."
                  />
                </div>
              </div>

              {/* Hint */}
              <input
                className="w-full border border-border rounded-btn px-3 py-2 text-sm outline-none focus:border-primary text-text-muted"
                placeholder="Hướng dẫn trả lời câu hỏi"
              />

              {/* File upload */}
              <div className="border-2 border-dashed border-border rounded-btn p-6 flex flex-col items-center gap-2 hover:border-primary transition-colors cursor-pointer">
                <div className="text-3xl">📁</div>
                <p className="text-sm font-semibold text-text-main">Drop or select file</p>
                <p className="text-xs text-text-muted text-center">
                  Drop files here or click to <span className="text-primary underline cursor-pointer">browse</span> through your machine.
                </p>
              </div>
            </div>

            {/* Right: Answers */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-text-muted">Đáp án</p>
                <button className="flex items-center gap-1 text-primary text-xs font-semibold hover:underline">
                  <Plus size={13} /> Đáp án
                </button>
              </div>
              <div className="space-y-3">
                {answers.map((ans, idx) => (
                  <div key={idx} className="border border-border rounded-btn overflow-hidden">
                    <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border bg-gray-50 text-text-muted flex-wrap">
                      <span className="text-xs mr-1">Font</span>
                      <span className="w-px h-4 bg-border mx-1" />
                      {[Bold, Italic, Underline, Strikethrough].map((Icon, i) => (
                        <button key={i} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200">
                          <Icon size={12} />
                        </button>
                      ))}
                      <span className="w-px h-4 bg-border mx-1" />
                      {[AlignLeft, AlignJustify].map((Icon, i) => (
                        <button key={i} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200">
                          <Icon size={12} />
                        </button>
                      ))}
                      <span className="w-px h-4 bg-border mx-1" />
                      {[Link, Image, MoreVertical].map((Icon, i) => (
                        <button key={i} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200">
                          <Icon size={12} />
                        </button>
                      ))}
                      <div className="ml-auto flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                          <div
                            onClick={() => toggleCorrect(idx)}
                            className={`relative w-9 h-5 rounded-full cursor-pointer transition-colors ${ans.correct ? "bg-primary" : "bg-gray-200"}`}
                          >
                            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${ans.correct ? "left-4" : "left-0.5"}`} />
                          </div>
                          <span className="text-[10px] text-text-muted whitespace-nowrap">Đáp án đúng?</span>
                        </div>
                        <button className="hover:text-error transition-colors">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <textarea
                      className="w-full p-3 text-sm text-text-muted outline-none resize-none bg-white"
                      rows={2}
                      placeholder="Write something awesome..."
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-border">
            <button onClick={() => setShowCreator(false)} className="px-4 py-2 border border-border rounded-btn text-sm font-medium text-text-muted hover:bg-gray-50">
              Hủy
            </button>
            <button className="px-6 py-2 bg-primary text-white rounded-btn text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm">
              Lưu câu hỏi
            </button>
          </div>
        </Card>
      )}

      {/* Questions List */}
      <Card>
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full pl-9 pr-3 py-2 border border-border rounded-btn text-sm outline-none focus:border-primary bg-white"
              placeholder="Tìm câu hỏi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 border border-border rounded-btn px-3 py-2 text-sm text-text-muted hover:bg-gray-50">
            <Filter size={14} /> Bộ lọc
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-left py-3 px-4 font-medium text-text-muted">Mã CH</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Nội dung</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Loại</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Môn</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Thẻ</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Độ khó</th>
                <th className="text-left py-3 px-4 font-medium text-text-muted">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q) => (
                <tr key={q.id} className="border-b border-border last:border-0 hover:bg-gray-50/60">
                  <td className="py-3 px-4 font-mono text-xs text-text-muted">{q.id}</td>
                  <td className="py-3 px-4 max-w-[280px]">
                    <p className="font-medium text-text-main truncate">{q.content}</p>
                    <p className="text-xs text-text-muted">{q.answers} đáp án</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-light text-primary">{q.type}</span>
                  </td>
                  <td className="py-3 px-4 font-medium text-text-main">{q.subject}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {q.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full font-medium">{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-0.5">{difficultyStars(q.difficulty)}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-primary-light text-text-muted hover:text-primary transition-colors">
                        <Eye size={15} />
                      </button>
                      <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-error-light text-text-muted hover:text-error transition-colors">
                        <Trash2 size={15} />
                      </button>
                      <button className="w-8 h-8 rounded-btn flex items-center justify-center hover:bg-gray-100 text-text-muted">
                        <MoreHorizontal size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <p className="text-sm text-text-muted">Hiển thị {filtered.length}/{questions.length} câu hỏi</p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-btn border border-border hover:bg-gray-50 flex items-center justify-center text-text-muted"><ChevronLeft size={15} /></button>
            <button className="w-8 h-8 rounded-btn bg-primary text-white text-sm">1</button>
            <button className="w-8 h-8 rounded-btn border border-border hover:bg-gray-50 flex items-center justify-center text-text-muted"><ChevronRight size={15} /></button>
          </div>
        </div>
      </Card>
    </div>
  );
}
