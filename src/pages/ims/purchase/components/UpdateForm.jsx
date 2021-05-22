import React from 'react';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Space, Select, Descriptions } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import DescriptionsItem from 'antd/lib/descriptions/Item';

const UpdateForm = (props) => {
  const { visible, onSubmit, onCancel, values } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      width={800}
      destroyOnClose
      maskStyle
      maskClosable={false}
      title="编辑采购申请"
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
        <Form
          name="application-update-form"
          layout="horizontal"
          labelCol={{ span: 5 }}
          form={form}
          initialValues={{ materialList: [{ name: '', amount: '' }] }}
        >
          <Descriptions>
            <DescriptionsItem label="审核人">张科长</DescriptionsItem>
            <DescriptionsItem label="审核时间">2021-05-01</DescriptionsItem>
            <DescriptionsItem label="备注">超出预算</DescriptionsItem>
          </Descriptions>
          <FormItem
            name="applicationDept"
            label="申请部门"
            rules={[{ required: true, message: "请输入申请部门" }]}
          >
            <Input disabled defaultValue="部门1" placeholder="申请部门" />
          </FormItem>
          <FormItem
            name="applicant"
            label="申请人"
            rules={[{ required: true, message: "请输入申请人" }]}
          >
            <Input disabled defaultValue="申请人1" placeholder="申请人" />
          </FormItem>
          <Form.List name="materialList">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, idx) => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...field}
                      label="物料"
                      name={[field.name, 'name']}
                      fieldKey={[field.fieldKey, 'name']}
                      rules={[{ required: true, message: '请选择物料' }]}
                    >
                      <Select
                        mode="signle"
                        style={{ width: 180 }}
                        placeholder="选择物料"
                      >
                        <Option key="1">物料1</Option>
                        <Option key="2">物料2</Option>
                        <Option key="3">物料3</Option>
                        <Option key="4">物料4</Option>
                        <Option key="5">物料5</Option>
                        <Option key="6">物料6</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="数量"
                      name={[field.name, 'date']}
                      fieldKey={[field.fieldKey, 'date']}
                      rules={[{ required: true, message: '请填写数量' }]}
                    >
                      <Input placeholder="数量"></Input>
                    </Form.Item>
                    {
                      fields.length > 1 ? <MinusCircleOutlined onClick={() => remove(field.name)} /> : null
                    }
                    {idx === fields.length - 1 ? <PlusCircleOutlined onClick={() => add()} /> : null}
                  </Space>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateForm;