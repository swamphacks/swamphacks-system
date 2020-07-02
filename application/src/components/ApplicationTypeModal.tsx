import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, Typography, Select } from 'antd';
import ApplicationTypes from '../lib/types/ApplicationTypes';

const applicationTypeValues = Object.values(ApplicationTypes);

const { Option } = Select;

interface ModalProps {
  open: boolean;
  onCancel: () => void;
}

const ApplicationTypeModal: React.FC<ModalProps> = ({ open, onCancel }) => {
  const history = useHistory();
  const [applicationType, setApplicationType] = useState<ApplicationTypes>();

  const onOk = () => {
    if (applicationType) {
      history.push(`/application/${applicationType}`);
    }
  };

  return (
    <Modal
      title='Select Application Type'
      visible={open}
      onOk={onOk}
      onCancel={onCancel}
      okText='Continue'
      okButtonProps={{ disabled: applicationType === undefined }}
    >
      <Typography.Paragraph>
        Please select an application type to continue with the application
        process.
      </Typography.Paragraph>
      <Select
        style={{ width: '100%' }}
        onChange={(val: ApplicationTypes) => setApplicationType(val)}
        placeholder='Select application type'
      >
        {Object.keys(ApplicationTypes).map((key, index) => (
          <Option key={index} value={applicationTypeValues[index]}>
            {key}
          </Option>
        ))}
      </Select>
    </Modal>
  );
};

export default ApplicationTypeModal;
