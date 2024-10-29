import React, { useEffect, useState, useCallback } from 'react';
import Calendar from './Calendar';
import { useSubscription } from '../../contexts/SubscriptionContext';
import dayjs, { Dayjs } from 'dayjs';

const CalendarContainer: React.FC = () => {
  const { subscriptions } = useSubscription();
  const [events, setEvents] = useState<{ [date: string]: string[] }>({});
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(dayjs());

  const calculateEventsForMonth = useCallback((month: Dayjs) => {
    const newEvents: { [date: string]: string[] } = {};

    subscriptions.forEach(subscription => {
      const { billingDate, title, frequency } = subscription;
      let eventDate = dayjs(billingDate);

      if (frequency === 'mensuel') {
        while (eventDate.isBefore(month.endOf('month').add(1, 'day'))) {
          if (eventDate.isSame(month, 'month')) {
            const dateString = eventDate.format('YYYY-MM-DD');
            if (!newEvents[dateString]) newEvents[dateString] = [];
            newEvents[dateString].push(title);
          }
          eventDate = eventDate.add(1, 'month');
        }
      }

      if (frequency === 'annuel') {
        while (eventDate.isBefore(month.endOf('year').add(1, 'day'))) {
          if (eventDate.isSame(month, 'month')) {
            const dateString = eventDate.format('YYYY-MM-DD');
            if (!newEvents[dateString]) newEvents[dateString] = [];
            newEvents[dateString].push(title);
          }
          eventDate = eventDate.add(1, 'year');
        }
      }
    });

    setEvents(newEvents);
  }, [subscriptions]);

  useEffect(() => {
    calculateEventsForMonth(currentMonth);
  }, [calculateEventsForMonth, currentMonth, subscriptions]);

  return (
    <Calendar
      events={events}
      currentMonth={currentMonth}
      onNextMonth={() => setCurrentMonth(prev => prev.add(1, 'month'))}
      onPreviousMonth={() => setCurrentMonth(prev => prev.subtract(1, 'month'))}
    />
  );
};

export default CalendarContainer;
