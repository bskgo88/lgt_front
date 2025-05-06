import React, { useRef, useEffect, useState } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePickerPopup ({ startDate, endDate, onChange, onClose }) {
  const [currentDateLeft, setCurrentDateLeft] = useState(new Date());
  const [currentDateRight, setCurrentDateRight] = useState(new Date());
  
  useEffect(() => {
    console.log('DatePickerPopup - startDate prop:', startDate);
    console.log('DatePickerPopup - endDate prop:', endDate);
  }, [startDate, endDate]);

  useEffect(() => {
    setCurrentDateRight(new Date(currentDateLeft.getFullYear(), currentDateLeft.getMonth() + 1, 1));
  }, [currentDateLeft]);

  const handleMonthChangeLeft = (date) => {
    setCurrentDateLeft(date);
  };

  const handleQuickSelect = (days) => {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setDate(today.getDate() - days);
    onChange([pastDate, today]);
    onClose();
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    onChange([start || null, end || null]);
  };

  return (
    <div className="datePickerPopup twoCalendars">
      <div className="quickSelectButtons">
        <button onClick={() => handleQuickSelect(7)}>Last 7 days</button>
        <button onClick={() => handleQuickSelect(30)}>Last 30 days</button>
        <button onClick={() => handleQuickSelect(60)}>Last 60 days</button>
        <button onClick={() => handleQuickSelect(90)}>Last 90 days</button>
      </div>
      <div className="calendarsContainer">
        <div className="singleCalendar">
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            inline
            renderCustomHeader={({ date, changeMonth, prevMonthButtonDisabled }) => (
              <div className="customHeader">
                <div className="cHLeft">
                  <button
                    onClick={() => changeMonth(new Date(date.getFullYear() - 1, date.getMonth(), 1))}
                    className="prevYear"
                  >
                    &lt;&lt;
                  </button>
                  <button
                    onClick={() => changeMonth(new Date(date.getFullYear(), date.getMonth() - 1, 1))}
                    disabled={prevMonthButtonDisabled}
                    className="prevMonth"
                  >
                    &lt;
                  </button>
                </div>
                <span className="cHcenter">{date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</span>
                <div className="cHRight"/>
              </div>
            )}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            monthsShown={1}
            fixedHeight
            focused
            selected={currentDateLeft}
            onChangeMonth={handleMonthChangeLeft}
          />
        </div>
        <span className="lineCenter"></span>
        <div className="singleCalendar">
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateChange}
            inline
            renderCustomHeader={({ date, changeMonth, nextMonthButtonDisabled }) => (
              <div className="customHeader">
                <div className="cHLeft" />
                <span className="cHcenter">
                  {new Date(date.getFullYear(), date.getMonth() + 1).toLocaleString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <div className="cHRight">
                  <button
                    onClick={() => changeMonth(new Date(date.getFullYear(), date.getMonth() + 1, 1))}
                    disabled={nextMonthButtonDisabled}
                    className="nextMonth"
                  >
                    &gt;
                  </button>
                  <button
                    onClick={() => changeMonth(new Date(date.getFullYear() + 1, date.getMonth() + 1, 1))}
                    className="nextYear"
                  >
                    &gt;&gt;
                  </button>
                </div>
              </div>
            )}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            monthsShown={1}
            fixedHeight
            selected={currentDateRight}
            onChangeMonth={(date) => setCurrentDateRight(date)}
          />
        </div>
      </div>
      <div className="datePickerFooter">
        <button onClick={() => onChange([null, null])} className="resetButton">
          Reset
        </button>
        <button onClick={onClose} className="okButton">
          OK
        </button>
      </div>
    </div>
  );
};