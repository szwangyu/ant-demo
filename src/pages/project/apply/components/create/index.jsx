import { CloseCircleOutlined } from '@ant-design/icons';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, Popover, Row, Select, Descriptions, Space } from 'antd';
import React, { useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect } from 'umi';
import TextArea from 'antd/lib/input/TextArea';
import styles from './style.less';
const { Option } = Select;
const { RangePicker } = DatePicker;
const fieldLabels = {
  name: '项目名称',
  partyA: '甲方名称',
  detail: '项目详细内容',
  startDate: '开始时间',
  endDate: '结束时间',
  projectCostEsitmation: '工程成本预估',
  bussinessCostEsitmation: '商务费用预估',
  transcationCostEsitmation: '项目成交价预估',
};

const AdvancedForm = ({ submitting, dispatch }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState([]);

  const getErrorInfo = (errors) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;

    if (!errors || errorCount === 0) {
      return null;
    }

    const scrollToField = (fieldKey) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);

      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };

    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }

      const key = err.name[0];
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode;
            }

            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };

  const onFinish = (values) => {
    setError([]);
    dispatch({
      type: 'updateApplyForm/submitUpdateApplyForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo) => {
    setError(errorInfo.errorFields);
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      hideRequiredMark
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ staffs: [{ type: '', amount: '' }] }}
    >
      <PageContainer content="输入申请信息">
        <Card title="基本信息" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Form.Item
              name="applyId"
            ></Form.Item>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.name}
                name="name"
                rules={[{ required: true, message: '请输入项目名称' }]}
              >
                <Input placeholder="项目名称" />
              </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.partyA}
                name="partyA"
                rules={[{ required: true, message: '请输入甲方' }]}
              >
                <Input placeholder="甲方" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="项目时间信息" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.startDate}
                name="startDate"
                rules={[{ required: true, message: '请输入项目开始时间' }]}
              >
                <Input placeholder="项目名称" />
              </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.endDate}
                name="endDate"
                rules={[{ required: true, message: '请输入项目结束时间' }]}
              >
                <Input placeholder="项目结束时间" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="项目费用信息" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.projectCostEsitmation}
                name="projectCostEsitmation"
                rules={[{ required: true, message: '请输入工程成本预估' }]}
              >
                <Input placeholder="工程成本预估" />
              </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.bussinessCostEsitmation}
                name="bussinessCostEsitmation"
                rules={[{ required: true, message: '请输入商务费用预估' }]}
              >
                <Input placeholder="商务费用预估" />
              </Form.Item>
            </Col>
            <Col lg={6} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.transcationCostEsitmation}
                name="transcationCostEsitmation"
                rules={[{ required: true, message: '请输入项目成交价预估' }]}
              >
                <Input placeholder="项目成交价预估" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card title="项目人员管理" className={styles.card} bordered={false}>
          <Form.List name="staffs">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, idx) => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...field}
                      label="工程人员类别"
                      name={[field.name, 'type']}
                      fieldKey={[field.fieldKey, 'type']}
                      rules={[{ required: true, message: '请选择工程人员类别' }]}
                    >
                      <Select
                        mode="signle"
                        style={{ width: 180 }}
                        placeholder="选择工程人员类别"
                      >
                        <Option key="1">类型1</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="人数"
                      name={[field.name, 'amount']}
                      fieldKey={[field.fieldKey, 'amount']}
                      rules={[{ required: true, message: '请填写人数' }]}
                    >
                      <Input placeholder="人数"></Input>
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
        </Card>
        <Card title="项目详细信息" className={styles.card} bordered={false}>
          <Row gutter={16}>
            <Col lg={12} md={12} sm={24}>
              <Form.Item
                label={fieldLabels.detail}
                name="detail"
                rules={[{ required: true, message: '请输入项目详细内容' }]}
              >
                <TextArea rows={8} placeholder="项目详细内容" />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </PageContainer>
      <FooterToolbar>
        {getErrorInfo(error)}
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['newApplyForm/submitNewApplyForm'],
}))(AdvancedForm);
