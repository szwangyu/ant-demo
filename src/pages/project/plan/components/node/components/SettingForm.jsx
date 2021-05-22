import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import moment from 'moment';

const SettingForm = (props) => {
  const { visible, onSubmit, onCancel, values } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      width={800}
      destroyOnClose
      maskStyle
      maskClosable={false}
      title="设置节点状态"
      visible={visible}
      onOk={async () => {
        form
          .validateFields()
          .then((fieldValues) => {
            onSubmit({
              ...fieldValues,
              key: values.key,
            });
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
    >
      <div>
        <Form name="node-setting-form" layout="horizontal" labelCol={{ span: 5 }} form={form} initialValues={values}>
          <FormItem
            name="name"
            label="节点名称"
            rules={[{ required: true, message: "请输入节点名称" }]}
          >
            <Input disabled placeholder="节点名称" />
          </FormItem>
          <FormItem
            name="endDate"
            label="预计结束时间"
            rules={[{ required: true, message: "请输入预计结束时间" }]}
          >
            <Input disabled></Input>
          </FormItem>
          <FormItem
            name="newStatus"
            label="状态"
            rules={[{ required: true, message: "请选择节点状态" }]}
          >
            <Select>
              <Option key="1">已完成</Option>
              <Option key="2">已延期</Option>
            </Select>
          </FormItem>
          <FormItem
            name="newEndDate"
            label="延期结束时间"
            rules={[{ required: true, message: "请输入延期结束时间" }]}
          >
            <DatePicker></DatePicker>
          </FormItem>
          <FormItem
            name="remark"
            label="备注"
            rules={[{ required: true, message: "请输入备注" }]}
          >
            <Input placeholder="备注"></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default SettingForm;