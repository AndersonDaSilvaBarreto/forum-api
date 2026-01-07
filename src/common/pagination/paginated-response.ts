export type PaginatedResponseType<T> = {
  data: T[];
  totalElements: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export class PaginatedResponse<T> {
  data: T[];
  totalElements: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;

  constructor(data: T[], totalElements: number, page: number, limit: number) {
    this.data = data;
    this.totalElements = totalElements;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(totalElements / limit);
    this.hasNext = page < this.totalPages;
    this.hasPrevious = page > 1;
  }
}
