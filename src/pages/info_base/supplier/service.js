import request from '@/utils/request';

export async function query(params) {
  return request('/api/info_base/supplier', {
    params,
  });
}

export async function remove(key) {
  return request('/api/info_base/supplier', {
    method: 'POST',
    data: { key, method: 'delete' },
  });
}

export async function add(params) {
  return request('/api/info_base/supplier', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}

export async function update(params) {
  return request('/api/info_base/supplier', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
