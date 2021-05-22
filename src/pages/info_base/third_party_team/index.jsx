import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import { confirmHandle } from '../../../utils/apiUtils';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import CreateForm from './components/CreateForm';
import { query, update, add, remove } from './service';

const TableList = () => {

  const actionRef = useRef();
  const [formValues, setFormValues] = useState();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const intl = useIntl();

  const columns = [
    {
      title: "第三方团队名称",
      dataIndex: 'name',
    },
    {
      title: "负责人",
      dataIndex: 'pic',
    },
    {
      title: "负责人电话",
      dataIndex: 'telphone',
    },
    {
      title: "状态",
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: "已禁用",
          status: 'Error',
        },
        1: {
          text: "正常",
          status: 'Success',
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
                title: '删除供应商',
                content: '确认删除该供应商？',
                onOk: () => {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                },
              });
            }}>
            删除
      </a>
          <Divider type="vertical" />
          {record.status == "0" ?
            <a
              onClick={async () => {
                confirmHandle(remove, record.key, {
                  title: '启用供应商',
                  content: '确认启用该供应商？',
                  success:'已启用',
                  onOk: () => {
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  },
                });
              }}>
              启用</a>
            :
            <a
              onClick={async () => {
                confirmHandle(remove, record.key, {
                  title: '禁用供应商',
                  content: '确认禁用该供应商？',
                  success:'已禁用',
                  onOk: () => {
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  },
                });
              }}>
              禁用</a>
          }
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
    </PageContainer>
  );
};

export default TableList;
