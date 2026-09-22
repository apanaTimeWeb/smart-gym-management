// RESPONSIBILITY: Defines the single canonical API success/error envelope used by every endpoint.
// FLOW: Controller result → CoreResponseInterceptor → ApiResponse<T>.

export interface ValidationErrorItem { field:string; message:string; } export interface PaginationMeta { total:number; page:number; limit:number; totalPages:number; hasNextPage:boolean; hasPrevPage:boolean; } export interface CoreApiResponse<T>{success:boolean;message:string;data:T|null;meta?:PaginationMeta;error?:string;errorCode?:string;statusCode?:number;validationErrors?:ValidationErrorItem[];}
