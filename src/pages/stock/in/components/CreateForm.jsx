import React, { } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const CreateForm = (props) => {
  const { visible, onSubmit, onCancel } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      width={800}
      destroyOnClose
      maskStyle
      maskClosable={false}
      title="入库"
      visible={visible}
      onOk={async () => {
        const values = await form.validateFields();
        try {
          onSubmit(values);
          form.resetFields();
        } catch (e) {

        }
      }}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
    >
      <div>
        <Form name="stock-in-form" layout="horizontal" labelCol={{ span: 5 }} form={form}>
          <FormItem
            name="code"
            label="编号"
            rules={[{ required: true, message: "请选择配件编号" }]}
          >
            <Select>
              <Option key="1">0001</Option>
              <Option key="2">0002</Option>
              <Option key="3">0003</Option>
              <Option key="4">0004</Option>
              <Option key="5">0005</Option>
            </Select>
          </FormItem>
          <FormItem
            name="name"
            label="配件名称"
            rules={[{ required: true, message: "请输入配件名称" }]}
          >
            <Input placeholder="配件名称" />
          </FormItem>
          <FormItem
            name="unit"
            label="单位"
            rules={[{ required: true, message: "请输入单位" }]}
          >
            <Input placeholder="单位" />
          </FormItem>
          <FormItem
            name="amount"
            label="数量"
            rules={[{ required: true, message: "请输入数量" }]}
          >
            <Input placeholder="数量" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateForm;
