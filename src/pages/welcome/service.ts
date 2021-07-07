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

export async function transferService(id: string) {
  return request(`/server/api/baidu/makeFile/${id}`)
}

export async function deleteService(id: string) {
  return request(`/server/api/files/files/${id}`, {
    method: 'DELETE'
  })
}

export async function downloadService(id: string) {
  return request(`/server/api/files/downloadFiles/${id}`)
}

export async function zipImageByIdService(id: string) {
  return request(`/server/api/files/zipFileById/${id}`)
}

export async function deleteAllService(fileIdList: number[]) {
  return request(`/server/api/files/filesAll`, {
    body: { fileIdList },
    method: 'POST'
  })
}

