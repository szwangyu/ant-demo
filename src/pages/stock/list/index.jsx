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
      title: "编号",
      dataIndex: 'code',
    },
    {
      title: "配件名称",
      dataIndex: 'name',
    },
    {
      title: "数量",
      dataIndex: 'amount',
      hideInSearch: true,
    },
    {
      title: "单位",
      dataIndex: 'unit',
      hideInSearch: true,
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
        ]}
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
