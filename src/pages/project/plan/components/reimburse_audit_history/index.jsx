import { Button } from 'antd';
import React, { useRef } from 'react';
import { useIntl, FormattedMessage, history } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { query } from './service';

const TableList = () => {

  const actionRef = useRef();
  const intl = useIntl();

  const columns = [
    {
      title: "报销编号",
      dataIndex: 'code',
    },
    {
      title: "报销事项",
      dataIndex: 'name',
    },
    {
      title: "报销金额",
      dataIndex: 'amount',
    },
    {
      title: "审核人",
      dataIndex: 'auditor',
    },
    {
      title: "审核时间",
      dataIndex: 'auditDate',
    },
    {
      title: "审核结果",
      dataIndex: 'result',
    },
    {
      title: "备注",
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
        search={false}
        toolBarRender={() => [
          <Button
            type="defalut"
            key="primary"
            onClick={() => {
              history.push('./reimburse');
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
