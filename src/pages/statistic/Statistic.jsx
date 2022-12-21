import { Menu, Row, Col } from 'antd';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reloadData } from 'slices/statistic/statisticAll';

const Statistic = (props) => {
  const { t } = useTranslation('statistic');
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(reloadData());
  }, []);
  return (
    <div className='statistic container'>
      <h6 className='ma-0 mb-4'>Thống kê</h6>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Menu
            mode='horizontal'
            selectedKeys={location.pathname}
            items={[
              {
                key: '/statistic/campaigns',
                label: (
                  <Link to='/statistic/campaigns'>
                    {t('test_campaign', { ns: 'statistic' })}
                  </Link>
                ),
              },
              {
                key: '/statistic/tests',
                label: (
                  <Link to='/statistic/tests'>
                    {t('test', { ns: 'statistic' })}
                  </Link>
                ),
              },
              {
                key: '/statistic/answer-sheets',
                label: (
                  <Link to='/statistic/answer-sheets'>
                    {t('candidates', { ns: 'statistic' })}
                  </Link>
                ),
              },
            ]}
          ></Menu>
        </Col>
        <Col span={24}>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};

export default Statistic;
