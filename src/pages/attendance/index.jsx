import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { query, update, add, remove } from './service';

const TableList = () => {

  const actionRef = useRef();
  const intl = useIntl();

  const columns = [
    {
      title: "部门",
      dataIndex: 'dept',
    },
    {
      title: "员工",
      dataIndex: 'name',
    },
    {
      title: "打卡日期",
      dataIndex: 'attendanceDate',
    },
    {
      title: "打卡时间",
      dataIndex: 'attendanceTime',
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.excel" defaultMessage="New" />
          </Button>,
        ]}
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
