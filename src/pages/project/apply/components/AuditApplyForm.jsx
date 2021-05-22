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
      title="项目立项申请审核"
      visible={visible}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
    >
      <div>
        <Form name="audit-apply-form" layout="horizontal" form={form} initialValues={values}>
          <Card title="申请详细信息" bordered={false}>
            <Descriptions
              size="default"
            >
              <Descriptions.Item label="项目名称">{values.name}</Descriptions.Item>
              <Descriptions.Item label="甲方">{values.partyA}</Descriptions.Item>
              <Descriptions.Item label="开始时间">{values.startDate}</Descriptions.Item>
              <Descriptions.Item label="结束时间">{values.endDate}</Descriptions.Item>
              <Descriptions.Item label="工程成本预估">{values.projectCostEsitmation}</Descriptions.Item>
              <Descriptions.Item label="商务费用预估">{values.bussinessCostEsitmation}</Descriptions.Item>
              <Descriptions.Item label="成交价预估">{values.transcationCostEsitmation}</Descriptions.Item>
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
