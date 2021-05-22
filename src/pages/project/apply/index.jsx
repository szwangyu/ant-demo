import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import { confirmHandle } from '../../../utils/apiUtils';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { query, remove } from './service';
import { history } from 'umi';
import AuditApplyForm from './components/AuditApplyForm';

const TableList = () => {

  const actionRef = useRef();
  const intl = useIntl();
  const [formValues, setFormValues] = useState();
  const [auditModalVisible, setAuditModalVisible] = useState(false);

  const columns = [
    {
      title: "申请编号",
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
      title: "项目详细",
      dataIndex: 'detail',
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
      title: "工程成本预估",
      dataIndex: 'projectCostEsitmation',
    },
    {
      title: "商务费用预估",
      dataIndex: 'bussinessCostEsitmation',
    },
    {
      title: "项目成交价预估",
      dataIndex: 'transcationCostEsitmation',
    },
    {
      title: "状态",
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: "待审核",
          status: 'Default',
        },
        1: {
          text: "通过审核",
          status: 'Success',
        },
        2: {
          text: "未通过审核",
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
              history.push('./apply/update');
            }}
          >
            修改
        </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              confirmHandle(remove, record.key, {
                title: '删除项目申请',
                content: '确认删除该申请？',
                onOk: () => {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                },
              });
            }}>
            删除
          </a>
          {record.status == "1" ?
            <>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  history.push('./plan/create');
                }}
              >
                制定项目计划
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  history.push('./team');
                }}
              >
                项目团队管理
              </a>
            </> : null}
          {record.status != "0" ? null :
            <>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  setFormValues(record);
                  setAuditModalVisible(true);
                }}
              >
                审核
              </a>
            </>}
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
              history.push('./apply/create');
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}
        columns={columns}
      />
      {formValues && Object.keys(formValues).length > 0 ? (
        <AuditApplyForm
          onSubmit={async (values) => {
            //
          }}
          onCancel={() => {
            setAuditModalVisible(false);
            setFormValues(undefined);
          }}
          visible={auditModalVisible}
          values={formValues}
        />
      ) : null}
    </PageContainer>
  );
};

export default TableList;
