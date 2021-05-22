import React from 'react';
import { Modal, Form, Input } from 'antd';
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
      title="编辑供应商信息"
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
        <Form name="supplier-update-form" layout="horizontal" labelCol={{ span: 5 }} form={form} initialValues={values}>
          <FormItem
            name="name"
            label="供应商名称"
            rules={[{ required: true, message: "请输入供应商名称" }]}
          >
            <Input placeholder="供应商名称" />
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
          <FormItem
            name="desc"
            label="基本介绍"
            rules={[{ required: true, message: "请输入基本介绍" }]}
          >
            <Input placeholder="负责人电话" />
          </FormItem>
          <FormItem
            name="mainProduct"
            label="主营产品"
            rules={[{ required: true, message: "请输入主营产品" }]}
          >
            <Input placeholder="主营产品" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateForm;