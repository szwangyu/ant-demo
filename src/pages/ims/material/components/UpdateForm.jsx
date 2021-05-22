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
        <Form name="material-update-form" layout="horizontal" labelCol={{ span: 5 }} form={form} initialValues={values}>
          <FormItem
            name="name"
            label="物料名称"
            rules={[{ required: true, message: "请输入物料名称" }]}
          >
            <Input placeholder="物料名称" />
          </FormItem>
          <FormItem
            name="special"
            label="规格"
            rules={[{ required: true, message: "请输入规格" }]}
          >
            <Input placeholder="规格" />
          </FormItem>
          <FormItem
            name="effect"
            label="作用"
            rules={[{ required: true, message: "请输入作用" }]}
          >
            <Input placeholder="作用" />
          </FormItem>
          <FormItem
            name="referencePrice"
            label="参考价"
            rules={[{ required: true, message: "请输入参考价" }]}
          >
            <Input placeholder="参考价" />
          </FormItem>
          <FormItem
            name="unit"
            label="单位"
            rules={[{ required: true, message: "请输入单位" }]}
          >
            <Input placeholder="单位" />
          </FormItem>
          <FormItem
            name="remark"
            label="备注"
            rules={[{ required: true, message: "请输入备注" }]}
          >
            <Input placeholder="备注" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateForm;