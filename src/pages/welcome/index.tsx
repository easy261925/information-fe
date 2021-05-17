import { CCProTable } from '@/components/easycc-rc-4';
import ProTable from '@ant-design/pro-table';
import { Row, Select } from 'antd';
import { CCColumns, CCDrawer, FormModeEnum } from 'easycc-rc-4';
import React from 'react';
import { townData } from '../infomation';
import { getDataService } from './service';

function Admin() {
  const imgStyle = { width: 100, height: 100 }

  const columns: CCColumns<any>[] | any = [
    {
      title: '户主姓名',
      dataIndex: 'username',
      render: (dom: any, entity: any) => {
        return <CCDrawer columns={columns.slice(1, columns.length)} formmode={FormModeEnum.view} record={entity}>
          <a>{dom}</a>
        </CCDrawer>
      }
    },
    {
      title: '镇名',
      dataIndex: 'townId',
      valueEnum: {
        '新立镇': '新立镇',
        '唐家镇': '唐家镇',
        '新开镇': '新开镇',
        '东风镇': '东风镇',
        '西安镇': '西安镇',
        '平安镇': '平安镇',
      }
    },
    {
      title: '村名',
      dataIndex: 'villageName'
    },
    {
      title: '户主电话',
      dataIndex: 'phone',
      search: false
    },
    {
      title: '身份证正面',
      dataIndex: 'ida',
      search: false,
      hideInTable: true,
      render: (dom: any) => {
        if (!dom) {
          return '无'
        }
        return <Row>
          <img src={dom} alt='' style={{ width: 100, height: 100 }} />
        </Row>
      }
    },
    {
      title: '身份证背面',
      dataIndex: 'idb',
      search: false,
      hideInTable: true,
      render: (dom: any) => {
        if (!dom) {
          return '无'
        }
        return <Row>
          <img src={dom} alt='' style={{ width: 100, height: 100 }} />
        </Row>
      }
    },
    {
      title: '户口本',
      dataIndex: 'hkb',
      hideInTable: true,
      search: false,
      render: (dom: any) => {
        if (!dom) {
          return '无'
        }
        return <Row gutter={4}>
          {dom.split(',').map((item: any) => <img style={imgStyle} key={item} src={item} />)}
        </Row>
      }
    },
    {
      title: '房屋产权证',
      dataIndex: 'fwcqz',
      hideInTable: true,
      search: false,
      render: (dom: any) => {
        if (!dom) {
          return '无'
        }
        return <Row gutter={4}>
          {dom.split(',').map((item: any) => <img style={imgStyle} key={item} src={item} />)}
        </Row>
      }
    },
    {
      title: '土地使用证',
      dataIndex: 'tdsyz',
      hideInTable: true,
      search: false,
      render: (dom: any) => {
        if (!dom) {
          return '无'
        }
        return <Row gutter={4}>
          {dom.split(',').map((item: any) => <img style={imgStyle} key={item} src={item} />)}
        </Row>
      }
    },
    {
      title: '其他权属证明',
      dataIndex: 'qtqszm',
      hideInTable: true,
      search: false,
      render: (dom: any) => {
        if (!dom) {
          return '无'
        }
        return <Row gutter={4}>
          {dom.split(',').map((item: any) => <img style={imgStyle} key={item} src={item} />)}
        </Row>
      }
    },
    {
      title: '其他材料',
      dataIndex: 'qtcl',
      hideInTable: true,
      search: false,
      render: (dom: any) => {
        if (!dom) {
          return '无'
        }
        return <Row gutter={4}>
          {dom.split(',').map((item: any) => <img style={imgStyle} key={item} src={item} />)}
        </Row>
      }
    },
    {
      title: '房屋持有人（1）姓名',
      dataIndex: 'usernameA1',
      search: false,
      hideInTable: true,
    },
    {
      title: '房屋持有人（1）手机',
      dataIndex: 'phoneA1',
      search: false,
      hideInTable: true,
    },
    {
      title: '房屋持有人（2）姓名',
      dataIndex: 'usernameA2',
      search: false,
      hideInTable: true,
    },
    {
      title: '房屋持有人（2）手机',
      dataIndex: 'phoneA2',
      search: false,
      hideInTable: true,
    },
    {
      title: '房屋持有人（1）身份证正面',
      dataIndex: 'ida1',
      search: false,
      hideInTable: true,
      render: (dom: any) => {
        if (!dom) {
          return '无'
        }
        return <Row>
          <img src={dom} alt='' style={{ width: 100, height: 100 }} />
        </Row>
      }
    },
    {
      title: '房屋持有人（1）身份证背面',
      dataIndex: 'ida2',
      search: false,
      hideInTable: true,
      render: (dom: any) => {
        if (!dom) {
          return '无'
        }
        return <Row>
          <img src={dom} alt='' style={{ width: 100, height: 100 }} />
        </Row>
      }
    },
    {
      title: '房屋持有人（2）身份证正面',
      dataIndex: 'idb1',
      search: false,
      hideInTable: true,
      render: (dom: any) => {
        if (!dom) {
          return '无'
        }
        return <Row>
          <img src={dom} alt='' style={{ width: 100, height: 100 }} />
        </Row>
      }
    },
    {
      title: '房屋持有人（2）身份证背面',
      dataIndex: 'idb2',
      search: false,
      hideInTable: true,
      render: (dom: any) => {
        if (!dom) {
          return '无'
        }
        return <Row>
          <img src={dom} alt='' style={{ width: 100, height: 100 }} />
        </Row>
      }
    },
    {
      title: '房屋持有人户口本',
      dataIndex: 'hkb1',
      hideInTable: true,
      search: false,
      render: (dom: any) => {
        if (!dom) {
          return '无'
        }
        return <Row gutter={4}>
          {dom.split(',').map((item: any) => <img style={imgStyle} key={item} src={item} />)}
        </Row>
      }
    },
    {
      title: '房屋产权来源',
      dataIndex: 'fwcqly',
      hideInTable: true,
      search: false,
      render: (dom: any) => {
        if (!dom) {
          return '无'
        }
        return <Row gutter={4}>
          {dom.split(',').map((item: any) => <img style={imgStyle} key={item} src={item} />)}
        </Row>
      }
    },
  ]
  return (
    <div>
      <ProTable
        rowKey='id'
        toolBarRender={() => []}
        columns={columns}
        request={getDataService}
      />
    </div>
  );
}

export default Admin;
