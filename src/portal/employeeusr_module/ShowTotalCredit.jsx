import React, { useEffect, useState } from 'react'

const ShowTotalCredit = ({data}) => {
    const [totalCredit,setTotalCredit]=useState();
    const getTotalCredit=()=>{
        const crSum=data.filter(item => item.type === 'Cr' && item.amount > 0) // Filtering based on conditions
        .reduce((accumulator, item) => accumulator + item.amount, 0); // Summing the filtered results           
        //setTotalDebit(dtSum);

        return crSum;
    }

    useEffect(()=>{      
    setTotalCredit(getTotalCredit());
    },[]);

  return (
    <div>
        {totalCredit}
    </div>
  )
}

export default ShowTotalCredit;
