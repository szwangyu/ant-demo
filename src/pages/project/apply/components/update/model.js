import { message } from 'antd';
import { fakeSubmitForm } from './service';
const Model = {
  namespace: 'updateApplyForm',
  state: {},
  effects: {
    *submitUpdateApplyForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('ζδΊ€ζε');
    },
  },
};
export default Model;
