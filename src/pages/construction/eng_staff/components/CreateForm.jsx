import React, { } from 'react';
import { Modal, Form, Input, DatePicker, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const { Option } = Select;

const CreateForm = (props) => {
  const { visible, onSubmit, onCancel } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      width={800}
      destroyOnClose
      maskStyle
      maskClosable={false}
      title="新建施工人员"
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
        <Form name="eng-staff-add-form" layout="horizontal" labelCol={{ span: 5 }} form={form}>
          <FormItem
            name="name"
            label="施工人员姓名"
            rules={[{ required: true, message: "请输入施工人员姓名" }]}
          >
            <Input placeholder="施工人员姓名" />
          </FormItem>
          <FormItem
            name="sex"
            label="性别"
            rules={[{ required: true, message: "请选择性别" }]}
          >
            <Select placeholder="性别">
              <Select.Option key="未知">未知</Select.Option>
              <Select.Option key="男">男</Select.Option>
              <Select.Option key="女">女</Select.Option>
            </Select>
          </FormItem>
          <FormItem
            name="age"
            label="年龄"
            rules={[{ required: true, message: "请输入年龄" }]}
          >
            <Input placeholder="年龄" />
          </FormItem>
          <FormItem
            name="telphone"
            label="电话"
            rules={[{ required: true, message: "请输入电话" }]}
          >
            <Input placeholder="电话" />
          </FormItem>
          <FormItem
            name="type"
            label="类别"
            rules={[{ required: true, message: "请选择类别" }]}
          >
            <Select placeholder="类别">
              <Select.Option key="1">水电工</Select.Option>
              <Select.Option key="2">装修工</Select.Option>
              <Select.Option key="3">焊接工</Select.Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateForm;
