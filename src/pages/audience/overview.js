import React, { useRef, useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Dot, Surface, Rectangle } from "recharts";
import { Modal, Button, InputBase, Box, Typography, IconButton, Divider, MenuItem, Select, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, styled } from "@mui/material";
import { scaleLinear } from 'd3-scale';
import { format } from 'date-fns';
import Image from 'next/image';

import ModalCont from '@/pages/audience/modal/modal';

import CustomTablePagination from '@/common/paging'; // CustomTablePagination import

import IC_Save from "@/assets/images/icons/basic/ic_action_sm_bk_save_n.png";
import IC_Link from "@/assets/images/icons/basic/ic_action_sm_bk_link_n.png";
import IC_Add from "@/assets/images/icons/basic/ic_action_sm_wt_add_n.png";
import IC_ArrowDown from "@/assets/images/icons/basic/ic_basic_sm_bk_caret_down_n.png";
import IC_ArrowUp from "@/assets/images/icons/basic/ic_basic_sm_bk_caret_up_n.png";

import IC_ArrowTrDown from "@/assets/images/icons/trend/ic_trend_down.png";
import IC_ArrowTrUp from "@/assets/images/icons/trend/ic_trend_up.png";

import IC_ArrowCTrDown from "@/assets/images/icons/trend/ic_circle_trend_down.png";
import IC_ArrowCTrUp from "@/assets/images/icons/trend/ic_circle_trend_up.png";

import IC_SortDe from "@/assets/images/icons/trend/ic_sort_default.png";
import IC_SortAsc from "@/assets/images/icons/trend/ic_sort_ascending.png";
import IC_SortDesc from "@/assets/images/icons/trend/ic_sort_descending.png";

import IC_Filter from "@/assets/images/icons/basic/ic_action_sm_bk_filter_n.png";
import IC_Download from "@/assets/images/icons/basic/ic_action_sm_wt_download_n.png";

import IC_MaxAction from "@/assets/images/icons/action/btn_action_md_bk_maximize_n.png";

const COLORS = ["#7D9D9C", "#F3A683", "#A4A07B", "#E9D8A6"];

const dummyLineData = [
  { date: '08.28', UD: 160, Duration: 480, Access: 400 },
  { date: '08.29', UD: 500, Duration: 600, Access: 480 },
  { date: '08.30', UD: 320, Duration: 640, Access: 360 },
  { date: '09.01', UD: 580, Duration: 900, Access: 600 },
  { date: '09.02', UD: 360, Duration: 800, Access: 380 },
  { date: '09.03', UD: 560, Duration: 960, Access: 520 },
  { date: '09.04', UD: 640, Duration: 940, Access: 680 },
];

const dummyLineData2 = [
  { date: '08.28', tvch: 160, tvvod: 480, homech: 400, homevod: 480 },
  { date: '08.29', tvch: 500, tvvod: 600, homech: 480, homevod: 600 },
  { date: '08.30', tvch: 320, tvvod: 640, homech: 360, homevod: 640 },
  { date: '09.01', tvch: 580, tvvod: 900, homech: 600, homevod: 900 },
  { date: '09.02', tvch: 360, tvvod: 800, homech: 380, homevod: 800 },
  { date: '09.03', tvch: 560, tvvod: 960, homech: 520, homevod: 960 },
  { date: '09.04', tvch: 640, tvvod: 940, homech: 680, homevod: 940 },
];

const dummyPieData = [
  { name: "webOS 3.0", value: 210 },
  { name: "webOS 3.5", value: 85 },
  { name: "webOS 4.0", value: 50 },
  { name: "webOS 22", value: 15 }
];

const dummyDeviceData = [
  { name: "LG TV", value: 180 },
  { name: "WEE1.0", value: 90 },
  { name: "Smart Monitor", value: 45 },
  { name: "Unknown", value: 45 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div
        style={{
          backgroundColor: '#222',
          padding: '8px',
          borderRadius: '4px',
          color: '#fff',
          fontSize: '12px',
          textAlign: 'left',
        }}
      >
        <p className="label" style={{ marginBottom: '4px' }}>
          Sep {label.substring(3)} Mon
        </p>
        {payload.map((item, index) => (
          <p key={`item-${index}`} style={{ color: item.color }}>
            {item.name} {item.value.toFixed(2)}K
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const metricData = [
  { title: 'L/D(Unique Device)', value: '352.54K', change: '24.00%', isPositive: true },
  { title: 'Total Duration', value: '119.94M', change: '24.00%', isPositive: true },
  { title: 'Duration Per L/D', value: '70.00K', change: '-3.78%', isPositive: false },
  { title: 'Access', value: '7.00K', change: '-3.78%', isPositive: false },
  { title: 'Play', value: '5.94M', change: '-3.78%', isPositive: false },
  { title: 'New Subscriber', value: '157', change: '24.00%', isPositive: true },
  { title: 'Re-Agree', value: '100', change: '24.00%', isPositive: true },
  { title: 'Number of<br/>withdrawals', value: '10', change: '-3.78%', isPositive: false },
];

const MetricCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="metricCard">
      <h6 className="metricTitle" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="metricValue">{value}</p>
      <p className={isPositive ? 'metricChangePositive' : 'metricChangeNegative'}>
        {change}
        <span style={{ fontWeight: 'bold' }}>
          {isPositive ? <Image style={{display:'inline-block'}} src={IC_ArrowTrUp} alt="Add Icon" height={16} width={16} /> :
          <Image style={{display:'inline-block'}} src={IC_ArrowTrDown} alt="Add Icon" height={16} width={16} />}
        </span>
      </p>
    </div>
  );
};

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

//week 라이브러리를 쓰기위한 데이터
const HeatmapGrid = styled(Paper)(({ value, colorScale }) => ({
  width: 'calc(100% / 24)', // 24시간
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.7rem',
  color: '#333',
  backgroundColor: colorScale(value),
  border: '1px solid #f0f0f0',
  borderRadius:'0px',
  boxShadow:'none',
}));

const DayLabel = styled(Typography)(({ theme }) => ({
  width: '60px',
  textAlign: 'right',
  fontSize: '0.8rem',
  color: '#666',
  paddingRight: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  height: '40px',
}));

const ColorScaleContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}));

const ColorScaleGradient = styled(Box)(({ colorScale }) => ({
  width: '200px',
  height: '10px',
  background: `linear-gradient(to right, ${colorScale(0)}, ${colorScale(15000)})`,
  borderRadius: '0px',
  marginRight: '8px',
}));

const ColorScaleLabel = styled(Typography)({
  fontSize: '0.7rem',
  color: '#666',
});

const dummyHeatmapData = [
  { day: 'Mon', hourlyData: Array.from({ length: 24 }, () => Math.floor(Math.random() * 10000)) },
  { day: 'Tue', hourlyData: Array.from({ length: 24 }, () => Math.floor(Math.random() * 12000)) },
  { day: 'Wed', hourlyData: Array.from({ length: 24 }, () => Math.floor(Math.random() * 15000)) },
  { day: 'Thu', hourlyData: Array.from({ length: 24 }, () => Math.floor(Math.random() * 13000)) },
  { day: 'Fri', hourlyData: Array.from({ length: 24 }, () => Math.floor(Math.random() * 11000)) },
  { day: 'Sat', hourlyData: Array.from({ length: 24 }, () => Math.floor(Math.random() * 9000)) },
  { day: 'Sun', hourlyData: Array.from({ length: 24 }, () => Math.floor(Math.random() * 7000)) },
];

const timeLabels = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 === 0 ? 12 : i % 12;
  const ampm = i < 12 ? 'AM' : 'PM';
  return `${hour}${ampm}`;
});
timeLabels[0] = '12AM';
timeLabels[12] = '12PM';

