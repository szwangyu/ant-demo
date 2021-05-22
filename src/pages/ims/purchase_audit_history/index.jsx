import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import { confirmHandle } from '../../../utils/apiUtils';
import React, { useState, useRef } from 'react';
import { history } from 'umi'
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { query, update, add, remove } from './service';

const TableList = () => {

  const actionRef = useRef();
  const intl = useIntl();

  const columns = [
    {
      title: "申请编号",
      dataIndex: 'purchaseCode',
    },
    {
      title: "审核人",
      dataIndex: 'auditor',
    },
    {
      title: "审核时间",
      dataIndex: 'auditTime',
    },
    {
      title: "审核结果",
      dataIndex: 'result',
    },
    {
      title: "审核备注",
      dataIndex: 'remark',
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
            type="default"
            key="default"
            onClick={() => {
              history.push('./purchase');
            }}
          >
            <FormattedMessage id="pages.searchTable.back" defaultMessage="New" />
          </Button>,
        ]}
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
