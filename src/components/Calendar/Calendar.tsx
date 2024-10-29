import React from 'react';
import dayjs from 'dayjs';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CalendarProps {
  events: { [date: string]: string[] };
  currentMonth: dayjs.Dayjs;
  onNextMonth: () => void;
  onPreviousMonth: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, currentMonth, onNextMonth, onPreviousMonth }) => {
  const startOfMonth = currentMonth.startOf('month');
  const daysInMonth = currentMonth.daysInMonth();
  const startDay = startOfMonth.day();

  const getSubscriptionsForDay = (day: number) => {
    const dateString = currentMonth.date(day).format('YYYY-MM-DD');
    return events[dateString] || [];
  };

  return (
    <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mt: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Button onClick={onPreviousMonth}><ArrowBackIosIcon /></Button>
        <Typography variant="h6">{currentMonth.format('MMMM YYYY')}</Typography>
        <Button onClick={onNextMonth}><ArrowForwardIosIcon /></Button>
      </Box>

      <Grid container spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <Grid item xs={1.71} key={index}>
            <Typography variant="body2" fontWeight="bold">{day}</Typography>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={1}>
        {[...Array(startDay)].map((_, index) => (
          <Grid item xs={1.71} key={`empty-${index}`}></Grid>
        ))}

        {[...Array(daysInMonth)].map((_, dayIndex) => {
          const day = dayIndex + 1;
          const dailySubscriptions = getSubscriptionsForDay(day);

          return (
            <Grid item xs={1.71} key={day}>
              <Paper 
                elevation={1} 
                sx={{ 
                  padding: '8px', 
                  minHeight: '80px', 
                  backgroundColor: dailySubscriptions.length > 0 ? '#E3F2FD' : 'transparent'
                }}
              >
                <Typography variant="body2">{day}</Typography>
                {dailySubscriptions.map((title, idx) => (
                  <Typography variant="caption" key={idx} display="block">
                    {title}
                  </Typography>
                ))}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Calendar;
