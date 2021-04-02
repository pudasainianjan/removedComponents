import React, { useState, useContext } from 'react';
import { Alert } from 'antd';
import LoginContext from '../../../../contexts/LoginContext';

const SuccessMessage = () => {
  const user = useContext(LoginContext);
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div style={{'marginBottom': '20px'}}>
      {visible ? (
        <Alert message={`Welcome ${user.username} to dahsboard...Your Role: ${user.role}`} type="success" closable afterClose={handleClose} />
      ) : null}
    </div>
  );
};

export default SuccessMessage;