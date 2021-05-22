import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
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
      title="编辑员工信息"
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
            label="员工姓名"
            rules={[{ required: true, message: "请输入员工姓名" }]}
          >
            <Input placeholder="请输入员工姓名" />
          </FormItem>
          <FormItem
            name="sex"
            label="性别"
            rules={[{ required: true, message: "请选择性别" }]}
          >
            <Select placeholder="请选择性别">
              <Option key="未知">未知</Option>
              <Option key="男">男</Option>
              <Option key="女">女</Option>
            </Select>
          </FormItem>
          <FormItem
            name="age"
            label="年龄"
            rules={[{ required: true, message: "请输入年龄" }]}
          >
            <Input placeholder="请输入员工年龄" />
          </FormItem>
          <FormItem
            name="address"
            label="地址"
            rules={[{ required: true, message: "请输入地址" }]}
          >
            <Input placeholder="请输入地址" />
          </FormItem>
          <FormItem
            name="native"
            label="籍贯"
            rules={[{ required: true, message: "请输入籍贯" }]}
          >
            <Input placeholder="请输入籍贯" />
          </FormItem>
          <FormItem
            name="telphone"
            label="电话"
            rules={[{ required: true, message: "请输入电话" }]}
          >
            <Input placeholder="请输入电话" />
          </FormItem>
          <FormItem
            name="depart"
            label="部门"
            rules={[{ required: true, message: "请选择部门" }]}
          >
            <Select placeholder="请选择部门">
              <Option key="1">部门1</Option>
              <Option key="2">部门2</Option>
              <Option key="3">部门3</Option>
            </Select>
          </FormItem>
          <FormItem
            name="entryTime"
            label="入职时间"
            rules={[{ required: true, message: "请输入入职时间" }]}
            >
              <Input placeholder="请输入入职时间" />
          </FormItem>
          <FormItem
            name="position"
            label="职位"
            rules={[{ required: true, message: "请输入职位" }]}
          >
            <Input placeholder="请输入员工职位" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateForm;