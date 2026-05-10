import React from 'react';
import { GraduationCap, Award } from 'lucide-react';
import { EditableText } from './EditableText';
import type { ResumeData } from '../types';

interface ResumeEducationProps {
  data: ResumeData;
  setData: (d: ResumeData) => void;
  isEditing: boolean;
}

export const ResumeEducation = ({ data, setData, isEditing }: ResumeEducationProps) => {
  return (
    <div className="flex flex-col gap-8">
      {/* Education */}
      <section>
        <h3 className="text-[18px] font-bold mb-5 flex items-center gap-3 text-[#1A1A1A]">
          <GraduationCap className="text-[#0047BB] w-5 h-5" /> 학력 및 교육
        </h3>
        <div className="space-y-6">
          {data.education.map((edu, idx) => (
            <div key={idx} className="relative pl-6 border-l-2 border-zinc-200/80 pb-6 last:pb-0">
              <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-[#0047BB] ring-4 ring-[#FCFCFC]"></div>
              <div className="flex flex-col gap-1 mb-2.5">
                <h4 className="font-bold text-[14.5px] text-[#1A1A1A] leading-tight">
                  <EditableText value={edu.title} onSave={(v) => { const e = [...data.education]; e[idx].title = v; setData({...data, education: e}); }} isEditing={isEditing} />
                </h4>
                <span className="text-[11px] font-semibold text-zinc-400">
                  <EditableText value={edu.period} onSave={(v) => { const e = [...data.education]; e[idx].period = v; setData({...data, education: e}); }} isEditing={isEditing} />
                </span>
              </div>
              <p className="text-[12.5px] text-[#333333] leading-relaxed font-medium">
                <EditableText value={edu.description} onSave={(v) => { const e = [...data.education]; e[idx].description = v; setData({...data, education: e}); }} isEditing={isEditing} markdown={true} />
              </p>
              {edu.details && (
                <ul className="flex flex-col gap-1 mt-2.5">
                  {edu.details.map((detail, dIdx) => (
                    <li key={dIdx} className="relative pl-3 text-[12px] leading-relaxed text-zinc-500 font-medium">
                      <span className="absolute left-0 top-[7.5px] w-1 h-1 rounded-full bg-zinc-300"></span>{detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Certificates */}
      <section>
        <h3 className="text-[18px] font-bold mb-4 flex items-center gap-3 text-[#1A1A1A]">
          <Award className="text-[#0047BB] w-5 h-5" /> 자격증
        </h3>
        <div className="flex flex-col gap-4">
          {data.certificates && data.certificates.map((cert, idx) => (
            <div key={idx} className="flex flex-col gap-0.5">
              <span className="font-bold text-[13.5px] text-[#1A1A1A]">
                <EditableText value={cert.name} onSave={(v) => { const c = [...(data.certificates||[])]; c[idx].name = v; setData({...data, certificates: c}); }} isEditing={isEditing} />
              </span>
              <div className="flex items-center gap-2 text-[11px] font-medium text-zinc-500">
                {cert.score && (
                  <>
                    <span>점수 <EditableText value={cert.score} onSave={(v) => { const c = [...(data.certificates||[])]; c[idx].score = v; setData({...data, certificates: c}); }} isEditing={isEditing} /></span>
                    <span className="w-0.5 h-0.5 rounded-full bg-zinc-300"></span>
                  </>
                )}
                <span>취득 {cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
