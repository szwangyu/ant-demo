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
      title="编辑工程人员类别"
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
        <Form name="eng-staff-type-update-form" layout="horizontal" labelCol={{ span: 5 }} form={form} initialValues={values}>
        <FormItem
            name="name"
            label="施工人员类别"
            rules={[{ required: true, message: "请输入施工人员类别" }]}
          >
            <Input placeholder="施工人员类别" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateForm;