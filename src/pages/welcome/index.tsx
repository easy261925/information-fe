import { CCProTable } from '@/components/easycc-rc-4';
import { CCColumns } from 'easycc-rc-4';
import React from 'react';
import { getDataService } from './service';

function Admin() {
  const columns: CCColumns<any>[] | any = [
    {
      title: '镇名',
      dataIndex: 'townId'
    },
    {
      title: '村名',
      dataIndex: 'villageName'
    },
    {
      title: '户主姓名',
      dataIndex: 'username'
    },
    {
      title: '户主电话',
      dataIndex: 'phone'
    },
  ]
  return (
    <div>
      <CCProTable
        toolBarRender={() => []}
        columns={columns}
        request={getDataService}
      />
    </div>
  );
}

export default Admin;
