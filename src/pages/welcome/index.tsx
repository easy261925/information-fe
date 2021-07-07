import ProTable, { ActionType } from '@ant-design/pro-table';
import { Button, Divider, message, Modal, Popconfirm, Row } from 'antd';
import { CCColumns, CCDrawer, FormModeEnum } from 'easycc-rc-4';
import React, { useRef, useState } from 'react';
import { deleteAllService, deleteService, downloadService, getDataService, transferService, zipImageByIdService } from './service';

function Admin() {
  const imgStyle = { width: 100, height: 100 }
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])

  const ref = useRef<ActionType>();

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
    {
      title: '文字识别结果',
      dataIndex: 'wordUrl',
      render: (dom: string, entity: any) => {
        if (entity.wordUrl) {
          return <a onClick={() => window.open(dom)}>下载word文件</a>
        }
        return ''
      }
    },
    {
      title: '操作',
      dataIndex: 'options',
      render: (dom: any, entity: any) => {
        return <>
          <a onClick={() => {
            if (entity.transfer) {
              Modal.confirm({
                title: '此用户已转换Word文档，是否需要再次转换',
                onOk: () => {
                  setLoading(true)
                  transferService(entity.id).then(res => {
                    setLoading(false)
                    if (res.success) {
                      message.success('转换成功')
                      ref.current?.reload()
                    }
                  })
                }
              })
              return
            }
            setLoading(true)
            transferService(entity.id).then(res => {
              setLoading(false)
              if (res.success) {
                message.success('转换成功')
                ref.current?.reload()
              }
            })
          }}>转换文字</a>
          <Divider type="vertical" />
          <a onClick={() => {
            if (entity.zipImages) {
              Modal.confirm({
                title: '此用户图片已经压缩完成，是否需要再次压缩',
                onOk: () => {
                  setLoading(true)
                  zipImageByIdService(entity.id).then(res => {
                    setLoading(false)
                    if (res.success) {
                      message.success('压缩图片成功')
                    }
                  })
                }
              })
              return
            }
            setLoading(true)
            zipImageByIdService(entity.id).then(res => {
              setLoading(false)
              if (res.success) {
                message.success('压缩图片成功')
              }
            })
          }}>压缩图片</a>
          <Divider type="vertical" />
          <a onClick={async () => {
            setLoading(true)
            if (!entity.zipImages) {
              const aipImagesResult = await zipImageByIdService(entity.id)
              if (aipImagesResult.success) {
                message.success('压缩图片成功')
              }
            }
            if (!entity.transfer) {
              const transferResult = await transferService(entity.id)
              if (transferResult.success) {
                message.success('转换文字成功')
              }
            }
            const downloadRes = await downloadService(entity.id)
            setLoading(false)
            if (downloadRes.success) {
              console.log('获取下载地址')
              console.log('downloadRes', downloadRes)
              ref.current?.reload()
              Modal.confirm({
                title: '导出成功，是否需要下载',
                onOk: () => {
                  window.open(downloadRes.data.url)
                }
              })
            }
          }}>导出</a>
          <Divider type="vertical" />
          <Popconfirm title='确认删除' onConfirm={() => {
            deleteService(entity.id).then(res => {
              if (res.success) {
                message.success('删除成功')
                ref.current?.reload()
              }
            })
          }}>
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </>
      }
    }
  ]
  return (
    <div>
      <ProTable
        rowKey='id'
        toolBarRender={() => []}
        columns={columns}
        request={getDataService}
        loading={loading}
        actionRef={ref}
        rowSelection={{
          selectedRowKeys,
          onChange: (keys: any) => {
            setSelectedRowKeys(keys)
          }
        }}
        tableAlertOptionRender={() => <Popconfirm title='确认删除?' onConfirm={() => {
          deleteAllService(selectedRowKeys).then(res => {
            if (res.success) {
              message.success('删除成功')
              ref.current?.reload()
            }
          })
        }}>
          <Button danger >批量删除</Button>
        </Popconfirm>}
      />
    </div>
  );
}

export default Admin;
