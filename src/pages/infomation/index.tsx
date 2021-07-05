import React, { useEffect, useState } from 'react';
import { Button, Col, Collapse, Divider, Form, Input, message, Modal, Row, Select, Spin, Upload } from 'antd'
import Header from './components/header'
import { useForm } from 'antd/lib/form/Form';
import styles from './index.less';
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import 'antd/lib/upload/style/index.less'
import { history } from 'umi'
import { getPageQuery } from '@/utils/utils';
import { createService } from './service';

export const townData = ['新立镇', '唐家镇', '新开镇', '东风镇', '西安镇', '平安镇']
const villageData = [
  ['新欣社区', '唐家村委会', '张家村委会', '云家村委会', '杨家村委会', '苏家村委会', '孙家村委会', '史家村委会'],
  ['新建社区', '白家村委会', '唐家铺村委会', '南小房村委会', '北窑村委会', '朱家村委会', '葛家村委会', '陈家村委会', '刘家村委会', '袁家村委会', '杜家村委会', '四十里村委会'],
  ['铁南村委会', '西五村委会', '史家村委会', '张家村委会', '曲家村委会', '八家子村委会', '于楼村委会', '田家铺村委会', '胥家村委会'],
  ['大岗子村委会', '马家村委会', '叶家村委会', '二道边子村委会', '东风村委会', '大北屯村委会', '水库村委会', '驾掌寺村委会', '腰屯村委会', '河沿村委会', '黄金带村委会', '栾家村委会'],
  ['高坎村委会', '高坎湾村委会', '小洼村委会', '上口子村委会', '洼边子村委会', '八家子村委会', '桃园村委会', '韩家村委会', '小亮沟村委会', '刘家村委会', '桑林子村委会', '王家塘村委会'],
  ['哈吧村委会', '曹蔡村委会', '新屯村委会', '建设村委会', '平房村委会', '大亮村委会', '大房村委会', '小房村委会', '新鑫村委会', '平安村委会'],
]

