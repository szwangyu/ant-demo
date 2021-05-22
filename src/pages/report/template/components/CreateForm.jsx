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
      title="新建报告模版"
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
        <Form name="depart-add-form" layout="horizontal" labelCol={{ span: 5 }} form={form}>
          <FormItem
            name="code"
            label="编号"
            rules={[{ required: true, message: "请输入编号" }]}
          >
            <Input placeholder="部门编号" />
          </FormItem>
          <FormItem
            name="name"
            label="名称"
            rules={[{ required: true, message: "请输入名称" }]}
          >
            <Input placeholder="名称" />
          </FormItem>
          <FormItem
            name="desc"
            label="描述"
            rules={[{ required: true, message: "请输入描述" }]}
          >
            <Input placeholder="描述" />
          </FormItem>
          <FormItem
            name="path"
            label="上传模版文件"
            rules={[{ required: true, message: "请上传文件" }]}
          >
            <Input type="file" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateForm;
