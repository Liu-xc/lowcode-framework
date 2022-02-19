export interface RequestResponse {
  data: any,
  status: number,
  statusText: string,
  headers: Record<string, string>,
  config: Record<string, any>,
  request: Record<string, any>
}