import { AddBox } from '@mui/icons-material';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Card, CardHeader } from 'reactstrap';

const MyComponent = () => (
  <Popup trigger={<AddBox onClick="#">Open Popup</AddBox>} position="right center">
    <div>Popup content here!
        <Card>
            <CardHeader>Welcome to Popup model</CardHeader>
        </Card>
    </div>
  </Popup>
);

export default MyComponent;
