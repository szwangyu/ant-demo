import { CloseCircleOutlined } from '@ant-design/icons';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Popover, Row, Select, Descriptions, Space } from 'antd';
import React, { useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { connect } from 'umi';
import TextArea from 'antd/lib/input/TextArea';
import styles from './style.less';
const { Option } = Select;
const fieldLabels = {
  name: '项目名称',
  partyA: '甲方名称',
  startDate: '开始时间',
  endDate: '结束时间',
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
      initialValues={{ plans: [{ staffType: '', nums: '' }], nodes: [{ name: '', date: '' }] }}
    >
      <PageContainer content="请输入项目计划详细信息">
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
        <Card title="施工人员管理" bordered={false}>
          <Form.List name="plans">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, idx) => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...field}
                      name={[field.name, 'staffType']}
                      fieldKey={[field.fieldKey, 'staffType']}
                      rules={[{ required: true, message: '请选择类别' }]}
                    >
                      <Select
                        mode="signle"
                        style={{ width: 180 }}
                        placeholder="请选择类别">
                        <Option key="类别1">类别1</Option>
                        <Option key="类别2">类别2</Option>
                        <Option key="类别3">类别3</Option>
                        <Option key="类别4">类别4</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'nums']}
                      fieldKey={[field.fieldKey, 'nums']}
                      rules={[{ required: true, message: '请填写人数' },
                      { pattern: new RegExp(/^\+?[1-9][0-9]*$/, "g"), message: '请填写整数' }]}
                    >
                      <Input placeholder="人数" />
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
        <Card title="项目节点管理" bordered={false}>
          <Form.List name="nodes">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, idx) => (
                  <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...field}
                      name={[field.name, 'name']}
                      fieldKey={[field.fieldKey, 'name']}
                      rules={[{ required: true, message: '请输入节点名称' }]}
                    >
                      <Input placeholder="项目节点" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'date']}
                      fieldKey={[field.fieldKey, 'date']}
                      rules={[{ required: true, message: '请填写时间' }]}
                    >
                      <DatePicker></DatePicker>
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
      </PageContainer>
      <FooterToolbar>
        {getErrorInfo(error)}
        <Button type="default" onClick={() => history.go(-1)}>
          返回
        </Button>
        <Button type="primary" onClick={() => form?.submit()} loading={submitting}>
          提交
        </Button>
      </FooterToolbar>
    </Form>
  );
};

export default connect(({ loading }) => ({
  submitting: loading.effects['newPlanForm/submitNewPlanForm'],
}))(AdvancedForm);
