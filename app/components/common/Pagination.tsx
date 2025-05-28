'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  language: string;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, itemsPerPage, totalItems, language }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const t = (key: string) => {
    const texts: { [key: string]: { [lang: string]: string } } = {
      previous: { en: 'Previous', zh: '上一页' },
      next: { en: 'Next', zh: '下一页' },
      showingRange: { en: `Showing ${startItem}-${endItem} of ${totalItems} results`, zh: `显示 ${startItem}-${endItem} 条，共 ${totalItems} 条结果` },
      pageOf: { en: `Page ${currentPage} of ${totalPages}`, zh: `第 ${currentPage} 页 / 共 ${totalPages} 页` },
    };
    return texts[key]?.[language] || texts[key]?.['en'] || key;
  };
  
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page or no items
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 px-1">
      <div className="text-sm text-gray-700 mb-2 sm:mb-0">
        {t('showingRange')}
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <ChevronLeft size={16} className="mr-1" />
          {t('previous')}
        </button>
        <span className="text-sm text-gray-700 hidden md:block">
          {t('pageOf')}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {t('next')}
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination; 