const Infomation = () => {
  const [townId, setTownId] = useState('0')
  const [loading, setLoading] = useState(false)
  const [form] = useForm()
  useEffect(() => {
    const params = getPageQuery();
    const { id = '0' } = params
    setTownId(id as string)
  }, []);


  const onPreview = (key: string, info: any) => {
    console.log('key', key)
    console.log('info', info)
  }

  const onSubmit = () => {
    form.validateFields().then(values => {
      console.log('values', values)
      console.log('townId', townId)
      const {
        villageName,
        username,
        phone,
        usernameA1,
        phoneA1,
        usernameA2,
        phoneA2,
        IDA = [],
        IDB = [],
        HKB = [],
        FWCQZ = [],
        TDSYZ = [],
        QTQSZM = [],
        QTCL = [],
        IDA1,
        IDB1,
        IDA2,
        IDB2,
        HKB1,
        FWCQLY
      }
        = values
      let IDAFile = (IDA && IDA.length > 0) ? IDA[0].originFileObj : null
      let IDBFile = (IDB && IDB.length > 0) ? IDB[0].originFileObj : null
      // 户口本
      let HKBFiles = null
      if (HKB && HKB.length > 0) {
        HKBFiles = HKB.map((item: { originFileObj: any; }) => item.originFileObj)
      }
      // 房屋产权证
      let FWCQZFiles = null
      if (FWCQZ && FWCQZ.length > 0) {
        FWCQZFiles = FWCQZ.map((item: { originFileObj: any; }) => item.originFileObj)
      }
      // 土地使用证
      let TDSYZFiles = null
      if (TDSYZ && TDSYZ.length > 0) {
        TDSYZFiles = TDSYZ.map((item: { originFileObj: any; }) => item.originFileObj)
      }
      // 其他权属证明材料
      let QTQSZMFiles = null
      if (QTQSZM && QTQSZM.length > 0) {
        QTQSZMFiles = QTQSZM.map((item: { originFileObj: any; }) => item.originFileObj)
      }
      // 其他材料
      let QTCLFiles = null
      if (QTCL && QTCL.length > 0) {
        QTCLFiles = QTCL.map((item: { originFileObj: any; }) => item.originFileObj)
      }
      // 房屋持有人与产权证不一致
      // 第一人身份证正面
      let IDA1Files = null
      if (IDA1 && IDA1.length > 0) {
        IDA1Files = IDA1.map((item: { originFileObj: any; }) => item.originFileObj)
      }

      // 第一人身份证背面
      let IDB1Files = null
      if (IDB1 && IDB1.length > 0) {
        IDB1Files = IDB1.map((item: { originFileObj: any; }) => item.originFileObj)
      }

      // 第二人身份证正面
      let IDA2Files = null
      if (IDA2 && IDA2.length > 0) {
        IDA2Files = IDA2.map((item: { originFileObj: any; }) => item.originFileObj)
      }

      // 第二人身份证背面
      let IDB2Files = null
      if (IDB2 && IDB2.length > 0) {
        IDB2Files = IDB2.map((item: { originFileObj: any; }) => item.originFileObj)
      }

      // 户口本
      let HKB1Files = null
      if (HKB1 && HKB1.length > 0) {
        HKB1Files = HKB1.map((item: { originFileObj: any; }) => item.originFileObj)
      }

      let FWCQLYFiles = null
      if (FWCQLY && FWCQLY.length > 0) {
        FWCQLYFiles = FWCQLY.map((item: { originFileObj: any; }) => item.originFileObj)
      }
      const payload = {
        townId: townData[townId], // 镇id
        villageName, // 村名
        username, // 户主姓名
        phone, // 户主联系电话
        IDA: IDAFile, // 户主身份证正面
        IDB: IDBFile, // 户主身份证背面
        HKB: HKBFiles, // 户主口本
        FWCQZ: FWCQZFiles, // 房屋产权证
        TDSYZ: TDSYZFiles, // 土地使用证
        QTQSZM: QTQSZMFiles, // 其他权属证明材料
        QTCL: QTCLFiles, // 其他材料
        usernameA1, // 房屋持有人1姓名
        phoneA1, // 房屋持有人1电话
        usernameA2, // 房屋持有人2姓名
        phoneA2, // 房屋持有人2电话
        IDA1: IDA1Files, // 房屋持有人1身份证正面
        IDB1: IDB1Files, // 房屋持有人1身份证背面
        IDA2: IDA2Files, // 房屋持有人2身份证正面
        IDB2: IDB2Files, // 房屋持有人2身份证背面
        HKB1: HKB1Files, // 户口本信息
        FWCQLY: FWCQLYFiles, // 房屋产权来源证明
      }
      Modal.confirm({
        title: '确认提交?',
        icon: <ExclamationCircleOutlined />,
        content: '已经提交不得修改',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          setLoading(true)
          createService(payload).then(res => {
            console.log('res', res)
            setLoading(false)
            if (res.success) {
              message.success('提交成功')
              history.push('/entry/result')
            } else {
              message.error('上传失败')
            }
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    })
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Spin spinning={loading} tip="正在加载数据...">
      <Form form={form} className={styles.container}>
        <Header title={`${townData[townId]}信息采集`} onSubmit={onSubmit} />
        <div style={{ padding: 10 }}>
          <Form.Item
            label="村名"
            name="villageName"
            rules={[{ required: true, message: '请填写村名!' }]}
          >
            <Select listHeight={800}>
              {
                villageData[townId].map((item: string) => {
                  return <Select.Option key={item} value={item}>{item}</Select.Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="户主姓名"
            name="username"
            rules={[{ required: true, message: '请填写户主姓名!' }]}
          >
            <Input placeholder='请填写户主姓名' />
          </Form.Item>
          <Form.Item
            label="户主手机号码"
            name="phone"
            rules={[{
              required: true, validator: (_, value) => {
                if (!value) {
                  return Promise.reject('请填写户主手机号码')
                }
                if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
                  return Promise.reject('手机号格式错误')
                }
                return Promise.resolve()
              }
            }]}
          >
            <Input placeholder='请填写户主手机号码' />
          </Form.Item>
          <Row style={{ marginTop: 10 }}>
            <Col span={12}>
              <Form.Item
                name="IDA"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload name="IDA" action="/server/api/files/connect" listType="picture" maxCount={1} accept='image/*'>
                  <Button><UploadOutlined />身份证正面</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="IDB"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload name="IDB" action="/server/api/files/connect" listType="picture" maxCount={1} accept='image/*'>
                  <Button><UploadOutlined />身份证背面</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Divider style={{ marginBottom: 0 }}>户口本信息</Divider>
          <Row justify='center' style={{ color: 'red' }}>（户口本每一页照片）</Row>
          <Form.Item
            name="HKB"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload multiple name="HKB" action="/server/api/files/connect" listType="picture" accept='image/*'>
              <Button><UploadOutlined />户主户口本</Button>
            </Upload>
          </Form.Item>
          <Divider style={{ marginBottom: 0 }} >房屋产权证</Divider>
          <Row justify='center' style={{ color: 'red' }}>（房屋产权证每一页照片）</Row>
          <Form.Item
            name="FWCQZ"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload multiple name="FWCQZ" action="/server/api/files/connect" listType="picture" accept='image/*'>
              <Button><UploadOutlined />房屋产权证</Button>
            </Upload>
          </Form.Item>
          <Divider style={{ marginBottom: 0 }}>土地使用证</Divider>
          <Row justify='center' style={{ color: 'red' }}>（土地使用证每一页照片）</Row>
          <Form.Item
            name="TDSYZ"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload multiple name="TDSYZ" action="/server/api/files/connect" listType="picture" accept='image/*'>
              <Button><UploadOutlined />土地使用证</Button>
            </Upload>
          </Form.Item>
          <Divider style={{ marginBottom: 0 }}>其他权属证明材料</Divider>
          <Row justify='center' style={{ color: 'red' }}>（遗嘱、买卖协议、公证书、结婚证等）</Row>
          <Form.Item
            name="QTQSZM"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{ marginTop: 10 }}
          >
            <Upload multiple name="QTQSZM" action="/server/api/files/connect" listType="picture" accept='image/*'>
              <Button><UploadOutlined />其他权属证明材料</Button>
            </Upload>
          </Form.Item>
          <Divider style={{ marginBottom: 0 }}>其他材料</Divider>
          <Row justify='center' style={{ color: 'red' }}>（集体建设用地除上述五类资料之外还需额外收集营业执照、经营许可证、组织机构代码证等材料）</Row>
          <Form.Item
            name="QTCL"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            style={{ marginTop: 10 }}
          >
            <Upload multiple name="QTCL" action="/server/api/files/connect" listType="picture" accept='image/*'>
              <Button><UploadOutlined />其他材料</Button>
            </Upload>
          </Form.Item>

          <Collapse style={{ marginTop: 10 }}>
            <Collapse.Panel header="房屋持有人与产权证不一致" key="1">
              <Divider>房屋持有人(1)</Divider>
              <Form.Item
                label="房屋持有人(1)姓名"
                name="usernameA1"
              >
                <Input placeholder='请填写房屋持有人姓名(1)' />
              </Form.Item>
              <Form.Item
                label="房屋持有人(1)手机号码"
                name="phoneA1"
                rules={[{
                  validator: (_, value) => {
                    if (value && !/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
                      return Promise.reject('手机号格式错误')
                    }
                    return Promise.resolve()
                  }
                }]}
              >
                <Input placeholder='请填写房屋持有人(1)手机号码' />
              </Form.Item>
              <Form.Item
                name="IDA1"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{ marginTop: 10 }}
              >
                <Upload name="IDA1" action="/server/api/files/connect" listType="picture" maxCount={1} accept='image/*'>
                  <Button><UploadOutlined />房屋持有人(1)身份证正面</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="IDB1"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{ marginTop: 10 }}
              >
                <Upload name="IDB1" action="/server/api/files/connect" listType="picture" maxCount={1} accept='image/*'>
                  <Button><UploadOutlined />房屋持有人(1)身份证背面</Button>
                </Upload>
              </Form.Item>
              {/* 房屋持有人2 */}
              <Divider>房屋持有人(2)</Divider>
              <Form.Item
                label="房屋持有人(2)姓名"
                name="usernameA2"
              >
                <Input placeholder='请填写房屋持有人(2)姓名' />
              </Form.Item>
              <Form.Item
                label="房屋持有人(2)手机号码"
                name="phoneA2"
                rules={[{
                  validator: (_, value) => {
                    if (value && !/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) {
                      return Promise.reject('手机号格式错误')
                    }
                    return Promise.resolve()
                  }
                }]}
              >
                <Input placeholder='请填写房屋持有人(2)手机号码' />
              </Form.Item>
              <Form.Item
                name="IDA2"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{ marginTop: 10 }}
              >
                <Upload name="IDA2" action="/server/api/files/connect" listType="picture" maxCount={1} accept='image/*'>
                  <Button><UploadOutlined />房屋持有人(2)身份证正面</Button>
                </Upload>
              </Form.Item>
              <Form.Item
                name="IDB2"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                style={{ marginTop: 10 }}
              >
                <Upload name="IDB2" action="/server/api/files/connect" listType="picture" maxCount={1} accept='image/*'>
                  <Button><UploadOutlined />房屋持有人(2)身份证背面</Button>
                </Upload>
              </Form.Item>

              <Divider style={{ marginBottom: 0 }}>户口本信息</Divider>
              <Row justify='center' style={{ color: 'red' }}>（户口本每一页照片）</Row>
              <Form.Item
                name="HKB1"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload multiple name="HKB1" action="/server/api/files/connect" listType="picture" accept='image/*'>
                  <Button><UploadOutlined />户口本信息</Button>
                </Upload>
              </Form.Item>
              <Divider style={{ marginBottom: 0 }}>房屋产权来源的相关证明</Divider>
              <Row justify='center' style={{ color: 'red' }}>房屋产权来源是指产权人取得房屋产权的时间和方式，如继承、分析、买受、受赠、交换、自建、翻建、征用、收购、调拨、价拨、拨用等。产权来源有两种以上的，应全部说明（注：资料需自行准备）。</Row>
              <Form.Item
                name="FWCQLY"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload multiple name="FWCQLY" action="/server/api/files/connect" listType="picture" accept='image/*'>
                  <Button><UploadOutlined />房屋产权来源</Button>
                </Upload>
              </Form.Item>
            </Collapse.Panel>
          </Collapse>
        </div>
      </Form >
    </Spin>
  );
}

export default Infomation;
