import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import { history } from 'umi';
import { confirmHandle } from '../../../utils/apiUtils';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import CreateForm from './components/CreateForm';
import AuditApplyForm from './components/AuditApplyForm';
import { query, update, add, remove } from './service';

const TableList = () => {

  const actionRef = useRef();
  const [formValues, setFormValues] = useState();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [auditModalVisible, setAuditModalVisible] = useState(false);
  const intl = useIntl();

  const columns = [
    {
      title: "申请部门",
      dataIndex: 'applicationDept',
    },
    {
      title: "申请人",
      dataIndex: 'applicant',
    },
    {
      title: "申请编号",
      dataIndex: 'code',
    },
    {
      title: "申请时间",
      dataIndex: 'applicationTime',
    },
    {
      title: "总价格",
      dataIndex: 'price',
    },
    {
      title: "状态",
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: "待审批",
          status: 'Default',
        },
        1: {
          text: "已通过",
          status: 'Success',
        },
        2: {
          text: "未通过",
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
              setUpdateModalVisible(true);
              setFormValues(record);
            }}
          >
            修改
        </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              confirmHandle(remove, record.key, {
                title: '删除采购申请',
                content: '确认删除该采购申请？',
                onOk: () => {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                },
              });
            }}>
            删除
      </a>
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
          <Divider type="vertical" />
          <a
            onClick={() => {
              history.push('./purchase_audit_history');
            }}
          >
            审核历史
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
              setCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={(params, sorter, filter) => query({ ...params, sorter, filter })}
        columns={columns}
      />
      <CreateForm
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        onSubmit={async (values) => {
          const success = await add(values);
          if (success) {
            setCreateModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      />
      {formValues && Object.keys(formValues).length > 0 ? (
        <UpdateForm
          onSubmit={async (values) => {
            const success = await update(values);
            if (success) {
              setUpdateModalVisible(false);
              setFormValues(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            setUpdateModalVisible(false);
            setFormValues(undefined);
          }}
          visible={updateModalVisible}
          values={formValues}
        />
      ) : null}
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
