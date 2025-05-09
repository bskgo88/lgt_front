import React, { useRef, useEffect, useState } from 'react';
import { Select, MenuItem, TextField, Tooltip, IconButton, ListItemText } from "@mui/material";
import Image from 'next/image';

import LGDatePicker from '@/pages/audience/component/datepicker';
import InfoTooltip from '@/pages/audience/modal/tooltip';

import IC_Date from "@/assets/images/icons/basic/btn_action_md_bk_date_n.png";
import IC_Close from "@/assets/images/icons/action/btn_action_md_bk_close_n.png";
import IC_Info from "@/assets/images/icons/infomation/btn_sm_help_n.png";

export default function ModalCont ({ handleClose }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const dateInputRef = useRef(null);
  const datePickerPopupRef = useRef(null);
  const [timeRange, setTimeRange] = useState('');

  const [condition, setCondition] = useState('Is equal to');
  const [region, setRegion] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const regionOptions = ['서울', '경기', '부산', '대구']; // 예시 지역 옵션

  const selectOpen = () => {setIsOpen(true);};
  const selectClose = () => {setIsOpen(false);};
  const selectOpen2 = () => {setIsOpen2(true);};
  const selectClose2 = () => {setIsOpen2(false);};

  const menuProps = {
    PaperProps: {
      className: 'CustomList',
    },
    MenuListProps: {
      className: 'CustomListBox',
    },
  };

  const conditionOptionsWithTooltips = [
    { value: 'Is equal to', label: 'Is equal to' },
    { value: 'Contains', label: 'Contains'},
    { value: 'Start with', label: 'Start with'},
    { value: 'Ends with', label: 'Ends with'},
    { value: 'Is blank', label: 'Is blank'},
    { value: 'Is null', label: 'Is null'},
    { value: 'Is not equal to', label: 'Is not equal to', tooltip: 'Whenever a negative condition is used along with a positive condition on the same field, Conviva will automatically combine them using AND logic.' },
    { value: 'Does not contain', label: 'Does not contain', tooltip: 'Whenever a negative condition is used along with a positive condition on the same field, Conviva will automatically combine them using AND logic.' },
    { value: 'Not starts with', label: 'Not starts with', tooltip: 'Whenever a negative condition is used along with a positive condition on the same field, Conviva will automatically combine them using AND logic.' },
    { value: 'Not end with', label: 'Not end with', tooltip: 'Whenever a negative condition is used along with a positive condition on the same field, Conviva will automatically combine them using AND logic.' },
    { value: 'Is not null', label: 'Is not null', tooltip: 'Whenever a negative condition is used along with a positive condition on the same field, Conviva will automatically combine them using AND logic.' },
  ];

  const handleConditionChange = (event) => {setCondition(event.target.value);};
  const handleRegionChange = (event) => {setRegion(event.target.value);};
  const handleDateInputChangeClick = () => {setIsDatePickerVisible(!isDatePickerVisible);};

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start || null); // undefined일 경우 null로 처리
    setEndDate(end || null);   // undefined일 경우 null로 처리
    setTimeRange(
      start && end
        ? `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
        : start
        ? start.toLocaleDateString()
        : ''
    );
  };

  const closeDatePickerPopup = () => {
    setIsDatePickerVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDatePickerVisible &&
        datePickerPopupRef.current &&
        !datePickerPopupRef.current.contains(event.target) &&
        dateInputRef.current &&
        !dateInputRef.current.contains(event.target)
      ) {
        setIsDatePickerVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDatePickerVisible]);

  const [segmentName, setSegmentName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTab, setSelectedTab] = useState('Basic');

  const tabs = ['Basic', 'Content', 'First Stream', 'Custom Tag'];

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    // 탭에 따른 컨텐츠 변경 로직 (추후 구현)
    console.log(`${tab} 탭이 선택되었습니다.`);
  };

  return (
    <div className="popupContainer">
      <div className="popupHeader">
        <strong className="pHTitle">Create Segment</strong>
        <button onClick={handleClose} className="closeButton">
          <Image src={IC_Close} alt="Close Icon" height={24} width={24} />
        </button>
      </div>

      <div className="popupBody">
        <div className="inputGroup">
          <label htmlFor="segmentName">Segment Name *</label>
          <input
            type="text"
            id="segmentName"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <label htmlFor="categoryTags">Category Tags</label>
          <input type="text" id="categoryTags" />
        </div>

        <div className="inputGroup">
          <label htmlFor="timeRange">Time Range</label>
          <div className="timeRangeInput">
            <input
              type="text"
              id="timeRange"
              placeholder="Select time range"
              value={timeRange}
              readOnly
              ref={dateInputRef}
              onClick={handleDateInputChangeClick}
            />
            {isDatePickerVisible && (
              <div className="datePickerPopupWrapper" ref={datePickerPopupRef}>
                <LGDatePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={handleDateChange}
                  onClose={closeDatePickerPopup}
                />
              </div>
            )}
            <Image className="inpitImg" src={IC_Date} alt="date Icon" height={24} width={24} />
          </div>
        </div>

        <div className="tabButtons">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={selectedTab === tab ? 'activeTab' : ''}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tabContent">
          {selectedTab === 'Basic' && (
            <div className="tabInCont">
              <p className="tcTitle">Segment based on content watched. The logic between different dimensions/metrics is AND.</p>
              <div className="filterGroup">
                <label htmlFor="region" className="filterLabel">
                  Region <span className="infoIcon"><Image src={IC_Info} alt="info Icon" height={20} width={20}/></span>
                </label>
                <div className="filterRow">
                  <Select
                    className={`conditionSelect ${isOpen ? 'Open' : ''}`}
                    style={{flex:"1 1 100px"}}
                    value={condition}
                    open={isOpen}
                    onOpen={selectOpen}
                    onClose={selectClose}
                    onChange={handleConditionChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    MenuProps={menuProps}
                    renderValue={(selected) => {
                      const selectedOption = conditionOptionsWithTooltips.find(opt => opt.value === selected);
                      return selectedOption ? selectedOption.label : '';
                    }}
                  >
                    {conditionOptionsWithTooltips.map((option) => (
                      <MenuItem value={option.value} key={option.value}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                          <ListItemText primary={option.label} />
                          {option.tooltip && (
                            <InfoTooltip title={option.tooltip} />
                          )}
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    className={`conditionSelect Search ${isOpen2 ? 'Open' : ''}`}
                    style={{flex:"1 1 60%"}}
                    value={region}
                    open={isOpen2}
                    onOpen={selectOpen2}
                    onClose={selectClose2}
                    onChange={handleRegionChange}
                    MenuProps={menuProps}
                    renderValue={(selected) => {
                      if (selected === '') {
                        return <div className="placeholder">Search to add Region</div>; // Placeholder 텍스트
                      }
                      return selected;
                    }}
                    displayEmpty
                  >
                    {regionOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <span className="filterOR"><span>OR</span></span>
                  <button className="removeButton"><span></span></button>
                </div>
              </div>

              <div className="filterGroup">
                <label htmlFor="country" className="filterLabel">
                  Country <span className="infoIcon"><Image src={IC_Info} alt="info Icon" height={20} width={20}/></span>
                </label>
                <div className="filterRow">
                  <select style={{flex:"1 1 100px"}}>
                    <option>Is equal to</option>
                  </select>
                  <select style={{flex:"1 1 60%"}} className="search">
                    <option className="placeholder" value="" disabled hidden selected>Search to add Region</option>
                    <option></option>
                  </select>
                  <span className="filterOR"><span>OR</span></span>
                  <button className="removeButton"><span></span></button>
                </div>
              </div>
              {/* Basic 탭의 다른 컨텐츠 */}
            </div>
          )}
          {selectedTab === 'Content' && (
            <div className="tabInCont">
              {/* Content 탭의 컨텐츠 */}
              <p className="tcTitle">Content 탭 내용입니다.</p>
            </div>
          )}
          {selectedTab === 'First Stream' && (
            <div className="tabInCont">
              {/* First Stream 탭의 컨텐츠 */}
              <p className="tcTitle">First Stream 탭 내용입니다.</p>
            </div>
          )}
          {selectedTab === 'Custom Tag' && (
            <div className="tabInCont">
              {/* Custom Tag 탭의 컨텐츠 */}
              <p className="tcTitle">Custom Tag 탭 내용입니다.</p>
            </div>
          )}
        </div>
      </div>

      <div className="popupFooter">
        <button onClick={() => console.log('취소')} className="cancelButton">
          Cancel
        </button>
        <button onClick={() => console.log('확인')} className="okButton">
          OK
        </button>
      </div>
    </div>
  );
};