import React from 'react'
import { useState } from 'react';
import './Cards.css';


function Cards() {
  const [cards] = useState([
  {
  title: 'Card-1',
  image: <img src="./images/Accounts Admin.jpeg" width="100%" height="120px" text-align="center" object-fit="cover" cover />,
  button: 'Accounts Admin'
  },
  {
    title: 'Card-1',
    image: <img src="./images/AccountsApprover.jpeg" width="100%" height="120px" text-align="center" />,
    button: 'Accounts Approver'
    },
    {
      title: 'Card-1',
      image: <img src="./images/AccountsRole.jpeg" width="100%" height="120px" text-align="center" />,
      button: 'Accounts Role'
      },
      {
        title: 'Card-1',
        image: <img src="./images/AccountsUser.jpeg" width="100%" height="120px" text-align="center" />,
        button: 'Accounts User'
        },
        {
          title: 'Card-1',
          image: <img src="./images/Employeeuser.jpeg" width="100%" height="120px" text-align="center" />,
          button: 'Employee User'
          },
          {
            title: 'Card-1',
            image: <img src="./images/establishment.jpeg" width="100%" height="120px" text-align="center" />,
            button: 'Establishment Admin'
            },
            {
              title: 'Card-1',
              image: <img src="./images/leave.jpeg" width="100%" height="120px" text-align="center" />,
              button: 'Leave Admin'
              },
              {
                title: 'Card-1',
                image: <img src="./images/payrole.jpeg" width="100%" height="120px" text-align="center" />,
                button: 'Payrole Admin'
                },
                {
                  title: 'Card-1',
                  image: <img src="./images/performance.jpeg" width="100%" height="120px" text-align="center" />,
                  button: 'Performance Assesment'
                  },
  ])
  return (
<div>
<section>
<div className="container-fluid">
  <div className="cards">
   
    {
  cards.map((card, i) => (
      <div key={i} className="card">
      <h3>{card.image}</h3>
      <button className="btn">{card.button}</button>
    </div>
    ))}
  </div>
</div>
</section>
</div>
  );
}

export default Cards;

