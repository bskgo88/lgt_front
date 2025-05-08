import React, { useState } from 'react';
import { Select, MenuItem, } from '@mui/material';

const FilterPopup = ({ isOpen, onClose }) => {
  if (!isOpen) {return null;}
  const handleApplyFilter = () => {console.log('필터 적용!'); onClose();}// 팝업 닫기};
  const [isSelOpen, setIsOpen] = useState(false);
  const selectOpen = () => {setIsOpen(true);};
  const selectClose = () => {setIsOpen(false);};
  const [region, setRegion] = useState('');
  const regionOptions = ['서울', '경기', '부산', '대구']; // 예시 지역 옵션

  const handleRegionChange = (event) => {setRegion(event.target.value);};

  const menuProps = {
    PaperProps: {
      className: 'CustomList',
    },
    MenuListProps: {
      className: 'CustomListBox',
    },
  };

  const checkboxData = [
    { id: 'check1', label: 'region' },
    { id: 'check2', label: 'Country' },
    { id: 'check3', label: 'Platform' },
    { id: 'check4', label: 'Platform Code' },
    { id: 'check5', label: 'SW Version' },
    { id: 'check6', label: 'Device' },
    { id: 'check7', label: 'Device Model' },
    { id: 'check8', label: 'Display' },
    { id: 'check9', label: 'CP' },
    { id: 'check10', label: 'Studio' },
    { id: 'check11', label: 'Day' },
    { id: 'check12', label: 'Time' },
    { id: 'check13', label: 'Segment List' },
  ];

  const checkboxData2 = [
    { id: 'check1', label: 'region' },
    { id: 'check2', label: 'Country' },
    { id: 'check3', label: 'Platform' },
    { id: 'check4', label: 'Platform Code' },
    { id: 'check5', label: 'SW Version' },
    { id: 'check6', label: 'Device' },
    { id: 'check7', label: 'Device Model' },
    { id: 'check8', label: 'Display' },
    { id: 'check9', label: 'CP' },
    { id: 'check10', label: 'Studio' },
    { id: 'check11', label: 'Day' },
    { id: 'check12', label: 'Time' },
    { id: 'check13', label: 'Segment List' },
  ];

  const checkboxData3 = [
    { id: 'check1', label: 'EU' },
    { id: 'check2', label: 'Asia' },
  ];

  const checkboxData4 = [
    { id: 'check1', label: 'OLED' },
    { id: 'check2', label: 'QLED' },
    { id: 'check3', label: 'Nano-cell' },
    { id: 'check4', label: 'FHD' },
  ];

  const checkboxData5 = [
    { id: 'check1', label: 'Monday' },
    { id: 'check2', label: 'Trusdayy' },
    { id: 'check3', label: 'Wedsnesday' },
    { id: 'check4', label: 'Thursday' },
    { id: 'check3', label: 'Friday' },
    { id: 'check4', label: 'Saturday' },
  ];

  const radioItem = [
    { id: 'check1', label: 'Watched', name: "radio1"},
    { id: 'check2', label: 'Unwatched', name: "radio1"},
  ];
  


  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="filterTitle">
          <strong>Create New Filter</strong>
        </div>
        <div className="inboxDepth">
          {/* Left Depth */}
          <div className="leftDepth">
            <div className="leftContent">
              <div className="filterCategory">
                <h4>Basic</h4>
                <ul className="filterList">
                {checkboxData.map((item) => (
                  <li key={item.id}>
                    <div className="checkitem">
                      <input id={item.id} type="checkbox" />
                      <label htmlFor={item.id} className="checkIcon"></label>
                      <label className="text">{item.label}</label>
                    </div>
                  </li>
                ))}
                </ul>
              </div>
              <div className="filterCategory">
                <h4>Content</h4>
                <ul className="filterList">
                {checkboxData2.map((item) => (
                  <li key={item.id}>
                    <div className="checkitem">
                      <input id={item.id} type="checkbox" />
                      <label htmlFor={item.id} className="checkIcon"></label>
                      <label className="text">{item.label}</label>
                    </div>
                  </li>
                ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Depth */}
          <div className="rightDepth">
            <div className="rightContent">
              <div className="filterCategory">
                <h4>Basic</h4>
                <div className="filterBox">
                  <div className="filterinBox">
                    <strong className="inTitle">Region</strong>
                    <div className="singleCont">
                      <Select
                        className={`conditionSelect Search ${isSelOpen ? 'Open' : ''}`}
                        style={{flex:"1 1 100%"}}
                        value={region}
                        open={isSelOpen}
                        onOpen={selectOpen}
                        onClose={selectClose}
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
                    </div>
                    <div className="rowCont">
                      {checkboxData3.map((item) => (
                        <div className="checkitem">
                          <input id={item.id} type="checkbox" />
                          <label htmlFor={item.id} className="checkIcon"></label>
                          <label className="text">{item.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="filterinBox">
                    <strong className="inTitle">Contry</strong>
                    <div className="singleCont">
                      <Select
                        className={`conditionSelect Search ${isSelOpen ? 'Open' : ''}`}
                        style={{flex:"1 1 100%"}}
                        value={region}
                        open={isSelOpen}
                        onOpen={selectOpen}
                        onClose={selectClose}
                        onChange={handleRegionChange}
                        MenuProps={menuProps}
                        renderValue={(selected) => {
                          if (selected === '') {
                            return <div className="placeholder">Search to add Contry</div>; // Placeholder 텍스트
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
                    </div>
                  </div>

                  <div className="filterinBox">
                    <strong className="inTitle">Display</strong>
                    <div className="rowCont row4">
                      {checkboxData4.map((item) => (
                        <div className="checkitem">
                          <input id={item.id} type="checkbox" />
                          <label htmlFor={item.id} className="checkIcon"></label>
                          <label className="text">{item.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="filterinBox">
                    <strong className="inTitle">Day</strong>
                    <div className="rowCont row4">
                      {checkboxData5.map((item) => (
                        <div className="checkitem">
                          <input id={item.id} type="checkbox" />
                          <label htmlFor={item.id} className="checkIcon"></label>
                          <label className="text">{item.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="filterinBox">
                    <strong className="inTitle">Time</strong>
                    <div className="rowCont row2">
                      <input type="text" className="filterInput"></input>
                      <Select
                        className={`conditionSelect ${isSelOpen ? 'Open' : ''}`}
                        value={region}
                        open={isSelOpen}
                        onOpen={selectOpen}
                        onClose={selectClose}
                        onChange={handleRegionChange}
                        MenuProps={menuProps}
                        renderValue={(selected) => {
                          if (selected === '') {
                            return <div className="placeholder">Second</div>; // Placeholder 텍스트
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
                    </div>
                  </div>

                  <div className="filterinBox">
                    <strong className="inTitle">Contry</strong>
                    <div className="singleCont">
                      <Select
                        className={`conditionSelect ${isSelOpen ? 'Open' : ''}`}
                        style={{flex:"1 1 100%"}}
                        value={region}
                        open={isSelOpen}
                        onOpen={selectOpen}
                        onClose={selectClose}
                        onChange={handleRegionChange}
                        MenuProps={menuProps}
                        renderValue={(selected) => {
                          if (selected === '') {
                            return <div className="placeholder">Suits_Acquistion</div>; // Placeholder 텍스트
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="filterCategory">
                <h4>Content</h4>
                <div className="filterBox">
                  <div className="filterinBox">
                    <strong className="inTitle">Stream Type</strong>
                    <div className="rowCont row2">
                      <Select
                        className={`conditionSelect Search ${isSelOpen ? 'Open' : ''}`}
                        value={region}
                        open={isSelOpen}
                        onOpen={selectOpen}
                        onClose={selectClose}
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
                      <Select
                        className={`conditionSelect Search ${isSelOpen ? 'Open' : ''}`}
                        value={region}
                        open={isSelOpen}
                        onOpen={selectOpen}
                        onClose={selectClose}
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
                    </div>
                  </div>

                  <div className="filterinBox">
                    <strong className="inTitle">Content Type</strong>
                    <div className="rowCont row2">
                      <Select
                        className={`conditionSelect Search ${isSelOpen ? 'Open' : ''}`}
                        value={region}
                        open={isSelOpen}
                        onOpen={selectOpen}
                        onClose={selectClose}
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
                      <Select
                        className={`conditionSelect Search ${isSelOpen ? 'Open' : ''}`}
                        value={region}
                        open={isSelOpen}
                        onOpen={selectOpen}
                        onClose={selectClose}
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
                    </div>
                  </div>

                  <div className="filterinBox">
                    <strong className="inTitle">Session Duration</strong>
                    <div className="rowCont row2">
                      <div className="rowLinebox">
                        <input type="text" className="filterInput"/>
                        <span class="center">-</span>
                        <input type="text" className="filterInput" placeholder="Unlimited"/>
                      </div>
                      <Select
                        className={`conditionSelect Search ${isSelOpen ? 'Open' : ''}`}
                        value={region}
                        open={isSelOpen}
                        onOpen={selectOpen}
                        onClose={selectClose}
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
                    </div>
                  </div>
                </div>
              </div>

              <div className="filterCategory">
                <h4>Content</h4>
                <div className="filterBox">
                  <div className="filterinBox">
                    <strong className="inTitle">Stream Type</strong>
                    <div className="rowCont row2">
                      {radioItem.map((item) => (
                        <div className="radioitem">
                          <input id={item.id} type="radio" name={item.name} checked={item.checkset}/>
                          <label htmlFor={item.id} className="checkIcon"></label>
                          <label className="text">{item.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="DepthFooter">
          <button onClick={onClose} className="resetButton">Cancel</button>
          <button onClick={handleApplyFilter} className="okButton">OK</button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;