import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { IC_Save, IC_Link, IC_ArrowGDown, IC_ArrowGUp, IC_SortAsc, IC_SortDesc, IC_SortDe, IC_ArrowCTrUp, IC_ArrowCTrDown, IC_DropIcon1, IC_Chart1, IC_Edit, IC_Trash } from '@/common/icons';
import { Box, Select, MenuItem, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from '@mui/material';
import CustomTablePagination from '@/common/paging'; // CustomTablePagination import
import ToggleSwitch from '@/common/toggle';

export default function AudienceAnalytics() {
  const [activeTab, setActiveTab] = useState('workbench');
  const [openSections, setOpenSections] = useState({});
  const handleTabClick = (tabName) => {setActiveTab(tabName);};
  const contentRefs = useRef({});
  
  const [isSelOpen, setIsOpen] = useState(false);
  const selectOpen = () => {setIsOpen(true);};
  const selectClose = () => {setIsOpen(false);};
  
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('program');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('Program');

  const [region, setRegion] = useState('');
  const regionOptions = ['서울', '경기', '부산', '대구']; // 예시 지역 옵션

  const handleRegionChange = (event) => {setRegion(event.target.value);};

  const toggleSection = (sectionName) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  useEffect(() => {
    // 컴포넌트가 클라이언트에 마운트된 이후에만 랜덤 데이터 생성
    setRows(generateData());
  }, []);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //grid data e

  const menuProps = {
    PaperProps: {
      className: 'CustomList',
    },
    MenuListProps: {
      className: 'CustomListBox',
    },
  };

  const checkboxData = [
    { id: 'check1', label: 'Segment ID' },
    { id: 'check2', label: 'Segment Name' },
  ];

  const checkboxData2 = [
    { id: 'check1', label: 'UD' },
    { id: 'check2', label: 'Access' },
    { id: 'check3', label: 'Duration' },
    { id: 'check4', label: 'Segment Name' },
  ];

  const dimensionsData = [
    {
      title: 'Basic',
      items: ['Region', 'Country', 'Platform Code', 'SW Version', 'Device', 'Device Model', 'Display', 'CP', 'Platform', 'Studio', 'Day', 'Time', 'Segment list'],
    },
    {
      title: 'Content',
      items: ['Stream Type', 'Content Type', 'Channel Genre', 'Program Genre', 'Session Duration', 'Channel Number', 'Rating', 'Watched Content Duration'],
    },
    {
      title: 'First Stream',
      items: ['Duration', 'Stream Type', 'Content Type', 'Channel Genre', 'Program Genre', 'CP', 'Channel Number', 'Platform Code', 'Rating', 'Studio', 'SW Version'],
    },
    {
      title: 'Custom Tag',
      items: [], // 예시: Custom Tag 아이템 없음
    },
  ];

  const savedItemsData = [
    {
      title: 'Son',
      modifiedBy: 'jang won Son',
      modifiedDate: '1 month ago',
      description: 'text text text text text text text text text text text text text text text text text text text text',
    },
    {
      title: 'Jen',
      modifiedBy: 'jenny',
      modifiedDate: '10 month ago',
      description: 'text text text text text text text text text text text text text text text text text text text text',
    },
    {
      title: 'Kimmy',
      modifiedBy: 'Yong',
      modifiedDate: '1 month ago',
      description: 'text text text text text text text text text text text text text text text text text text text text',
    },
    {
      title: 'Kimmy',
      modifiedBy: 'Yong',
      modifiedDate: '1 month ago',
      description: 'text text text text text text text text text text text text text text text text text text text text',
    },
    {
      title: 'Kimmy',
      modifiedBy: 'Yong',
      modifiedDate: '1 month ago',
      description: 'text text text text text text text text text text text text text text text text text text text text',
    },
    {
      title: 'Kimmy',
      modifiedBy: 'Yong',
      modifiedDate: '1 month ago',
      description: 'text text text text text text text text text text text text text text text text text text text text',
    },
    {
      title: 'Son',
      modifiedBy: 'jang won Son',
      modifiedDate: '1 month ago',
      description: 'text text text text text text text text text text text text text text text text text text text text',
    },
    {
      title: 'Son',
      modifiedBy: 'jang won Son',
      modifiedDate: '1 month ago',
      description: 'text text text text text text text text text text text text text text text text text text text text',
    },
    {
      title: 'Son',
      modifiedBy: 'jang won Son',
      modifiedDate: '1 month ago',
      description: 'text text text text text text text text text text text text text text text text text text text text',
    },
  ];

  //Grid 데이타
  // 헤더 정의
  const headCells = [
    { id: 'program', label: 'Program' },
    { id: 'channel', label: 'Channel' },
    { id: 'genre', label: (<span style={{lineHeight:"1.2"}}>Genre</span>) },
    { id: 'plays', label: 'Plays' },
    { id: 'totalMinutes', label: 'Total Minutes' },
    { id: 'uniqueSubscribers', label: (<span style={{lineHeight:"1.2"}}>Unique<br/>Subscribers</span>) },
    { id: 'minsPerSubscriber', label: (<span style={{lineHeight:"1.2"}}>Mins Per<br/>Subscriber</span>) },
    { id: 'minsPerSubscriberPercent', label: (<span style={{lineHeight:"1.2"}}>Mins Per<br/>Subscriber%</span>) },
  ];

  // 더미 데이터 생성
  function generateData() {
    return Array.from({ length: 500 }, () => ({
      program: 'Text column',
      channel: 'Text column',
      genre: 'Text column',
      plays: Math.floor(Math.random() * 1000),
      totalMinutes: Math.floor(Math.random() * 5000),
      uniqueSubscribers: Math.floor(Math.random() * 100),
      minsPerSubscriber: Math.floor(Math.random() * 200),
      minsPerSubscriberPercent: 100,
      trend: Math.random() > 0.5 ? 'up' : 'down',
    }));
  }

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const sortedRows = React.useMemo(() => stableSort(rows, getComparator(order, orderBy)), [rows, order, orderBy]);

  const paginatedRows = React.useMemo(() =>
    sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [sortedRows, page, rowsPerPage]
  );

  return (
    <Box className="contFullBox">
      <Box className="overviewContainer">
        <div className="overTop">
          <div className="LeftCont">
            <strong className="overviewTitle">Analystic Workbench</strong>
          </div>
          <div className="RightCont">
            <button className="iconTopButton">
              <Image src={IC_Save} alt="Save Icon" height={20} width={20} />
            </button>
            <button className="iconTopButton">
              <Image src={IC_Link} alt="Link Icon" height={20} width={20} />
            </button>
          </div>
        </div>
        <div class="AnalyticBox">
          <div className="topBox">
            <div class="tBLeft">
              <button className={`tab-button ${activeTab === 'workbench' ? 'active' : ''}`} onClick={() => handleTabClick('workbench')}>Workbench</button>
              <button className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => handleTabClick('saved')}>Saved</button>
            </div>
            <div class="tBRight">
              <button className="run-button">Run</button>
            </div>
          </div>

          <div className="contentArea">
            {activeTab === 'workbench' && (
              <div className="workbenchContent">
                <div className="leftPanel">
                  <div className="filterTitle">
                    <strong>Create New Filter</strong>
                  </div>
                  <div className="PanelBox">
                    <div className="filterCategory">
                      <div className="filterBox">
                        <div className="filterinBox">
                          <strong className="inTitle">Find a Fields</strong>
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
                                  return <div className="placeholder">Start typing to search</div>; // Placeholder 텍스트
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
                          <strong className="inTitle">Segment View</strong>
                          <div className="rowCont row2">
                            {checkboxData.map((item) => (
                              <div className="checkitem">
                                <input id={item.id} type="checkbox" />
                                <label htmlFor={item.id} className="checkIcon"></label>
                                <label className="text">{item.label}</label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="filterinBox">
                          <strong className="inTitle">Session View - DIMENSIONS</strong>
                          <div className="colCont">
                            {dimensionsData.map((section) => (
                              <div className="dimensionsection" key={section.title}>
                                <div
                                  className="sectionheader"
                                  onClick={() => toggleSection(section.title)}
                                >
                                  {section.title}
                                  {openSections[section.title] ? <Image src={IC_ArrowGUp} alt="Save Icon" height={20} width={20} /> : <Image src={IC_ArrowGDown} alt="Save Icon" height={20} width={20} /> }
                                </div>
                                <div
                                  ref={(el) => (contentRefs[section.title] = el)}
                                  className={`sectioncontent ${openSections[section.title] ? 'open' : ''}`}
                                  style={{
                                    height: openSections[section.title]
                                      ? 'auto'
                                      : '0px',
                                    padding: openSections[section.title]
                                      ? '16px 28px'
                                      : '0px',
                                  }}
                                >
                                  {section.items.map((item) => (
                                    <div className="checkitem">
                                      <input id={item} type="checkbox" />
                                      <label htmlFor={item} className="checkIcon"></label>
                                      <label className="text">{item}</label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="filterinBox">
                          <strong className="inTitle">Session View - MEASURES</strong>
                          <div className="rowCont row2">
                            {checkboxData2.map((item) => (
                              <div className="checkitem">
                                <input id={item.id} type="checkbox" />
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

                <div className="rightpanel">
                  <div className="inboxCont">
                    <strong className="inBTitle">
                      <span>Data</span>
                      <ToggleSwitch labelLeft={<Image src={IC_DropIcon1} alt="Save Icon" height={20} width={20} />} labelRight={<Image src={IC_Chart1} alt="Save Icon" height={20} width={20} />}/>
                    </strong>
                    <div className="inBTCont">
                      <Paper
                        elevation={0} // box-shadow 제거
                        sx={{
                          width: '100%',
                          borderRadius: 0, // 전체 radius 제거
                          overflow: 'hidden',
                        }}
                      >
                        <TableContainer>
                          <Table>
                            <TableHead sx={{ backgroundColor: '#2d2d2d' }}>
                              <TableRow>
                                {headCells.map((headCell, index) => (
                                  <TableCell
                                    key={headCell.id}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                    sx={{
                                      color: 'white',
                                      fontWeight: 'bold',
                                      borderBottom: 'none',
                                      backgroundColor: '#2d2d2d',
                                      // 첫 번째 TableCell에 왼쪽 상단 border-radius 적용
                                      ...(index === 0 && {
                                        borderTopLeftRadius: 12,
                                        borderBottomLeftRadius: 12,
                                      }),
                                      // 마지막 TableCell에 오른쪽 상단 border-radius 적용
                                      ...(index === headCells.length - 1 && {
                                        borderTopRightRadius: 12,
                                        borderBottomRightRadius: 12,
                                      }),
                                      '&:hover': {
                                        color: 'white',
                                        cursor: 'pointer',
                                      },
                                    }}
                                  >
                                    <TableSortLabel
                                      active={orderBy === headCell.id}
                                      direction={orderBy === headCell.id ? order : 'asc'}
                                      onClick={() => handleRequestSort(headCell.id)}
                                      sx={{
                                        color: 'white',
                                        '&.Mui-active': { // 활성화 상태일 때 스타일
                                          color: 'white',
                                        },
                                        '&:hover': { // TableSortLabel 호버 시 (선택 사항)
                                          color: 'white',
                                        },
                                        '&.Mui-focusVisible': { // 포커스 상태일 때 (선택 사항)
                                          color: 'white',
                                        },
                                        '&.Mui-active .MuiTableSortLabel-icon': {
                                          color: 'white'
                                        }
                                      }}
                                      IconComponent={() => ( // 아이콘 커스터마이징
                                        orderBy === headCell.id ? (
                                          order === 'asc' ?
                                            <Image style={{display:'inline-block'}} src={IC_SortAsc} alt="Add Icon" height={16} width={16} /> :
                                            <Image style={{display:'inline-block'}} src={IC_SortDesc} alt="Add Icon" height={16} width={16} />
                                        ) : (
                                          <Image style={{display:'inline-block'}} src={IC_SortDe} alt="Add Icon" height={16} width={16} />
                                        )
                                      )}
                                    >
                                      {headCell.label}
                                    </TableSortLabel>
                                  </TableCell>
                                ))}
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              {paginatedRows.map((row, index) => (
                                <TableRow
                                  hover
                                  tabIndex={-1}
                                  key={index}
                                >
                                  {[
                                    row.program,
                                    row.channel,
                                    row.genre,
                                    row.plays,
                                    row.totalMinutes,
                                    row.uniqueSubscribers,
                                    row.minsPerSubscriber,
                                    `${row.minsPerSubscriberPercent.toFixed(2)}%`
                                  ].map((cell, idx) => (
                                    <TableCell
                                      key={idx}
                                      sx={{
                                        borderLeft: 'none', // 좌측 라인 제거
                                        borderRight: 'none', // 우측 라인 제거
                                        borderBottom: '1px solid #eee', // 아래 라인만 살림
                                        ...(idx === 7 && { //
                                          textAlign: 'right',
                                        }),
                                        ...(idx === 0 && { //
                                          width: '30%',
                                        }),
                                      }}
                                    >
                                      {cell}
                                      {idx === 7 && (row.trend === 'up' ? (
                                        <Image style={{display:'inline-block', marginLeft:"3px"}} src={IC_ArrowCTrUp} alt="Add Icon" height={16} width={16} />
                                      ) : (
                                        <Image style={{display:'inline-block', marginLeft:"3px"}} src={IC_ArrowCTrDown} alt="Add Icon" height={16} width={16} />
                                      ))}
                                    </TableCell>
                                  ))}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                        <CustomTablePagination
                          count={rows.length}
                          page={page}
                          rowsPerPage={rowsPerPage}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          rowsPerPageOptions={[5, 10, 25]}
                        />
                      </Paper>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="savedcontent">
                {savedItemsData.map((item, index) => (
                  <div className="saveItem" key={index}>
                    <div className="SITitle">
                      <strong className="TitleName">{item.title}</strong>
                      <div className="TitleIcon">
                        <button><Image src={IC_Edit} alt="Edit Icon" height={24} width={24} /></button>
                        <button><Image src={IC_Link} alt="Link Icon" height={20} width={20} /></button>
                        <button><Image src={IC_Trash} alt="Trash Icon" height={24} width={24} /></button>
                      </div>
                    </div>
                    <div className="STCont">
                      <div className="stcBox">
                        <div className="stcTitle">Modified by</div>
                        <div className="stcText">{item.modifiedBy}</div>
                      </div>
                      <div className="stcBox">
                        <div className="stcTitle">Modified</div>
                        <div className="stcText">{item.modifiedDate}</div>
                      </div>
                      <div className="stcBox">
                        <div className="stcTitle">Description</div>
                        <div className="stcText">{item.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Box>
    </Box>
  )
}