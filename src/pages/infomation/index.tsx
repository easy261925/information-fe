import React, { useEffect, useState } from 'react';
import { Button, Col, Collapse, Divider, Form, Input, message, Modal, Row, Upload } from 'antd'
import Header from './components/header'
import { useForm } from 'antd/lib/form/Form';
import styles from './index.less';
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import 'antd/lib/upload/style/index.less'
import { getPageQuery } from '@/utils/utils';

const townData = ['新立镇', '唐家镇', '新开镇', '东风镇', '西安镇', '平安镇']

const Infomation = () => {
  const [townId, setTownId] = useState('0')
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
      Modal.confirm({
        title: '确认提交?',
        icon: <ExclamationCircleOutlined />,
        content: '已经提交不得修改',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          message.success('提交成功')
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
    <Form form={form} className={styles.container}>
      <Header title={`${townData[townId]}信息采集`} onSubmit={onSubmit} />
      <div style={{ padding: 10 }}>
        <Form.Item
          label="村名"
          name="villageName"
          rules={[{ required: true, message: '请填写村名!' }]}
        >
          <Input placeholder='请填写村名' />
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
          rules={[{ required: true, message: '请填写户主手机号码!' }]}
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
              <Upload name="IDA" action="/upload.do" listType="picture" maxCount={1} accept='image/*'>
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
              <Upload name="IDB" action="/upload.do" listType="picture" maxCount={1} accept='image/*'>
                <Button><UploadOutlined />身份证背面</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Divider>户口本信息</Divider>
        <Form.Item
          name="HKB"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload multiple name="HKB" action="/upload.do" listType="picture" accept='image/*'>
            <Button><UploadOutlined />户主户口本</Button>
          </Upload>
        </Form.Item>
        <Divider>房屋产权证</Divider>
        <Form.Item
          name="FWCQZ"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload multiple name="FWCQZ" action="/upload.do" listType="picture" accept='image/*'>
            <Button><UploadOutlined />房屋产权证</Button>
          </Upload>
        </Form.Item>
        <Divider>土地使用证</Divider>
        <Form.Item
          name="TDSYZ"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload multiple name="TDSYZ" action="/upload.do" listType="picture" accept='image/*'>
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
          <Upload multiple name="QTQSZM" action="/upload.do" listType="picture" accept='image/*'>
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
          <Upload multiple name="QTCL" action="/upload.do" listType="picture" accept='image/*'>
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
            >
              <Input placeholder='请填写房屋持有人(1)手机号码' />
            </Form.Item>
            <Form.Item
              name="IDA1"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              style={{ marginTop: 10 }}
            >
              <Upload name="IDA1" action="/upload.do" listType="picture" maxCount={1} accept='image/*'>
                <Button><UploadOutlined />房屋持有人(1)身份证正面</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="IDB1"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              style={{ marginTop: 10 }}
            >
              <Upload name="IDB1" action="/upload.do" listType="picture" maxCount={1} accept='image/*'>
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
            >
              <Input placeholder='请填写房屋持有人(2)手机号码' />
            </Form.Item>
            <Form.Item
              name="IDA2"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              style={{ marginTop: 10 }}
            >
              <Upload name="IDA2" action="/upload.do" listType="picture" maxCount={1} accept='image/*'>
                <Button><UploadOutlined />房屋持有人(2)身份证正面</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="IDB2"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              style={{ marginTop: 10 }}
            >
              <Upload name="IDB2" action="/upload.do" listType="picture" maxCount={1} accept='image/*'>
                <Button><UploadOutlined />房屋持有人(2)身份证背面</Button>
              </Upload>
            </Form.Item>

            <Divider>户口本信息</Divider>
            <Form.Item
              name="HKB1"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload multiple name="HKB1" action="/upload.do" listType="picture" accept='image/*'>
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
              <Upload multiple name="FWCQLY" action="/upload.do" listType="picture" accept='image/*'>
                <Button><UploadOutlined />房屋产权来源</Button>
              </Upload>
            </Form.Item>
          </Collapse.Panel>
        </Collapse>
      </div>
    </Form >
  );
}

export default Infomation;
