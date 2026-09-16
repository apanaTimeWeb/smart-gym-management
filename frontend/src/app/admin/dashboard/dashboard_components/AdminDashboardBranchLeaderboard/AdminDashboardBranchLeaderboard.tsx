"use client";
// RESPONSIBILITY: Renders the dashboard branch leaderboard with accessible, functional column sorting.

import { useMemo, useState } from 'react';
import { formatCurrency } from '@/lib/formatters';
import { useAdminDashboardLogic } from '@/app/admin/dashboard/dashboard_context/useAdminDashboardLogic';
import { useAdminGlobalStore } from '@/app/admin/admin_store/useAdminGlobalStore';
import { ChevronDown, ChevronUp, ChevronsUpDown, TrendingUp, TrendingDown, Minus, Building2 } from 'lucide-react';
import type { BranchPerformance } from '@/app/admin/dashboard/dashboard_types/AdminDashboardTypes';

type LeaderboardSortKey = 'name' | 'revenue' | 'activeMembers';
type LeaderboardSortDirection = 'asc' | 'desc';
function SortIcon({column,sortKey,sortDir}:{column:LeaderboardSortKey;sortKey:LeaderboardSortKey;sortDir:LeaderboardSortDirection}){if(column!==sortKey)return <ChevronsUpDown size={13} className="text-disabled"/>;return sortDir==='asc'?<ChevronUp size={13} className="text-primary"/>:<ChevronDown size={13} className="text-primary"/>;}
function sortBranches(data: BranchPerformance[], key: LeaderboardSortKey, direction: LeaderboardSortDirection){return [...data].sort((a,b)=>{const av=a[key], bv=b[key]; const result=typeof av==='number'&&typeof bv==='number'?av-bv:String(av).localeCompare(String(bv),undefined,{numeric:true}); return direction==='asc'?result:-result;});}
export default function AdminDashboardBranchLeaderboard(){
  const {stats}=useAdminDashboardLogic(); const {selectedBranchId,setSelectedBranchId}=useAdminGlobalStore();
  const [sortKey,setSortKey]=useState<LeaderboardSortKey>('revenue'); const [sortDir,setSortDir]=useState<LeaderboardSortDirection>('desc');
  const rows=useMemo(()=>sortBranches(stats?.branchLeaderboard??[],sortKey,sortDir),[stats?.branchLeaderboard,sortKey,sortDir]);
  const handleSort=(key:LeaderboardSortKey)=>{if(sortKey===key)setSortDir((d)=>d==='asc'?'desc':'asc');else{setSortKey(key);setSortDir('desc');}};
  if(!stats?.branchLeaderboard)return null;
  return <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl shadow-lg p-6"><div className="flex items-center gap-3 mb-6"><div className="p-2.5 bg-primary/20 text-primary rounded-xl"><Building2 size={20}/></div><div><h2 className="text-lg font-bold text-foreground">Branch Leaderboard</h2><p className="text-xs text-secondary">Top performing locations by revenue</p></div></div><div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="border-b border-border/10 text-xs font-semibold text-secondary uppercase tracking-wider"><th className="pb-3 pl-2">Rank</th>{(['name','revenue','activeMembers'] as const).map((key)=><th key={key} onClick={()=>handleSort(key)} className="pb-3 cursor-pointer select-none"><div className={`${key==='name'?'text-left':'text-right'} flex items-center gap-1.5 ${key!=='name'?'justify-end':''}`}>{key==='name'?'Branch Name':key==='revenue'?'Revenue':'Active Members'}<SortIcon column={key} sortKey={sortKey} sortDir={sortDir}/></div></th>)}<th className="pb-3 text-center">Trend</th></tr></thead><tbody className="divide-y divide-white/5">{rows.map((branch,index)=>{const selected=selectedBranchId===branch.id;return <tr key={branch.id} className={`motion-safe:transition-colors group cursor-pointer ${selected?'bg-primary/10 border-l-2 border-primary':'hover:bg-card/5'}`} tabIndex={0} onClick={()=>setSelectedBranchId(branch.id)} onKeyDown={(e)=>{if(e.key==='Enter'||e.key===' ')setSelectedBranchId(branch.id);}}><td className="py-3 pl-2 text-xs font-bold text-secondary">{index+1}.</td><td className="py-3"><span className="text-sm font-semibold text-foreground">{branch.name}</span></td><td className="py-3 text-right"><span className="text-sm font-bold text-success">{formatCurrency(branch.revenue)}</span></td><td className="py-3 text-right"><span className="text-sm font-medium text-foreground">{branch.activeMembers}</span></td><td className="py-3 text-center"><div className="flex justify-center">{branch.trend==='up'&&<TrendingUp size={16} className="text-success"/>}{branch.trend==='down'&&<TrendingDown size={16} className="text-danger"/>}{branch.trend==='flat'&&<Minus size={16} className="text-secondary"/>}</div></td></tr>;})}</tbody></table></div></div>
}
