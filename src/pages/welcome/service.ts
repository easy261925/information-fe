import request from '@/utils/axios';

export async function getDataService(params: any) {
  return request(`/server/api/files/files`, {
    params,
  }).then((res: any) => {
    return {
      success: res?.success,
      data: res?.data?.data,
      total: res?.data?.total,
    };
  });
}
