import React, { } from 'react';
import { Modal, Form, Input } from 'antd';
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
      title="新建客户"
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
        <Form name="customer-add-form" layout="horizontal" labelCol={{ span: 5 }} form={form}>
          <FormItem
            name="name"
            label="客户名称"
            rules={[{ required: true, message: "请输入客户名称" }]}
          >
            <Input placeholder="客户名称" />
          </FormItem>
          <FormItem
            name="pic"
            label="负责人"
            rules={[{ required: true, message: "请输入负责人" }]}
          >
            <Input placeholder="负责人" />
          </FormItem>
          <FormItem
            name="picTelphone"
            label="负责人电话"
            rules={[{ required: true, message: "请输入负责人电话" }]}
          >
            <Input placeholder="负责人电话" />
          </FormItem>
          <FormItem
            name="address"
            label="地址"
            rules={[{ required: true, message: "请输入地址" }]}
          >
            <Input placeholder="地址" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateForm;
