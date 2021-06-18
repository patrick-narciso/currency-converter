import { useState } from 'react';
import classNames from 'classnames';

import useWindowSize from './hooks/useWindowSize';
import useLocalStorage from './hooks/useLocalStorage';

import { currencyFormatter, currencyParser } from './utils';
import {
  convertCurrency,
  ConversionSavedType,
  ConversionType,
} from './services/currency';

import './App.css';

import {
  Layout,
  Typography,
  Button,
  InputNumber,
  Select,
  Form,
  Table,
} from 'antd';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const App: React.FC = () => {
  const [currency, setCurrency] = useState<string>('USD');
  const [output, setOutput] = useState<string | 0>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastConversions, setLastConversions] = useLocalStorage<
    ConversionType[]
  >('lastConversions', []);
  const screen = useWindowSize();
  const isMobile = screen.width ? screen.width <= 1024 : false;
  const latestConversions = lastConversions.slice(0, 10);

  const currencies = [
    {
      value: 'USD',
      label: 'US Dollar',
    },
    {
      value: 'EUR',
      label: 'Euro',
    },
    {
      value: 'JPY',
      label: 'Yen',
    },
    {
      value: 'BRL',
      label: 'Brazilian Real',
    },
  ];

  const columns = [
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
  ];

  const saveConversion = (data: ConversionSavedType): void => {
    const valueFormatted = currencyFormatter(data?.to)(data?.amount);
    const conversion = {
      value: valueFormatted,
      from: data?.from,
      to: data?.to,
      time: Date.now(),
    };
    const newConversions = [...lastConversions, conversion];
    const conversionsSortted = newConversions.sort((a, b) =>
      a.time! > b.time! ? -1 : a.time! < b.time! ? 1 : 0
    );
    setOutput(valueFormatted);
    setLastConversions(conversionsSortted);
  };

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const { sourceCurrency: from, destinationCurrency: to, value } = values;
      const data = await convertCurrency({ from, to, value });
      if (data) {
        saveConversion(data);
      }
    } catch (error) {
      console.error('error on request', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Header className="container">
        <Title className="title" level={3}>
          Currency Conversion
        </Title>
      </Header>
      <Content
        className={classNames({ 'pr-100': !isMobile }, 'content-container')}
      >
        <Form
          {...layout}
          name="convertForm"
          onFinish={handleSubmit}
          onFinishFailed={() => console.log('error')}
        >
          <Form.Item {...tailLayout}>
            <Title
              className={classNames({ show: output, hide: !output })}
              level={4}
            >
              {`Converted: ${output}`}
            </Title>
          </Form.Item>
          <Form.Item
            label="Source Currency"
            name="sourceCurrency"
            rules={[
              {
                required: true,
                message: 'Please input the source currency',
              },
            ]}
          >
            <Select value={currency} onChange={setCurrency}>
              {currencies.map(({ value, label }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Value"
            name="value"
            rules={[
              {
                required: true,
                message: 'Please input the value you want to convert!',
              },
            ]}
          >
            <InputNumber
              defaultValue={0}
              style={{ width: '100%' }}
              formatter={currencyFormatter(currency)}
              parser={currencyParser}
            />
          </Form.Item>
          <Form.Item
            label="Destination Currency"
            name="destinationCurrency"
            rules={[
              {
                required: true,
                message: 'Please input the destination currency',
              },
            ]}
          >
            <Select value={currency} onChange={setCurrency}>
              {currencies.map(({ value, label }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" loading={loading} htmlType="submit">
              Convert
            </Button>
          </Form.Item>
          <Title level={4}>Your latest conversions</Title>
          {isMobile ? (
            <Table dataSource={latestConversions} columns={columns} />
          ) : (
            <Form.Item {...tailLayout}>
              <Table dataSource={latestConversions} columns={columns} />
            </Form.Item>
          )}
        </Form>
      </Content>
    </Layout>
  );
};

export default App;
