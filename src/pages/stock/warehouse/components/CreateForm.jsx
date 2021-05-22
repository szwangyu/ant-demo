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
      title="新建仓库"
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
        <Form name="warehouse-add-form" layout="horizontal" labelCol={{ span: 5 }} form={form}>
          <FormItem
            name="name"
            label="仓库名称"
            rules={[{ required: true, message: "请输入仓库名称" }]}
          >
            <Input placeholder="仓库名称" />
          </FormItem>
          <FormItem
            name="code"
            label="编号"
            rules={[{ required: true, message: "请输入编号" }]}
          >
            <Input placeholder="编号" />
          </FormItem>
          <FormItem
            name="area"
            label="面积"
            rules={[{ required: true, message: "请输入面积" }]}
          >
            <Input placeholder="面积" />
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
