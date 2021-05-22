import React, { useEffect } from 'react';
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
      title="修改节点信息"
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
        <Form name="node-update-form" layout="horizontal" labelCol={{ span: 5 }} form={form} initialValues={values}>
          <FormItem
            name="name"
            label="节点名称"
            rules={[{ required: true, message: "请输入节点名称" }]}
          >
            <Input placeholder="节点名称" />
          </FormItem>
          <FormItem
            name="endDate"
            label="预计结束时间"
            rules={[{ required: true, message: "请输入预计结束时间" }]}
          >
            <Input></Input>
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateForm;