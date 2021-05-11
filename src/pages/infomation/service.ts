import request from '@/utils/axios';

// 上传信息
export async function createService(payload: any) {
  console.log('payload', payload)
  const params = new FormData();
  for (const key in payload) {
    if (payload.hasOwnProperty(key)) {
      const item = payload[key] || '';
      if (Array.isArray(item)) {
        item.map(i => {
          params.append(([key] as unknown) as string, i);
        })
      } else {
        params.append(([key] as unknown) as string, item);
      }
    }
  }
  return request(`/server/api/files/create`, {
    method: 'POST',
    data: params,
  });
}