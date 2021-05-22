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
      title="编辑第三方团队信息"
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
        <Form name="team-update-form" layout="horizontal" labelCol={{ span: 5 }} form={form} initialValues={values}>
        <FormItem
            name="name"
            label="第三方团队名称"
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
            name="telphone"
            label="负责人电话"
            rules={[{ required: true, message: "请输入负责人电话" }]}
          >
            <Input placeholder="负责人电话" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateForm;