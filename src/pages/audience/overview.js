import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from "recharts";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  MenuItem,
  Select,
  Paper,
  Grid
} from "@mui/material";
import { Download, FilterList } from "@mui/icons-material";

const COLORS = ["#f97316", "#60a5fa", "#34d399", "#c084fc"];

const dummyLineData = [
  { date: "08.28", UD: 50, Duration: 120, Access: 30 },
  { date: "08.29", UD: 180, Duration: 230, Access: 100 },
  { date: "08.30", UD: 500, Duration: 460, Access: 160 },
  { date: "08.31", UD: 400, Duration: 540, Access: 200 },
  { date: "09.01", UD: 700, Duration: 590, Access: 300 },
  { date: "09.02", UD: 600, Duration: 580, Access: 400 },
  { date: "09.03", UD: 550, Duration: 620, Access: 350 }
];

const dummyPieData = [
  { name: "webOS 3.0", value: 300 },
  { name: "webOS 22", value: 200 }
];

const dummyDeviceData = [
  { name: "LG TV", value: 100 },
  { name: "Unknown", value: 900 }
];

export default function OverviewPage() {
  return (
    <Box sx={{ display: "flex", bgcolor: "#f5f5f2"}}>

      <Box sx={{ flex: 1, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight="bold" color="#000">Overview Page</Typography>
          <Box display="flex" gap={2}>
            <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              + Create a new segment
            </Typography>
            <Select size="small" defaultValue="Time Period">
              <MenuItem value="Time Period">Time Period</MenuItem>
            </Select>
            <IconButton>
              <Download />
            </IconButton>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={3}>
          <FilterList fontSize="small" sx={{ color: '#333333' }} />
          <Typography variant="body2" sx={{ color:'#333333' }}>United States</Typography>
          <Typography variant="body2" sx={{ color:'#333333' }}> +1 other</Typography>
          <Typography variant="body2" sx={{ ml: 1, color:'#333333' }}>Text</Typography>
          <Typography variant="body2">Text</Typography>
        </Box>

        <Grid container spacing={2} mb={3}>
          {["7.54K", "119.94K", "70.00K", "7.00K", "5.94K", "157", "100", "10"].map((value, i) => (
            <Grid size={{xs:1.5}} key={i}>
              <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body2" color="textSecondary">UD (Unique Device)</Typography>
                <Typography variant="h6" fontWeight="bold">{value}</Typography>
                <Typography variant="body2" color={i % 3 === 0 ? "primary" : "error"}>{i % 3 === 0 ? "▲" : "▼"} {Math.abs((i + 1) * 1.23).toFixed(2)}%</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid size={{xs:6, ms:6}}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle2" fontWeight="medium">Over Time</Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dummyLineData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36}/>
                  <Line type="monotone" dataKey="UD" stroke="#f97316" name="UD" />
                  <Line type="monotone" dataKey="Duration" stroke="#60a5fa" name="Duration" />
                  <Line type="monotone" dataKey="Access" stroke="#34d399" name="Access" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid size={{xs:6, ms:6}}>
            <Paper sx={{ p: 2 }}>
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
            </Paper>
          </Grid>

          <Grid size={{xs:6, ms:6}}>
            <Paper sx={{ p: 2 }}>
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
            </Paper>
          </Grid>

          <Grid size={{xs:6, ms:6}}>
            <Paper sx={{ p: 2 }}>
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
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
