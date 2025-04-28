import { IconButton, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import React from 'react';

function CustomTablePagination({ count, page, rowsPerPage, onPageChange }) {
  const displayedPages = 5; // 표시할 페이지 번호 개수
  const totalPages = Math.ceil(count / rowsPerPage);

  const getPaginationItems = () => {
    const items = [];
    if (totalPages <= displayedPages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      const startPage = Math.max(1, page + 1 - Math.floor(displayedPages / 2));
      const endPage = Math.min(totalPages, startPage + displayedPages - 1);

      if (startPage > 1) {
        items.push(1);
        if (startPage > 2) {
          items.push('...');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        items.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          items.push('...');
        }
        items.push(totalPages);
      }
    }
    return items;
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}>
      <IconButton onClick={() => onPageChange(null, page - 1)} disabled={page === 0}>
        <KeyboardArrowLeft />
      </IconButton>
      {getPaginationItems().map((item, index) => (
        <React.Fragment key={index}>
          {item === '...' ? (
            <Typography sx={{ margin: '0 8px' }}>...</Typography>
          ) : (
            <IconButton
              onClick={() => onPageChange(null, item - 1)}
              sx={{
                borderRadius: '8px',
                margin: '0 4px',
                backgroundColor: page + 1 === item ? '#e0f2f7' : 'transparent',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <Typography color={page + 1 === item ? 'primary' : 'inherit'}>{item}</Typography>
            </IconButton>
          )}
        </React.Fragment>
      ))}
      <IconButton onClick={() => onPageChange(null, page + 1)} disabled={page >= totalPages - 1}>
        <KeyboardArrowRight />
      </IconButton>
    </div>
  );
}

export default CustomTablePagination;