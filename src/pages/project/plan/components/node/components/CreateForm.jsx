import React, { } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
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
      title="新建节点"
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
        <Form name="node-add-form" layout="horizontal" labelCol={{ span: 5 }} form={form}>
          <FormItem
            name="name"
            label="节点名称"
            rules={[{ required: true, message: "请输入节点名称" }]}
          >
            <Input placeholder="节点名称" />
          </FormItem>
          <FormItem
            name="预计结束时间"
            label="预计结束时间"
            rules={[{ required: true, message: "请输入预计结束时间" }]}
          >
            <DatePicker></DatePicker>
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateForm;
