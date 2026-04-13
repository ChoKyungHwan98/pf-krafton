import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface EditableTextProps {
  value: string;
  onSave: (v: string) => void;
  isEditing: boolean;
  className?: string;
  multiline?: boolean;
  markdown?: boolean;
}

export const EditableText = ({
  value,
  onSave,
  isEditing,
  className = "",
  multiline = false,
  markdown = false
}: EditableTextProps) => {
  if (!isEditing) {
    if (markdown) {
      return (
        <div className={`markdown-body !text-inherit !p-0 !bg-transparent !border-none [&>p]:!mb-0 ${className}`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
        </div>
      );
    }
    return <span className={className}>{value}</span>;
  }

  const baseClasses = "bg-[#1a1a1a] border-[#2a2a2a] text-[#e8e4dc] focus:border-[#0047BB]";

  return multiline || markdown ? (
    <textarea
      className={`w-full max-w-full border rounded-lg p-3 focus:outline-none font-mono text-[13px] leading-relaxed resize-y ${markdown ? 'min-h-[120px]' : ''} ${baseClasses} ${className}`}
      value={value}
      onChange={(e) => onSave(e.target.value)}
      rows={Math.max(3, value.split('\n').length)}
      placeholder={markdown ? "마크다운 문법을 지원합니다 (*볼드*, - 리스트 등)" : ""}
    />
  ) : (
    <input
      className={`w-full max-w-full border rounded-lg px-2 py-1 focus:outline-none font-sans ${baseClasses} ${className}`}
      value={value}
      onChange={(e) => onSave(e.target.value)}
    />
  );
};
