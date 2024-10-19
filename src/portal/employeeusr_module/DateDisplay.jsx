import { format, isToday, isYesterday } from 'date-fns';
import React, { useEffect, useState } from 'react'

const DateDisplay = ({date}) => {
    const [formattedDate,setFormattedDate]=useState();
    const formatDate = () => {
        if (isToday(date)) {
          return `Today, ${format(date, 'hh:mm a')}`;
        } else if (isYesterday(date)) {
          return `Yesterday, ${format(date, 'hh:mm a')}`;
        } else {
          return format(date, 'MMMM dd, yyyy hh:mm a');
        }
      };

      useEffect(()=>{      
        setFormattedDate(formatDate());
      },[]);
  return (
    <div>
        {formattedDate}
    </div>
  )
}

export default DateDisplay;
