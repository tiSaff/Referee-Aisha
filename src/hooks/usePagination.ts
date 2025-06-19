import { useMemo } from 'react';
import { usePaginationStore } from '../store/paginationStore';

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationReturn<T> {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  paginatedData: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export const usePagination = <T>({
  data,
  itemsPerPage = 10,
  initialPage = 1
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const { 
    currentPage, 
    setCurrentPage,
    resetToFirstPage 
  } = usePaginationStore();

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  // Reset to first page when data changes significantly
  React.useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      resetToFirstPage();
    }
  }, [totalPages, currentPage, resetToFirstPage]);

  return {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    canGoNext,
    canGoPrev
  };
};