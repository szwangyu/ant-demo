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
        <Form name="reimburse-update-form" layout="horizontal" labelCol={{ span: 5 }} form={form} initialValues={values}>
          <FormItem
            name="planCode"
            label="项目编号"
            rules={[{ required: true, message: "请输入项目编号" }]}
          >
            <Input disabled defaultValue="PL-0001" placeholder="项目编号" />
          </FormItem>
          <FormItem
            name="planName"
            label="项目名称"
            rules={[{ required: true, message: "请输入项目名称" }]}
          >
            <Input disabled defaultValue="项目1" placeholder="项目名称" />
          </FormItem>
          <FormItem
            name="applicationDept"
            label="报销部门"
            rules={[{ required: true, message: "请输入报销部门" }]}
          >
            <Input disabled defaultValue="部门1" placeholder="报销部门" />
          </FormItem>
          <FormItem
            name="applicant"
            label="报销人"
            rules={[{ required: true, message: "请输入报销人" }]}
          >
            <Input disabled defaultValue="员工1" placeholder="报销人" />
          </FormItem>
          <FormItem
            name="eventDate"
            label="发生时间"
            rules={[{ required: true, message: "请输入发生时间" }]}
          >
            <Input></Input>
          </FormItem>
          <FormItem
            name="amount"
            label="报销金额"
            rules={[{ required: true, message: "请输入报销金额" }]}
          >
            <Input placeholder="报销金额" />
          </FormItem>
          <FormItem
            name="name"
            label="报销事宜"
            rules={[{ required: true, message: "请输入报销事宜" }]}
          >
            <Input placeholder="报销事宜" />
          </FormItem>
          <FormItem
            name="invoicePath"
            label="发票"
            rules={[{ required: true, message: "请上传发票" }]}
          >
            <Input type="file" placeholder="请上传发票" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateForm;