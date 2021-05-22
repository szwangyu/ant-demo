import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Image } from 'antd';
import { confirmHandle } from '../../../../../utils/apiUtils';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { query, remove } from './service';
import { history } from 'umi'; 
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';

const TableList = () => {

  const actionRef = useRef();
  const intl = useIntl();
  const [formValues, setFormValues] = useState();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const columns = [
    {
      title: "项目编号",
      dataIndex: 'planCode',
    },
    {
      title: "项目名称",
      dataIndex: 'planName',
    },
    {
      title: "报销事项",
      dataIndex: 'name',
    },
    {
      title: "报销编号",
      dataIndex: 'code',
    },
    {
      title: "发生时间",
      dataIndex: 'eventDate',
    },
    {
      title: "报销部门",
      dataIndex: 'applicationDept',
    },
    {
      title: "报销人",
      dataIndex: 'applicant',
    },
    {
      title: "金额",
      dataIndex: 'amount',
    },
    {
      title: "报销时间",
      dataIndex: 'applicationDate',
    },
    {
      title: "发票",
      dataIndex: 'invoicePath',
      render: (_, record) => [
        <>
          <Image
            width={30}
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp5.itc.cn%2Fimages01%2F20201111%2Fea97ca63cb2f45a1bdfd3e20e486cdcf.jpeg&refer=http%3A%2F%2Fp5.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1624103289&t=a04cd54e899226c9363e5e2556398909"
          />
        </>
      ],
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
          text: "通过",
          status: 'Success',
        },
        2: {
          text: "拒绝",
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
                history.push('./reimburse_audit_history');
              }}
            >
              审核历史
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
    </PageContainer>
  );
};

export default TableList;
