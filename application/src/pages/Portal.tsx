import React, { useState } from 'react';
import { RootContainer } from '../components';
import { Card, Button, Space } from 'antd';

import { ApplicationTypeModal } from '../components';

const Portal: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <RootContainer>
      <ApplicationTypeModal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
      />
      <Card style={{ width: 300 }} title='No Application'>
        <Space direction='vertical' size='middle'>
          <p>Whoops! Looks like you haven't submitted an application yet.</p>
          <Button type='primary' onClick={() => setModalOpen(true)}>
            Apply Now
          </Button>
        </Space>
      </Card>
    </RootContainer>
  );
};

export default Portal;
