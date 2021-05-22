import React, { useEffect } from 'react';
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
      title="编辑合同模版"
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
        <Form name="contract-template-update-form" layout="horizontal" labelCol={{ span: 5 }} form={form} initialValues={values}>
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

export default UpdateForm;