import { Button, Space } from 'antd';
import React from 'react';
import styles from './header.less'

interface HeaderProps {
  onSubmit: () => void
  title: string
}

const Header: React.FC<HeaderProps> = (props) => {
  const { onSubmit, title } = props
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <Space>
        <Button size="small" onClick={onSubmit}>提交</Button>
      </Space>
    </div>
  );
}

export default Header;
