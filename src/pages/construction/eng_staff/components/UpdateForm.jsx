import React from 'react';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const UpdateForm = (props) => {
  const { visible, onSubmit, onCancel, values } = props;
  const [form] = Form.useForm();


  return (
    <Modal
      width={800}
      destroyOnClose
      maskStyle
      maskClosable={false}
      title="编辑工程人员信息"
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
        <Form name="user-update-form" layout="horizontal" labelCol={{ span: 5 }} form={form} initialValues={values}>
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

export default UpdateForm;