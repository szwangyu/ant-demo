import request from '@/utils/request';

export async function query(params) {
  return request('/api/org/depart', {
    params,
  });
}

export async function remove(params) {
  return request('/api/org/depart', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}

export async function add(params) {
  return request('/api/org/depart', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}

export async function update(params) {
  return request('/api/org/depart', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}
