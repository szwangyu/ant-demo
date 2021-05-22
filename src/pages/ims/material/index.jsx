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
      title: "物料名称",
      dataIndex: 'name',
    },
    {
      title: "规格",
      dataIndex: 'special',
    },
    {
      title: "作用",
      dataIndex: 'effect',
    },
    {
      title: "参考价",
      dataIndex: 'referencePrice',
    },
    {
      title: "单位",
      dataIndex: 'unit',
    },
    {
      title: "备注",
      dataIndex: 'remark',
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
                title: '删除物料',
                content: '确认删除该物料？',
                onOk: () => {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                },
              });
            }}>
            删除
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
    </PageContainer>
  );
};

export default TableList;
