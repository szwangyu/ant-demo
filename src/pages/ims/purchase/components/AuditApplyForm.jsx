import React from 'react';
import { Modal, Form, Descriptions, Select, Card } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';

const AuditApplyForm = (props) => {
  const { visible, onSubmit, onCancel, values } = props;
  const [form] = Form.useForm();

  return (
    <Modal
      width={800}
      destroyOnClose
      maskStyle
      maskClosable={false}
      title="采购申请审核"
      visible={visible}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
    >
      <div>
        <Form name="application-apply-form" layout="horizontal" form={form} initialValues={values}>
          <Card title="采购详细信息" bordered={false}>
            <Descriptions
              size="default"
            >
              <Descriptions.Item label="申请部门:">{values.applicationDept}</Descriptions.Item>
              <Descriptions.Item label="申请人:">{values.applicant}</Descriptions.Item>
              <Descriptions.Item label="申请时间:">{values.applicationTime}</Descriptions.Item>
              <Descriptions.Item label="总价格:">{values.price}</Descriptions.Item>
              <Descriptions.Item label="配件详细:">配件1:100</Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title="填写审核信息" bordered={false}>
            <FormItem
              name="result"
              label="审核结果"
              rules={[{ required: true, message: '请选择审核结果' }]}
            >
              <Select>
                <Option key="1">
                  通过
              </Option>
                <Option key="2">
                  拒绝
              </Option>
              </Select>
            </FormItem>
            <FormItem
              name="remark"
              label="审核备注"
              rules={[{ required: true, message: '请输入审核备注' }]}
            >
              <TextArea rows={4} />
            </FormItem>
          </Card>
        </Form>
      </div>
    </Modal>
  );
};

export default AuditApplyForm;
