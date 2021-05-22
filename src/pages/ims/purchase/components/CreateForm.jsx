import React from 'react';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Space, Select } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const CreateForm = (props) => {
  const { visible, onSubmit, onCancel } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      width={800}
      destroyOnClose
      maskStyle
      maskClosable={false}
      title="新建采购申请"
      visible={visible}
      onOk={async () => {
        const values = await form.validateFields();
        try {
          onSubmit(values);
          form.resetFields();
        } catch (e) {

        }
      }}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
    >
      <div>
        <Form
          name="application-add-form"
          layout="horizontal"
          labelCol={{ span: 5 }}
          form={form}
          initialValues={{ materialList: [{ name: '', amount: '' }] }}
        >
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

export default CreateForm;