const Heatmap = () => {
  const maxVal = Math.max(...dummyHeatmapData.flatMap(dayData => dayData.hourlyData));
  const colorScale = scaleLinear()
    .domain([0, maxVal])
    .range(['#e0f2f7', '#26a69a']); // Light to Teal

  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Grid container sx={{flexDirection:"column" }}>
        {dummyHeatmapData.map((dayData) => (
          <Grid span={6} key={dayData.day} sx={{ display: 'flex', alignItems: 'center'}}>
            <DayLabel>{dayData.day}</DayLabel>
            {dayData.hourlyData.map((value, index) => (
              <HeatmapGrid key={index} value={value} colorScale={colorScale}>
                {/* You can display the value here if needed: {value} */}
              </HeatmapGrid>
            ))}
          </Grid>
        ))}
      </Grid>

      <ColorScaleContainer sx={{ mt: 2 }}>
        <ColorScaleLabel>0</ColorScaleLabel>
        <ColorScaleGradient colorScale={colorScale} />
        <ColorScaleLabel>{format(maxVal, '0,0')}</ColorScaleLabel>
      </ColorScaleContainer>
    </Box>
  );
};

//바 차트를 위한 데이터값
const data = [
  { name: 'Good Day', minsPerSubscriber: 380000, plays: 300000 },
  { name: 'White Lotus', minsPerSubscriber: 380000, plays: 305000 },
  { name: 'When Life Gives You Tangerines', minsPerSubscriber: 510000, plays: 215000 },
  { name: 'I\'m Solo', minsPerSubscriber: 460000, plays: 350000 },
  { name: 'I Live Alone', minsPerSubscriber: 250000, plays: 215000 },
];

const RoundedBar = (props) => {
  const { x, y, width, height, fill, radius } = props;
  const rx = radius;
  const ry = radius;

  return (
    <path
      d={`M ${x},${y + ry}
          C ${x},${y} ${x + rx},${y} ${x + rx},${y}
          L ${x + width - rx},${y}
          C ${x + width},${y} ${x + width},${y + ry} ${x + width},${y + ry}
          L ${x + width},${y + height}
          L ${x},${y + height}
          L ${x},${y + ry}
          Z`}
      fill={fill}
    />
  );
};

