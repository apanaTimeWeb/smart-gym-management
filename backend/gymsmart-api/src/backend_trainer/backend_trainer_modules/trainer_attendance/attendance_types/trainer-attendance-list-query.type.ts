// RESPONSIBILITY: Defines isolated shared type contracts for a single backend concern.
// FLOW: Typed producer/consumer boundary → compile-time contract only; no runtime business behavior.

export interface AttendanceListQuery { page:number;limit:number;startDate?:string;endDate?:string;date?:string;search?:string;type?:string;staffId?:string;sortBy:string;sortDirection:string; }
