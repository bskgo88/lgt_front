import React, { useRef, useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Dot, Surface, Rectangle} from "recharts";
import {Button, InputBase, Box, Typography, IconButton, Divider, MenuItem, Select, Paper, Grid} from "@mui/material";

import Image from 'next/image';
import IC_Save from "@/assets/images/icons/basic/ic_action_sm_bk_save_n.png";
import IC_Link from "@/assets/images/icons/basic/ic_action_sm_bk_link_n.png";
import IC_Add from "@/assets/images/icons/basic/ic_action_sm_wt_add_n.png";
import IC_ArrowDown from "@/assets/images/icons/basic/ic_basic_sm_bk_caret_down_n.png";
import IC_ArrowUp from "@/assets/images/icons/basic/ic_basic_sm_bk_caret_up_n.png";

const COLORS = ["#f97316", "#60a5fa", "#34d399", "#c084fc"];

const dummyLineData = [
  { date: '08.28', UD: 160, Duration: 480, Access: 400 },
  { date: '08.29', UD: 500, Duration: 600, Access: 480 },
  { date: '08.30', UD: 320, Duration: 640, Access: 360 },
  { date: '09.01', UD: 580, Duration: 900, Access: 600 },
  { date: '09.02', UD: 360, Duration: 800, Access: 380 },
  { date: '09.03', UD: 560, Duration: 960, Access: 520 },
  { date: '09.04', UD: 640, Duration: 940, Access: 680 },
];

const dummyPieData = [
  { name: "webOS 3.0", value: 300 },
  { name: "webOS 22", value: 200 }
];

const dummyDeviceData = [
  { name: "LG TV", value: 100 },
  { name: "Unknown", value: 900 }
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
        <span style={{ fontWeight: 'bold' }}>{isPositive ? '↑' : '↓'}</span>
      </p>
    </div>
  );
};

export default function OverviewPage() {
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

  return (
    <Box sx={{ display: "flex", bgcolor: "#f5f5f2", flexDirection:"column"}}>
      <Box className="overviewContainer">
        <div className="overTop">
          <div className="LeftCont">
            <strong className="overviewTitle">Overview Page</strong>
          </div>
          <div className="RightCont">
            <button className="createSegmentButton">
              <Image src={IC_Add} alt="Add Icon" height={20} width={20} /> <span>Create a new segment</span>
            </button>
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
            <button className="iconButton">
              <Image src={IC_Save} alt="Save Icon" height={20} width={20} />
            </button>
            <button className="iconButton">
              <Image src={IC_Link} alt="Link Icon" height={20} width={20} />
            </button>
          </div>
        </div>

        <div className="filterBar">
          <button className="filterButton">
            <span style={{ fontWeight: 'bold' }}>Filter</span>
          </button>
          <button className="textButton">United States <span>+1 other</span></button>
          <button className="textButton">Text</button>
          <button className="textButton">Text</button>
          <button className="textButton">Text</button>
          <div className="spacer" />
          <button className="downloadButton">
            <span style={{ fontWeight: 'bold' }}>Download </span>as Date
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
            <Typography variant="subtitle2" fontWeight="medium">Over Time</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dummyLineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  style={{ fontSize: 12, color: '#666' }}
                />
                <YAxis
                  axisLine={false}
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
            <Typography variant="subtitle2" fontWeight="medium">Stream Type</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dummyLineData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36}/>
                <Line type="monotone" dataKey="UD" stroke="#f97316" name="Live TV_Ch" />
                <Line type="monotone" dataKey="Duration" stroke="#60a5fa" name="Live TV_VOD" />
                <Line type="monotone" dataKey="Access" stroke="#34d399" name="HomeApp_Ch" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>

          <Grid size={{xs:12, sm:6}} className="gridBox">
            <Typography variant="subtitle2" fontWeight="medium">Group By WebOS Platform</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={dummyPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                  {dummyPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </Grid>

          <Grid size={{xs:12, sm:6}} className="gridBox">
            <Typography variant="subtitle2" fontWeight="medium">Group By Device</Typography>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={dummyDeviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                  {dummyDeviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
