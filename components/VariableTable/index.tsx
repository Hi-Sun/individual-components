

// import { requestVariableFileld } from "@requests/queries/strategy/dispatch/useStrategyDetailQuery";
// import useVariableOptionsListQuery from "@requests/queries/strategy/dispatch/useVariableOptionsListQuery";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Input, Form, Table, FormInstance, InputRef, Button, Select } from "antd";
import { VARIABLE_REG } from "../VariableInput";
import { VariablesItem } from "../VariableModule";
import s from './index.module.less';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  variableName: string;
  fieldValue: string;
}

interface variableDataItem {
  index: number;
  key: React.Key;
  variableName: string;
  fieldValue: string | undefined;
}

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  preViewValue: string;
  editType: string;
  handleSave: (record: Item) => void;
  handleChangeField?: (variableName: string, value: string) => void;
}

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

// 可编辑列
const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  editType,
  handleSave,
  handleChangeField,
  ...restProps
}) => {

  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    if (editing) {
      childNode = (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
        >
          <Input placeholder="当字段取值为空时填充" ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      )
    } else {
      childNode = (
        <div className="editable-cell-value-wrap" style={{ paddingRight: 24, height: 32 }} onClick={toggleEdit}>
          {children}
        </div>
      )
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface VariableTableProps {
  label: string;
  name: string;
  inputValue: string;
  tableModuleValue: VariablesItem[];
  variableChange: (value: any[]) => void;
  variableInputChange: (value: string) => void;
}

const VariableTable: FC<VariableTableProps> = ({ inputValue, label, name, tableModuleValue, variableChange, variableInputChange }) => {

  const [variableArray, setVariableArray] = useState<any[]>([]);

  useEffect(() => {
    if (inputValue) {
      // 获取插入变量
      const variableArr = inputValue.match(VARIABLE_REG) || [];
      let tableArr: variableDataItem[] = [];
      variableArr.map((item, index) => {
        tableArr.push({
          key: item,
          index,
          variableName: item,
          fieldValue: tableModuleValue.filter(itm => itm.variableName === item)?.[0]?.fieldValue,
        });
      });
      setVariableArray(tableArr);
      variableChange?.(tableArr);
    } else {
      setVariableArray([])
    }
  }, [inputValue])

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  // 删除
  const handleDelete = (row: any) => {
    const variableArr = [...variableArray.map(item => item.key)];
    const variableArrayKey = variableArray.map(item => item.key);
    const index = variableArr.findIndex(item => item === row.key);
    variableArr.splice(index, 1);
    if (Array.isArray(variableArr)) {
      const deleteVariable = variableArrayKey.filter((itm: string) => !variableArr.includes(itm));
      let deletedString = inputValue;
      if (deleteVariable.length > 0) {
        deletedString = inputValue.replace(deleteVariable[0], '');
      }
      variableInputChange(deletedString);
    }
  }

  // 编辑行保存
  const handleSave = (row: variableDataItem) => {
    const newData = [...tableModuleValue];
    const index = newData.findIndex((item) => row.variableName === item.variableName);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setVariableArray(newData);
    variableChange(newData);
  }

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string; editType?: string })[] = [
    {
      title: '变量名',
      dataIndex: 'variableName',
      width: 72,
    },
    {
      title: '变量字段取值',
      dataIndex: 'fieldValue',
      width: 232,
      editable: true,
      editType: 'input',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => (
        <Button type="link" size="small" onClick={() => handleDelete(record)}>删除</Button>
      ),
      width: 64
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: variableDataItem) => ({
        key: col.key,
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        editType: col.editType,
        handleSave,
      }),
    };
  });

  return (
    <React.Fragment >
      <Form.Item className={s.variableTable} label={label} name={name}>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          rowKey={(record) => record.key}
          dataSource={variableArray}
          pagination={false}
          columns={columns as ColumnTypes}
        />
      </Form.Item>
    </React.Fragment>

  );
}

export default VariableTable;
export type { variableDataItem }