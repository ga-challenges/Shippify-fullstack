import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DriverVechilePage from '../pages/DriverVehiclePage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<DriverVechilePage />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
