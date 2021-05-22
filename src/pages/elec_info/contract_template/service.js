import request from '@/utils/request';

export async function query(params) {
  return request('/api/elec_info/contract_template', {
    params,
  });
}

export async function remove(params) {
  return request('/api/elec_info/contract_template', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}

export async function add(params) {
  return request('/api/elec_info/contract_template', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}

export async function update(params) {
  return request('/api/elec_info/contract_template', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
