import React, { useCallback, useState, ReactDOM, useEffect, useMemo } from 'react';
import {
  Layout,
  Button,
  Modal,
  Input,
  Alert,
  Form,
  Select,
  message,
  Popconfirm
} from 'antd';
import { Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';
import { exportLayoutStore, exportSchema } from '../../store';
import { createApiMethod } from 'app-framework';
import './index.scss';

const NOT_EXIST_CODE = 2128;
const ALREADY_EXIST_CODE = 2131;

const {
  Header,
} = Layout;

const { Item } = Form;

const SchemaTypeOptions = [{ label: '表单', value: 'form' }, { label: '表单数据', value: 'form-data' }, { label: '普通', value: 'normal' }];

const request = createApiMethod({
  method: 'POST'
});

const PageLayout = () => {
  const nav = useNavigate();
  const { mode, schemaName } = useParams();
  const location = useLocation();
  const [name, setName] = useState('');
  const [schemaType, setSchemaType] = useState('');
  const [visible, setVisible] = useState(false);
  const [schemaOptions, setOptions] = useState([]);
  const [bindSchema, setBindSchema] = useState('');
  const isManage = useMemo(() => location.pathname === '/manage', [location]);
  const curSchemaName = useMemo(() => name || `${bindSchema}-data`, [name, bindSchema]);

  const onNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);

  const changeSchemaName = useCallback((value: string) => {
    setSchemaType(value);
  }, []);

  const showModal = useCallback(() => {
    setVisible(true);
  }, []);

  const upload = useCallback(async () => {
    if (!name && !bindSchema) {
      showModal();
    } else {
      const state = exportLayoutStore();
      const schema = exportSchema();
      await request({
        url: `/schemas/create`,
        data: {
          schema: {
            name: curSchemaName,
            content: schema,
            type: schemaType,
            bindSchema
          },
          state: {
            name: curSchemaName,
            content: state
          },
        }
      }).then((r: any) => {
        const { code } = r;
        if (code !== ALREADY_EXIST_CODE) {
          message.success(`创建${curSchemaName}成功`);
          nav(`/platform/edit/${curSchemaName}`);
        } else {
          setName('');
          setBindSchema('');
          message.error(r.message);
        }
      }).catch((e) => {
        message.error(`${e.message}\n上传异常`, 1);
      });
    }
    
  }, [curSchemaName, showModal, nav, schemaType, bindSchema, name]);

  const manage = useCallback(() => {
    nav('/manage');
  }, [nav]);

  const create = useCallback(() => {
    nav('/platform/create');
  }, [nav]);

  const goEdit = useCallback(() => {
    nav(`/platform/edit/${schemaName}`);
  }, [nav, schemaName]);

  const goView = useCallback(() => {
    nav(`/platform/view/${schemaName}`);
  }, [nav, schemaName]);

  const update = useCallback(async () => {
    console.log('update');
    const state = exportLayoutStore();
    const schema = exportSchema();
    await request({
      url: `/schemas/update`,
      data: {
        schema: {
          name: schemaName,
          content: schema,
          type: schemaType
        },
        state: {
          name: schemaName,
          content: state
        },
      }
    }).then(() => {
      message.success(`更新${schemaName}成功`, 1);
    }).catch(() => {
      message.error(`更新${schemaName}成功`, 2);
    });
  }, [schemaName, schemaType]);

  const shouldGetOptions = useMemo(() => schemaType === 'form-data', [schemaType]);
  
  const requestSchemaOptions = useMemo(() => createApiMethod({
    url: '/schemas',
    params: {
      type: 'form'
    }
  }), []);

  const getSchemaOptions = useCallback(() => {
    requestSchemaOptions({}).then(r => {
      const { schema = [] } = r;
      setOptions(schema.map((s: any) => ({ label: s.name, value: s.name })));
    }).catch(e => {
      console.error(e);
      message.error(`${e.message}\n获取可绑定schema列表异常`, 1);
    })
  }, [requestSchemaOptions]);

  useEffect(() => {
    if (shouldGetOptions) {
      getSchemaOptions();
    }
  }, [shouldGetOptions, getSchemaOptions]);

  const reset = useCallback(() => {
    window.history.go(0);
  }, []);

  return (
    <div className="App">
      <Layout style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header style={{ backgroundColor: 'yellow', zIndex: 999 }}>
          <h1 className='headerTitle'>
            LowCode Platform
            <div className='headerBtns'>
              <Modal
                title="schema配置"
                visible={visible}
                onOk={() => {
                  upload();
                  setVisible(false);
                }}
                onCancel={() => {
                  setName('');
                  setBindSchema('');
                  setVisible(false);
                }}
                wrapClassName={(name || bindSchema) ? '' : 'configModal'}
              >
                <Item label="类型">
                  <Select
                    value={schemaType}
                    onChange={changeSchemaName}
                    options={SchemaTypeOptions}
                  />
                </Item>
                <Item label="名称">
                  <Input value={name} onChange={onNameChange} />
                </Item>
                {
                  shouldGetOptions && (
                    <Item label="绑定">
                      <Select options={schemaOptions} onChange={setBindSchema} value={bindSchema} />
                    </Item>
                  )
                }
              </Modal>
              {mode === 'create' && <Button className='btn' type='primary' onClick={upload}>上传</Button>}
              {mode === 'edit' && <Popconfirm
                  title="确定要重置已编辑的内容吗?"
                  onConfirm={reset}
                  okText="yes"
                  cancelText="cancel"
                >
                  <Button className='btn' type='default' danger>重置</Button>
                </Popconfirm>
              }
              {mode === 'edit' && <Button className='btn' type='primary' onClick={update}>更新</Button>}
              {mode === 'edit' && <Button className='btn' type='primary' onClick={goView}>预览</Button>}
              {mode === 'view' && <Button className='btn' type='primary' onClick={goEdit}>编辑</Button>}
              {!isManage && <Button className='btn' type='primary' onClick={manage}>管理</Button>}
              {isManage && <Button className='btn' type='primary' onClick={create}>新建</Button>}
            </div>
          </h1>
        </Header>
        <Outlet />
      </Layout>
    </div>
  );
}

export default PageLayout;