import React from 'react'
import { Route } from 'react-router-dom';
import EmployeeRegister from './establishment_module/establishment_transaction/EmployeeRegister';
import App from '../App';
import ProtectedRoute from '../util/ProtectedRoute';

const RountingPage = () => {
  return (
    <React.Fragment>
    <Route path="/establishmentTransactions/employeeRegister" exact element={<App />}>
        <Route path='' element={<ProtectedRoute>
                                <EmployeeRegister />
                            </ProtectedRoute> 
        } />
    </Route>
    </React.Fragment>
  )
}

export default RountingPage;