export default function OverviewPage() {
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('program');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState('Program');

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const barRadius = 7; // 바 차트 상단 둥글게

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

  const legendRef = useRef(null);
  const [legendBBox, setLegendBBox] = useState(null);

  useEffect(() => {
    if (legendRef.current) {
      const rect = legendRef.current.getBoundingClientRect();
      setLegendBBox(legendRef.current.getBoundingClientRect());
    }
  }, [legendRef]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const options = [
    { value: 'last7Days', label: 'Last 7 Days' },
    { value: 'last30Days', label: 'Last 30 Days' },
    { value: 'currentMonth', label: 'Current Month' },
    { value: 'lastMonth', label: 'Last Month' },
    { value: 'customRange', label: 'Custom Range' },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'white',
      borderRadius: '6px',
      border: '1px solid transparent',
      boxShadow: 'none',
      minHeight: '32px',
      height: '32px',
      padding: '0 12px',
      fontSize: '14px', // 폰트 크기 변경
      margin: '0 0 0 8px',
      color: 'black',
      '&:hover': {
        borderColor: 'transparent',
      },
      '&:focus': {
        borderColor: 'transparent',
        boxShadow: 'none',
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      color: 'black',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '0',
      fontSize: '14px', // 폰트 크기 변경
    }),
    indicatorSeparator: () => null,
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: 'black',
      padding: '0 8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      '> svg': {
        width: '18px', // 아이콘 크기 약간 조정 (선택 사항)
        height: '18px', // 아이콘 크기 약간 조정 (선택 사항)
      },
      transform: state.isFocused ? 'rotate(180deg)' : null,
      transition: 'transform 0.2s ease-in-out',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'black',
      fontSize: '16px', // 폰트 크기 변경
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'white',
      borderRadius: '6px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 2,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#f2f2f2' : state.isFocused ? '#e6e6e6' : null,
      color: 'black',
      padding: '8px 12px',
      fontSize: '14px', // 폰트 크기 변경
      display: 'flex',
      alignItems: 'center',
      minHeight: '32px',
      '&:active': {
        backgroundColor: '#d9d9d9',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
      fontSize: '14px', // 폰트 크기 변경
    }),
  };

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
    <Box sx={{ display: "flex", bgcolor: "#f5f5f2", flexDirection:"column"}}>
      <Box className="overviewContainer">
        <div className="overTop">
          <div className="LeftCont">
            <strong className="overviewTitle">Overview Page</strong>
          </div>
          <div className="RightCont">
            <button className="createSegmentButton" onClick={handleOpen}>
              <Image src={IC_Add} alt="Add Icon" height={20} width={20} /> <span>Create a new segment</span>
            </button>
            <Modal open={open} onClose={handleClose} className="CustomModalBox">
              <div className="CustomModal">
                <ModalCont handleClose={handleClose}/>
              </div>
            </Modal>
            <ReactSelect
              options={options}
              styles={customStyles}
              placeholder="Time Period"
              components={{
                DropdownIndicator: () => (
                  isMenuOpen ? <Image src={IC_ArrowUp} alt="Add Icon" height={20} width={20} /> : <Image src={IC_ArrowDown} alt="Add Icon" height={20} width={20} />
                ),
              }}
              onMenuOpen={() => setIsMenuOpen(true)}
              onMenuClose={() => setIsMenuOpen(false)}
            />
            <button className="iconTopButton">
              <Image src={IC_Save} alt="Save Icon" height={20} width={20} />
            </button>
            <button className="iconTopButton">
              <Image src={IC_Link} alt="Link Icon" height={20} width={20} />
            </button>
          </div>
        </div>

        <div className="filterBar">
          <button className="filterButton">
            <Image style={{display:'inline-block'}} src={IC_Filter} alt="Add Icon" height={20} width={20} />
          </button>
          <span className="filterLine"></span>
          <button className="textButton">United States <span className="gray">+1 other</span></button>
          <button className="textButton">Text</button>
          <button className="textButton">Text</button>
          <button className="textButton">Text</button>
          <div className="spacer" />
          <button className="downloadButton">
            <Image src={IC_Download} alt="Add Icon" height={20} width={20} /> Download as Date
          </button>
        </div>

        <div className="metricGrid">
          {metricData.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </Box>

      <Box className="overChartCont">
        <Grid container spacing={2}>
          <Grid size={{xs:12, sm:6}} className="gridBox">
            <div className="GridTitle">
              <div className="GTLeft">
                <strong>Over Time</strong>
              </div>
              <div className="GTRight">
                <Image src={IC_MaxAction} alt="Add Icon" height={24} width={24} />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dummyLineData} margin={{ top: 20, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid stroke="#e6e6e6" strokeDasharray="0 0" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  style={{ fontSize: 12, color: '#666' }}
                  padding={{ left: 40 }}
                />
                <YAxis
                  axisLine={{stroke:"#e6e6e6"}}
                  tickLine={false}
                  tickMargin={8}
                  style={{ fontSize: 12, color: '#666' }}
                  domain={[0, 1000]} // Y축 범위 설정
                  ticks={[0, 200, 400, 600, 800, 1000]} // Y축 눈금 설정
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#808080', strokeWidth: 1 }} />
                <Legend
                  ref={legendRef}
                  iconSize={0}
                  layout="horizontal"
                  align="left"
                  verticalAlign="top"
                  wrapperStyle={{ top: 0, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: '#666' }}
                  formatter={(value, entry, index) => (
                    <span style={{color: entry.color, border:"1px solid #f2f2f2", padding:"5px 11px", borderRadius:"14px"}}>● <span style={{color:"#1a1a1a"}}>{value}</span></span>
                  )}
                />
                {legendBBox && (
                  <Surface>
                    <Rectangle
                      x={legendBBox.left - legendBBox.width / 2 - 5} // 위치 조정 필요
                      y={legendBBox.top - 5} // 위치 조정 필요
                      width={legendBBox.width + 10}
                      height={legendBBox.height + 10}
                      stroke="#333"
                      fill="none"
                      strokeWidth={1}
                      rx={4}
                      ry={4}
                    />
                  </Surface>
                )}
                <Line
                  type="linear"
                  dataKey="UD"
                  stroke="#779ECB" // 파란색 계열
                  strokeWidth={2}
                  name="UD"
                  dot={<Dot r={4} fill="#779ECB" stroke="#fff" strokeWidth={1} />}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="linear"
                  dataKey="Duration"
                  stroke="#AEC6CF" // 회색 계열
                  strokeWidth={2}
                  name="Duration"
                  dot={<Dot r={4} fill="#AEC6CF" stroke="#fff" strokeWidth={1} />}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="linear"
                  dataKey="Access"
                  stroke="#FFDAB9" // 밝은 주황색 계열
                  strokeWidth={2}
                  name="Access"
                  dot={<Dot r={4} fill="#FFDAB9" stroke="#fff" strokeWidth={1} />}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>

          <Grid size={{xs:12, sm:6}} className="gridBox">
            <div className="GridTitle">
              <div className="GTLeft">
                <strong>Stream Type</strong>
              </div>
              <div className="GTRight">
                <Image src={IC_MaxAction} alt="Add Icon" height={24} width={24} />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dummyLineData2} margin={{ top: 20, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid stroke="#e6e6e6" strokeDasharray="0" />
                <XAxis
                  dataKey="date"
                  axisLine={{ stroke: 'transparent' }}
                  tickLine={false}
                  tickMargin={8}
                  style={{ fontSize: 12, color: '#666' }}
                  padding={{ left: 40 }}
                />
                <YAxis
                  axisLine={{ stroke: '#FFFFFF' }}
                  tickLine={false}
                  tickMargin={8}
                  style={{ fontSize: 12, color: '#666' }}
                  domain={[0, 1000]} // Y축 범위 설정
                  ticks={[0, 200, 400, 600, 800, 1000]} // Y축 눈금 설정
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#808080', strokeWidth: 1 }} />
                <Legend
                  ref={legendRef}
                  iconSize={0}
                  layout="horizontal"
                  align="left"
                  verticalAlign="top"
                  wrapperStyle={{ top: 0, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: '#666' }}
                  formatter={(value, entry, index) => (
                    <span style={{color: entry.color, border:"1px solid #f2f2f2", padding:"5px 11px", borderRadius:"14px"}}>● <span style={{color:"#1a1a1a"}}>{value}</span></span>
                  )}
                />
                {legendBBox && (
                  <Surface>
                    <Rectangle
                      x={legendBBox.left - legendBBox.width / 2 - 5} // 위치 조정 필요
                      y={legendBBox.top - 5} // 위치 조정 필요
                      width={legendBBox.width + 10}
                      height={legendBBox.height + 10}
                      stroke="#333"
                      fill="none"
                      strokeWidth={1}
                      rx={4}
                      ry={4}
                    />
                  </Surface>
                )}
                <Line
                  type="linear"
                  dataKey="tvch"
                  stroke="#7D9D9C"
                  strokeWidth={2}
                  name="Live TV_Ch"
                  dot={<Dot r={4} fill="#7D9D9C" stroke="#fff" strokeWidth={1} />}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="linear"
                  dataKey="tvvod"
                  stroke="#F3A683"
                  strokeWidth={2}
                  name="Live TV_VOD"
                  dot={<Dot r={4} fill="#F3A683" stroke="#fff" strokeWidth={1} />}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="linear"
                  dataKey="homech"
                  stroke="#A4A07B"
                  strokeWidth={2}
                  name="HomeApp_Ch"
                  dot={<Dot r={4} fill="#A4A07B" stroke="#fff" strokeWidth={1} />}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="linear"
                  dataKey="homevod"
                  stroke="#E9D8A6"
                  strokeWidth={2}
                  name="HomeApp_VOD"
                  dot={<Dot r={4} fill="#E9D8A6" stroke="#fff" strokeWidth={1} />}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>

          <Grid size={{xs:12, sm:6}} className="gridBox">
            <div className="GridTitle">
              <div className="GTLeft">
                <strong>Group By WebOS Platform</strong>
              </div>
              <div className="GTRight">
                <Image src={IC_MaxAction} alt="Add Icon" height={24} width={24} />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dummyPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={85} // 도넛 차트 중심 구멍
                  outerRadius={100}
                  startAngle={90}
                  endAngle={-270}
                >
                  {dummyPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend
                  ref={legendRef}
                  iconSize={0}
                  layout="horizontal"
                  align="left"
                  verticalAlign="top"
                  wrapperStyle={{ top: 0, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: '#666' }}
                  formatter={(value, entry, index) => (
                    <span style={{color: entry.color, border:"1px solid #f2f2f2", padding:"5px 11px", borderRadius:"14px"}}>● <span style={{color:"#1a1a1a"}}>{value}</span></span>
                  )}
                />
                <Tooltip
                  formatter={(value, name) => [`${value}`, `${name}`]}
                  contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                />
                {legendBBox && (
                    <Surface>
                      <Rectangle
                        x={legendBBox.left - legendBBox.width / 2 - 5} // 위치 조정 필요
                        y={legendBBox.top - 5} // 위치 조정 필요
                        width={legendBBox.width + 10}
                        height={legendBBox.height + 10}
                        stroke="#333"
                        fill="none"
                        strokeWidth={1}
                        rx={4}
                        ry={4}
                      />
                    </Surface>
                )}
              </PieChart>
            </ResponsiveContainer>
          </Grid>

          <Grid size={{xs:12, sm:6}} className="gridBox">
            <div className="GridTitle">
              <div className="GTLeft">
                <strong>Group By Device</strong>
              </div>
              <div className="GTRight">
                <Image src={IC_MaxAction} alt="Add Icon" height={24} width={24} />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
              <Pie
                  data={dummyDeviceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={85} // 도넛 차트 중심 구멍
                  outerRadius={100}
                  startAngle={90}
                  endAngle={-270}
                >
                  {dummyDeviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value}`, `${name}`]}
                  contentStyle={{ fontSize: '12px', borderRadius: '8px' }}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                />
                <Legend
                  ref={legendRef}
                  iconSize={0}
                  layout="horizontal"
                  align="left"
                  verticalAlign="top"
                  wrapperStyle={{ top: 0, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: '#666' }}
                  formatter={(value, entry, index) => (
                    <span style={{color: entry.color, border:"1px solid #f2f2f2", padding:"5px 11px", borderRadius:"14px"}}>● <span style={{color:"#1a1a1a"}}>{value}</span></span>
                  )}
                />
                {legendBBox && (
                  <Surface>
                    <Rectangle
                      x={legendBBox.left - legendBBox.width / 2 - 5} // 위치 조정 필요
                      y={legendBBox.top - 5} // 위치 조정 필요
                      width={legendBBox.width + 10}
                      height={legendBBox.height + 10}
                      stroke="#333"
                      fill="none"
                      strokeWidth={1}
                      rx={4}
                      ry={4}
                    />
                  </Surface>
                )}
              </PieChart>
            </ResponsiveContainer>
          </Grid>

          <Grid size={{xs:12, sm:6}} className="gridBox">
            <div className="GridTitle">
              <div className="GTLeft">
                <strong>Top Content By Engagement and Plays</strong>
              </div>
              <div className="GTRight">
                <Image src={IC_MaxAction} alt="Add Icon" height={24} width={24} />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={data}
                margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: '#555' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(value) => value.toLocaleString()}
                  tick={{ fontSize: 12, fill: '#555' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  ref={legendRef}
                  iconSize={0}
                  layout="horizontal"
                  align="left"
                  verticalAlign="top"
                  wrapperStyle={{ top: 0, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: '#666' }}
                  formatter={(value, entry, index) => (
                    <span style={{ color: entry.color }}>● {value}</span>
                  )}
                />
                {legendBBox && (
                  <Surface>
                    <Rectangle
                      x={legendBBox.left - legendBBox.width / 2 - 5} // 위치 조정 필요
                      y={legendBBox.top - 5} // 위치 조정 필요
                      width={legendBBox.width + 10}
                      height={legendBBox.height + 10}
                      stroke="#333"
                      fill="none"
                      strokeWidth={1}
                      rx={4}
                      ry={4}
                    />
                  </Surface>
                )}
                <Bar
                  dataKey="minsPerSubscriber"
                  fill="#82ca9d"
                  barSize={14}
                  shape={<RoundedBar radius={barRadius} />}
                />
                <Bar
                  dataKey="plays"
                  fill="#d2b48c"
                  barSize={14}
                  shape={<RoundedBar radius={barRadius} />}
                />
              </BarChart>
            </ResponsiveContainer>
          </Grid>

          <Grid size={{xs:12, sm:6}} className="gridBox">
            <div className="GridTitle">
              <div className="GTLeft">
                <strong>Content Platform</strong>
              </div>
              <div className="GTRight">
                <Image src={IC_MaxAction} alt="Add Icon" height={24} width={24} />
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fill: '#555' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(value) => value.toLocaleString()}
                  tick={{ fontSize: 12, fill: '#555' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  ref={legendRef}
                  iconSize={0}
                  layout="horizontal"
                  align="left"
                  verticalAlign="top"
                  wrapperStyle={{ top: 0, left: 0, right: 0, textAlign: 'center', fontSize: 12, color: '#666' }}
                  formatter={(value, entry, index) => (
                    <span style={{ color: entry.color }}>● {value}</span>
                  )}
                />
                {legendBBox && (
                  <Surface>
                    <Rectangle
                      x={legendBBox.left - legendBBox.width / 2 - 5} // 위치 조정 필요
                      y={legendBBox.top - 5} // 위치 조정 필요
                      width={legendBBox.width + 10}
                      height={legendBBox.height + 10}
                      stroke="#333"
                      fill="none"
                      strokeWidth={1}
                      rx={4}
                      ry={4}
                    />
                  </Surface>
                )}
                <Bar
                  dataKey="minsPerSubscriber"
                  fill="#82ca9d"
                  barSize={14}
                  shape={<RoundedBar radius={barRadius} />}
                />
                <Bar
                  dataKey="plays"
                  fill="#d2b48c"
                  barSize={14}
                  shape={<RoundedBar radius={barRadius} />}
                />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          
          <Grid size={{xs:12, sm:12}} className="gridBox">
            <div className="GridTitle">
              <div className="GTLeft">
                <strong>Play by Day Part and Day of The Week</strong>
              </div>
              <div className="GTRight">
                <Image src={IC_MaxAction} alt="Add Icon" height={24} width={24} />
              </div>
            </div>
            <Heatmap />
          </Grid>

          <Grid size={{xs:12, sm:12}} className="gridBox">
            <div className="GridTitle">
              <div className="GTLeft">
                <strong>Top Content</strong>
              </div>
              <div className="GTRight">
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  size="small"
                  sx={{ width: 200 }}
                >
                  <MenuItem value="Program">Program</MenuItem>
                  <MenuItem value="Channel">Channel</MenuItem>
                </Select>
              </div>
            </div>

            {/* 테이블 전체를 하나의 Paper로 감쌈 */}
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}




