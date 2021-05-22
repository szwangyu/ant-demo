import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider } from 'antd';
import { confirmHandle } from '../../../../../utils/apiUtils';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { query, remove } from './service';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import SettingForm from './components/SettingForm';

const TableList = () => {

  const actionRef = useRef();
  const intl = useIntl();
  const [formValues, setFormValues] = useState();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [settingModalVisible, setSettingModalVisible] = useState(false);

  const columns = [
    {
      title: "计划编号",
      dataIndex: 'planCode',
    },
    {
      title: "节点名称",
      dataIndex: 'name',
    },
    {
      title: "计划完成日期",
      dataIndex: 'endDate',
    },
    {
      title: "实际完成日期",
      dataIndex: 'finishDate',
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
              setFormValues(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
        </a>
          <Divider type="vertical" />
          <a
            onClick={async () => {
              confirmHandle(remove, record.key, {
                title: '删除项目节点',
                content: '确认删除该节点？',
                onOk: () => {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                },
              });
            }}>
            删除
          </a>
          <>
            <Divider type="vertical" />
            <a
              onClick={() => {
                setFormValues(record);
                setSettingModalVisible(true);
              }}
            >
              设置节点
            </a>
          </>
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
        <SettingForm
          onSubmit={async (values) => {
            const success = await update(values);
            if (success) {
              setSettingModalVisible(false);
              setFormValues(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            setSettingModalVisible(false);
            setFormValues(undefined);
          }}
          visible={settingModalVisible}
          values={formValues}
        />
      ) : null}
    </PageContainer>
  );
};

export default TableList;
