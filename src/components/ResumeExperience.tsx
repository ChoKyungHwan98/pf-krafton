import React from 'react';
import { Briefcase, Users } from 'lucide-react';
import { EditableText } from './EditableText';
import type { ResumeData } from '../types';

interface ResumeExperienceProps {
  data: ResumeData;
  setData: (d: ResumeData) => void;
  isEditing: boolean;
}

export const ResumeExperience = ({ data, setData, isEditing }: ResumeExperienceProps) => {
  return (
    <section>
      <h3 className="text-[18px] font-bold mb-5 flex items-center gap-3 text-[#1A1A1A]">
        <Briefcase className="text-[#0047BB] w-5 h-5" /> 프로젝트 경험
      </h3>
      <div className="space-y-6">
        {data.experience.map((exp, idx) => (
          <div key={idx} className="relative pl-8 border-l-2 border-zinc-200/80 pb-2">
            <div className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-white border-[2.5px] border-[#0047BB] ring-4 ring-white"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-extrabold text-[18px] lg:text-[19px] text-[#1A1A1A] tracking-tight">
                  <EditableText value={exp.title} onSave={(v) => { const e = [...data.experience]; e[idx].title = v; setData({...data, experience: e}); }} isEditing={isEditing} />
                </h4>
                {exp.teamSize && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-400 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-full">
                    <Users className="w-2.5 h-2.5" />
                    {exp.teamSize}
                  </span>
                )}
              </div>
              <span className="text-[12px] font-semibold text-zinc-500 bg-zinc-50 px-2.5 py-0.5 rounded-sm border border-zinc-100/50 shrink-0">
                <EditableText value={exp.period} onSave={(v) => { const e = [...data.experience]; e[idx].period = v; setData({...data, experience: e}); }} isEditing={isEditing} />
              </span>
            </div>

            <div className="text-[14px] text-[#0047BB] font-bold mb-3 bg-[#0047BB]/5 block px-4 py-2 rounded-sm border-l-4 border-[#0047BB]">
              <EditableText value={exp.description} onSave={(v) => { const e = [...data.experience]; e[idx].description = v; setData({...data, experience: e}); }} isEditing={isEditing} markdown={true} />
            </div>

            <ul className="text-[14px] text-[#4A4A4A] space-y-3 list-none leading-relaxed font-medium">
              {exp.details.map((detail, dIdx) => (
                <li key={dIdx} className="relative pl-6">
                  <span className="absolute left-0 top-2 w-1.5 h-1.5 border border-[#0047BB] rounded-full"></span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
