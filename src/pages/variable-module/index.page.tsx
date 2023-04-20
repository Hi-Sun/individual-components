import { Form } from "antd"
import React, { useEffect, useState } from "react"
import VariableModule, { VariablesItem } from '@components/VariableModule';
import s from './index.module.less';

interface TConfigDispatchDetailInfo {
  title?: string,
  titleVariables?: VariablesItem[],
  content?: string,
  contentVariables?: VariablesItem[],
}

const VariableModulePage = () => {
  const [configDispatchDetail, setConfigDispatchDetail] = useState<TConfigDispatchDetailInfo>({});
  const [pushPreviewTitle, setPushPreviewTitle] = useState(''); // 预览title
  const [pushPreviewContent, setPushPreviewContent] = useState(''); // 预览content

  const [form] = Form.useForm();

  const preViewTitle = (value: string) => {
    setPushPreviewTitle(value);
  }

  const preViewContent = (value: string) => {
    setPushPreviewContent(value);
  }

  useEffect(() => {
    const defaultData = {
      title: "[X1]啦，这里是[X2]",
      content: "[X1]好，这里是[X2]",
      variables: [
        {
          "contentId": 59,
          "fieldValue": "号外",
          "index": 0,
          "variableName": "[X1]",
          "variableType": 1
        },
        {
          "contentId": 60,
          "fieldValue": "标题",
          "index": 1,
          "variableName": "[X2]",
          "variableType": 1
        },
        {
          "contentId": 61,
          "fieldValue": "大家",
          "index": 0,
          "variableName": "[X1]",
          "variableType": 2
        },
        {
          "contentId": 62,
          "fieldValue": "雅玲的组件应用示例",
          "index": 1,
          "variableName": "[X2]",
          "variableType": 2
        }
      ]
    }
    const { variables, ...restParams } = defaultData;
    const titleVariables: VariablesItem[] = variables.filter((itm: VariablesItem) => itm.variableType === 1);
    const contentVariables: VariablesItem[] = variables.filter((itm: VariablesItem) => itm.variableType === 2);
    setConfigDispatchDetail({
      titleVariables,
      contentVariables,
      ...restParams
    })
  }, []);

  return (
    <div className={s.pageContent}>
      <div className={s.pagePanel}>
        <div className={s.panelTitle}>
          <span>内容配置</span>
        </div>
        <Form
          labelAlign="left"
          form={form}
          className={s.baseInfoForm}
          labelCol={{ span: 5 }}
        >
          <VariableModule
            handleChange={preViewTitle}
            initialValue={{ inputValue: configDispatchDetail?.title || '', tableValue: configDispatchDetail?.titleVariables || [] }}
            parent={form}
            preView={pushPreviewTitle}
            label={{ inputLabel: '标题', tableLabel: '标题变量配置' }}
            name={{ inputName: 'title', tableName: 'titleVariables' }}
          />
          <VariableModule
            handleChange={preViewContent}
            parent={form}
            label={{ inputLabel: '内容', tableLabel: '内容变量配置' }}
            name={{ inputName: 'content', tableName: 'contentVariables' }}
            preView={pushPreviewContent}
            initialValue={{ inputValue: configDispatchDetail?.content || '', tableValue: configDispatchDetail?.contentVariables || [] }}
          />
        </Form>
      </div>
      <div className={s.pagePreview}>
        <div className={s.panelTitle}>
          <span>预览</span>
        </div>
        <div className={s.previewContent}>
          <div className={s.title}>{pushPreviewTitle}</div>
          <div className={s.content}>{pushPreviewContent}</div>
        </div>
      </div>
    </div>
  )
}

export default VariableModulePage