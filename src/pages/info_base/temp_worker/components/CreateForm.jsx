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
      title="新建临时工"
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
        <Form name="temp-worker-add-form" layout="horizontal" labelCol={{ span: 5 }} form={form}>
          <FormItem
            name="name"
            label="临时工名称"
            rules={[{ required: true, message: "请输入临时工名称" }]}
          >
            <Input placeholder="临时工名称" />
          </FormItem>
          <FormItem
            name="telphone"
            label="电话"
            rules={[{ required: true, message: "请输入电话" }]}
          >
            <Input placeholder="电话" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateForm;
