import React, { useEffect, useState } from 'react'

const ShowTotalDebit = ({data}) => {
    const [totalDebit,setTotalDebit]=useState();
    const getTotalDebit=()=>{
        const dtSum=data.filter(item => item.type === 'Dr' && item.amount > 0) // Filtering based on conditions
        .reduce((accumulator, item) => accumulator + item.amount, 0); // Summing the filtered results           
        //setTotalDebit(dtSum);

        return dtSum;
    }

    useEffect(()=>{      
    setTotalDebit(getTotalDebit());
    },[]);

  return (
    <div>
        {totalDebit}
    </div>
  )
}

export default ShowTotalDebit;
