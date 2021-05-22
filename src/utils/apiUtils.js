import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const key = 'updatable';
export const handleRequest = async (api, fields, action = '操作') => {
  try {
    message.loading({ content: 'Loading...', key });
    await api(fields);
    message.success({ content: `${action}成功！`, key });
    return true;
  } catch (error) {
    // message.error({ content: `${action}失败，请稍后重试！`, key });
    return false;
  }
};

export const confirmHandle = (
  api,
  params,
  {
    title = '确定要删除这条记录吗？',
    content = '记录删除后将不能恢复，请谨慎删除',
    success = '删除成功',
    okType = 'danger',
    onOk: okHandler = () => {},
    onCancel = () => {},
  },
) => {
  Modal.confirm({
    title,
    content,
    okType,
    icon: <ExclamationCircleOutlined />,
    async onOk() {
      try {
        await api(params);
        message.success(success);
        okHandler();
      } catch (error) {}
    },
    onCancel,
  });
};


export const confirmHandleConfirm = (
  api,
  params,
  {
    title = '确定要重置该用户的密码？',
    content = '重置后密码更改为123456，不可回退',
    success = '重置成功',
    okType = 'danger',
    onOk: okHandler = () => {},
    onCancel = () => {},
  },
) => {
  Modal.confirm({
    title,
    content,
    okType,
    icon: <ExclamationCircleOutlined />,
    async onOk() {
      try {
        await api(params);
        message.success(success);
        okHandler();
      } catch (error) {}
    },
    onCancel,
  });
};
