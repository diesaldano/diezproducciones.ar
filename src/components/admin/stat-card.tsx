type StatCardProps = {
  icon: string;
  label: string;
  value: number | string;
  detail?: string;
};

export function StatCard({ icon, label, value, detail }: StatCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/30 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm font-medium text-zinc-400 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="text-3xl font-bold text-white font-montserrat">{value}</p>
      {detail && <p className="text-xs text-zinc-500 mt-2">{detail}</p>}
    </div>
  );
}
