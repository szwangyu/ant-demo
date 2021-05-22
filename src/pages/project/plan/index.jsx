import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import { confirmHandle } from '../../../utils/apiUtils';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { query, remove } from './service';
import { history } from 'umi';

const TableList = () => {

  const actionRef = useRef();
  const intl = useIntl();
  const [formValues, setFormValues] = useState();
  const [auditModalVisible, setAuditModalVisible] = useState(false);

  const columns = [
    {
      title: "申请编号",
      dataIndex: 'applyCode',
    },
    {
      title: "项目编号",
      dataIndex: 'code',
    },
    {
      title: "项目名称",
      dataIndex: 'name',
    },
    {
      title: "甲方",
      dataIndex: 'partyA',
    },
    {
      title: "项目开始时间",
      dataIndex: 'startDate',
    },
    {
      title: "项目结束时间",
      dataIndex: 'endDate',
    },
    {
      title: "状态",
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: "进行中",
          status: 'Default',
        },
        1: {
          text: "已完结",
          status: 'Success',
        },
        2: {
          text: "已延期",
          status: 'Error',
        },
      },
    },
    {
      title: "操作",
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <>
          <a
            key="config"
            onClick={() => {
              history.push('./plan/create');
            }}
          >
            修改
        </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              confirmHandle(remove, record.key, {
                title: '删除项目计划',
                content: '确认删除该计划？',
                onOk: () => {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                },
              });
            }}>
            删除
          </a>
          {record.status != "1" ?
            <>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  history.push('./plan/node');
                }}
              >
                项目节点管理
              </a>
            </> : null}
          <Divider type="vertical" />
          <a
            onClick={() => {
              history.push('./plan/reimburse_audit_history');
            }}
          >
            报销管理
              </a>
        </>
      ],
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
              history.push('./plan/create');
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
