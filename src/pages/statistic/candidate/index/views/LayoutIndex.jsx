import React from 'react';
import { Button, Col, Form, Input, Popover, Radio, Row, Tag } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListIndex from './ListIndex';
const LayoutIndex = () => {
  const { t } = useTranslation('statistic');
  return (
    <>
      <Row>
        <Col span={24}>
          <ListIndex />
        </Col>
      </Row>
    </>
  );
};

export default LayoutIndex;
