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
      title="编辑项目团队"
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
            name="applyCode"
            label="申请编号"
            rules={[{ required: true, message: "请输入申请编号" }]}
          >
            <Input disabled defaultValue="AP-0001" placeholder="申请编号" />
          </FormItem>
          <FormItem
            name="planCode"
            label="项目计划编号"
            rules={[{ required: true, message: "请输入项目计划编号" }]}
          >
            <Input disabled defaultValue="PL-0001" placeholder="项目计划编号" />
          </FormItem>
          <FormItem
            name="name"
            label="项目团队名称"
            rules={[{ required: true, message: "请输入项目团队名称" }]}
          >
            <Input placeholder="项目团队名称" />
          </FormItem>
          <FormItem
            name="code"
            label="项目团队编号"
            rules={[{ required: true, message: "请输入项目团队编号" }]}
          >
            <Input placeholder="项目团队编号" />
          </FormItem>
          <FormItem
            name="pic"
            label="负责人"
            rules={[{ required: true, message: "请输入负责人" }]}
          >
            <Input placeholder="负责人" />
          </FormItem>
          <FormItem
            name="participants"
            label="参与人"
            rules={[{ required: true, message: "请输入参与人" }]}
          >
            <Input placeholder="参与人" />
          </FormItem>
          <FormItem
            name="task"
            label="任务目标"
            rules={[{ required: true, message: "请输入任务目标" }]}
          >
            <Input placeholder="任务目标" />
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateForm;