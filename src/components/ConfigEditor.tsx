import React, { ChangeEvent, useState } from 'react';
import { Button, CollapsableSection, Collapse, Container, Form, InlineField, InlineFieldRow, InlineSwitch, Input, SecretInput, Switch, useTheme } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { MyDataSourceOptions, MySecureJsonData } from '../types';

interface Props extends DataSourcePluginOptionsEditorProps<MyDataSourceOptions, MySecureJsonData> { }


export function ConfigEditor(this: any, props: Props) {
  const [activeContentIndex, setActiveContentIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [Show, setShow] = useState(false);
  const { onOptionsChange, options } = props;
  const [Auth, SetAuth] = useState(false);
  const [Cert, setCert] = useState(false);
  const [Value, setValue] = useState([]);

  const { jsonData, secureJsonFields, secureJsonData } = options;
  const onPathChange = (event: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...jsonData,
        path: event.target.value,
      },
    });
  };

  const theme = useTheme();
  // Secure field (only sent to the backend)
  const onAPIKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      secureJsonData: {
        apiKey: event.target.value,
      },
    });
  };

  const onResetAPIKey = () => {
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        apiKey: false,
      },
      secureJsonData: {
        ...options.secureJsonData,
        apiKey: '',
      },
    });
  };
  const switchContainerStyle: React.CSSProperties = {
    padding: `0 ${theme.spacing.sm}`,
    height: `${theme.spacing.formInputHeight}px`,
    display: 'flex',
    alignItems: 'center',
  };

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }

  function handleToggleForm(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }

  function setPassword(value: string): void {
    throw new Error('Function not implemented.');
  }

  function handleShowHelp() {
    setShowHelp(!showHelp);
  }

  function ShowBasicAuth() {
    setShow(!Show)
  }

  function TLSClientAuth() {
    SetAuth(!Auth);
  }

  function ShowCert() {
    setCert(!Cert);
  }

  function handleAdd(): void {
    const abc = [...Value, []]
    // @ts-ignore
    setValue(abc)
  }
  function handleDelete(i: any) {
    const deleteval = [...Value]
    deleteval.splice(i, 1)
    setValue(deleteval)
  }

  return (
    <>
      <h3 className='page-heading'>HTTP</h3>
      <div className='gf-form-group'>
        <div className='gf-form'>
          <InlineField label="URL" labelWidth={24} interactive tooltip={'Json field returned to frontend'} className='gf-form-label width-13'>
            <div style={{ flexGrow: 1 }}>
              <Input
                id="config-editor-path"
                onChange={onPathChange}
                placeholder=""
                width={40}
              />
            </div>
          </InlineField>
        </div>
        <div className='gf-form'>
          <InlineField className='css-aq4c43 gf-form-label width-13' label="Access" labelWidth={24} interactive tooltip={'Json field returned to frontend'}>
            <select className='css-q2luhr-input-wrapper' >
              <option value={'Server (default)'}><h4>Server (default)</h4></option>
              <option value={'Browser'}><h4>Browser</h4></option>
            </select>
          </InlineField>
          <div className='gf-form'>
            <label style={{ marginLeft: '215px' }} className='gf-form-label query-keyword pointer' onClick={handleShowHelp}>Help&nbsp;
              {/* <div className='css-1vzus6i-Icon'>
              <svg 
              xmlns='http://www.w3.org/2000/svg' 
              viewBox='0 0 24 24' 
              width={16} 
              height={16} 
              className='css-sr6nr' 
              style={{ marginBottom: '0px' }} >
              <path d="M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"></path>
              </svg>
              </div> */}
            </label>
          </div>
        </div>
        {showHelp ? <div className="grafana-info-box m-t-2"><p>Access mode controls how requests to the data source will be handled.<strong>&nbsp;<i>Server</i></strong> should be the preferred way if nothing else is stated.</p><div className="alert-title">Server access mode (Default):</div><p>All requests will be made from the browser to Grafana backend/server which in turn will forward the requests to the data source and by that circumvent possible Cross-Origin Resource Sharing (CORS) requirements. The URL needs to be accessible from the grafana backend/server if you select this access mode.</p><div className="alert-title">Browser access mode:</div><p>All requests will be made from the browser directly to the data source and may be subject to Cross-Origin Resource Sharing (CORS) requirements. The URL needs to be accessible from the browser if you select this access mode.</p></div> : null}
        <InlineField label="Allowed cookies" labelWidth={24} interactive tooltip={'Json field returned to frontend'} className='gf-form-label width-13'>
          <div style={{ flexGrow: 1 }}>
            <Input
              id="config-editor-path"
              onChange={onPathChange}
              placeholder="New tag (enter key to add)"
              width={40}
            />
          </div>
        </InlineField>
        <InlineField label="Timeout" labelWidth={24} interactive tooltip={'Json field returned to frontend'} className='gf-form-label width-13'>
          <div style={{ flexGrow: 1 }}>
            <Input
              id="config-editor-path"
              onChange={onPathChange}
              placeholder="Timeout in seconds"
              width={40}
              type="number"
            />
          </div>
        </InlineField>

      </div>
      <br />
      <h3 className="page-heading">Auth</h3>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
        <div style={{ width: 'calc(50% - 12px)' }}>
          <InlineField label="Basic auth" labelWidth={24} interactive tooltip={'Json field returned to frontend'}>
            <div style={{
              marginBottom: '10px'
            }}>
              <InlineFieldRow>
                <InlineSwitch onClick={ShowBasicAuth} disabled={false} />
              </InlineFieldRow>
            </div>

          </InlineField>
          <InlineField label="TLS Client Auth" labelWidth={24} interactive tooltip={'Json field returned to frontend'}>
            <div style={{
              marginBottom: '10px'
            }}>
              <InlineFieldRow>
                <InlineSwitch disabled={false} onClick={TLSClientAuth} />
              </InlineFieldRow>
            </div>
          </InlineField>
          <InlineField label="Skip TLS Verify" labelWidth={24} interactive tooltip={'Json field returned to frontend'}>
            <div style={{
              marginBottom: '10px'
            }}>
              <InlineFieldRow>
                <InlineSwitch disabled={false} />
              </InlineFieldRow>
            </div>
          </InlineField>
          <InlineField label="Forward OAuth Identity" labelWidth={24} interactive tooltip={'Secure json field (backend only)'}>
            <div style={{
              marginBottom: '10px'
            }}>
              <InlineFieldRow>
                <InlineSwitch disabled={false} />
              </InlineFieldRow>
            </div>
          </InlineField>
          <InlineField label="With Credentials" labelWidth={24} interactive tooltip={'Secure json field (backend only)'}>
            <div style={{
              marginBottom: '10px'
            }}>
              <InlineFieldRow>
                <InlineSwitch disabled={false} />
              </InlineFieldRow>
            </div>
          </InlineField>
          <InlineField label="With CA Cert" labelWidth={24} interactive tooltip={'Secure json field (backend only)'}>
            <div style={{
              marginBottom: '10px'
            }}>
              <InlineFieldRow>
                <InlineSwitch disabled={false} onClick={ShowCert} />
              </InlineFieldRow>
            </div>
          </InlineField>
        </div>
      </div>

      <br />
      {Show ? <div className="gf-form-group">
        <form className='css-aq4c43'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{marginBottom:'5px'}} className="gf-form-label width-10">User</label>
          <input  className="gf-form-input width-12" type="text" placeholder="user" value={''} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label className="gf-form-label width-10">Password</label>
            <input className="gf-form-input width-12" type="password" placeholder="Password" value={''} />
          </div>
        </form>
      </div> : null}

      {Auth ? <div className="gf-form-group">
        <div className="gf-form css-hq2okq">
          <h6>TLS/SSL Auth Details</h6>
        </div>
        <div>
          <div className="gf-form">
            <div className="css-aq4c43">
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <label className="gf-form-label width-7">ServerName</label>
              <input type="text" className="gf-form-input width-30" placeholder="domain.example.com" value="" />
              </div>
            </div>
          </div>
          <div className="css-9doeo5-InlineFieldRow">
            <div className="css-1f5gueu">
            <div style={{ display: 'flex', alignItems: 'top' }}>
              <label className="gf-form-label width-7">Client Cert</label>
              <div className="css-1rfunm5">
                <textarea rows={7} placeholder="Begins with -----BEGIN CERTIFICATE-----" ></textarea>
              </div>
              </div>
            </div>
          </div>
          <div className="css-9doeo5-InlineFieldRow">
            <div className="css-1f5gueu">
            <div style={{ display: 'flex', alignItems: 'top' }}>
              <label className="gf-form-label width-7">Client Key</label>
              <div className="css-1rfunm5">
                <textarea rows={7} placeholder="Begins with -----BEGIN RSA PRIVATE KEY-----" className="css-uskzr5"></textarea>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div> : null}
      {Cert ? <div className="gf-form-group">
        <div className="gf-form css-hq2okq">
          <h6>TLS/SSL Auth Details</h6>
        </div>
        <div>
          <div className="css-9doeo5-InlineFieldRow">
            <div className="css-1f5gueu">
              <div style={{ display: 'flex', alignItems: 'top' }}>
              <label className="gf-form-label width-7">CA Cert</label>
              <div className="css-1rfunm5">
                <textarea rows={7} placeholder="Begins with -----BEGIN CERTIFICATE-----" className="css-uskzr5"></textarea>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div> : null}

      <h4>Custom HTTP Headers</h4>
      {Value.map((val, i) => {
          return (
            <div key={i} >
              {/* <div className="gf-form-inline"> */}
                <div className="gf-form">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label className="gf-form-label width-5">Header</label>
                        <input type="text" className="gf-form-input width-12" placeholder="Admin" value="" />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label className="gf-form-label width-5">Value</label>
                        <input type="password" className="gf-form-input width-12" placeholder="password" name="value" />
                      </div>
                      <button className="css-1oe1lwi-button" type="button" aria-label="Remove Custom HTTP Header" onClick={handleDelete} style={{ marginInlineStart: '4px' }} >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="16" className="css-gti615-Icon">
                          <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
               </div>
            // </div>
          )
        })}
      <div className="gf-form">
        <button className="css-1a8393j-button" onClick={handleAdd} type="button">+ Add header</button>
      </div>

    </>
  );
}

function useArgs(): [any, any] {
  throw new Error('Function not implemented.');
}

function action(arg0: string) {
  throw new Error('Function not implemented.');
}


