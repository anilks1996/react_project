import React from 'react'
import Step1InitiativeVoucher from './Step1InitiativeVoucher';
import { Card, CardHeader } from 'reactstrap';
import Step2VoucherTransaction from './Step2VoucherTransaction';
import Step3PaymentInstument from './Step3PaymentInstument';
import Step4Workflow from './Step4Workflow';
import { Divider } from '@mui/material';

const Step5ViewSubmit = () => {
  return (
    <div>
      <Card style={{fontSize:'0.8rem'}}>
        <CardHeader>Workflow</CardHeader>
          <Step1InitiativeVoucher />
          <Divider />
          <Step2VoucherTransaction />
          <Divider />
          <Step3PaymentInstument />
          <Divider />
          <Step4Workflow />
      </Card>
    </div>
  )
}

export default Step5ViewSubmit;