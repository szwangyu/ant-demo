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
      title="新建第三方项目"
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
        <Form name="third-project-add-form" layout="horizontal" labelCol={{ span: 5 }} form={form}>
          <FormItem
            name="code"
            label="编号"
            rules={[{ required: true, message: "请输入编号" }]}
          >
            <Input placeholder="编号" />
          </FormItem>
          <FormItem
            name="name"
            label="名称"
            rules={[{ required: true, message: "请输入名称" }]}
          >
            <Input placeholder="名称" />
          </FormItem>
          <FormItem
            name="year"
            label="年份"
            rules={[{ required: true, message: "请输入年份" }]}
          >
            <Input placeholder="年份" />
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
          <FormItem
            name="info"
            label="介绍信息"
            rules={[{ required: true, message: "请输入介绍信息" }]}
          >
            <Input placeholder="介绍信息" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateForm;
