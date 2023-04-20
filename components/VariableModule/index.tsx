
import React, { FC, useEffect, useState } from "react";
import { FormInstance } from "antd";
import VariableInput, { VARIABLE_REG } from "../VariableInput";
import VariableTable from "../VariableTable";

interface VariablesItem {
  contentId?: number; // 内容id
  fieldValue?: string; // 字段默认值
  index?: number; // 变量位置索引，从0开始
  variableName?: string; // 变量名称
  variableType?: number; // 变量类型，1标题，2 内容
}

interface VariableModule {
  label: {
    inputLabel: string;
    tableLabel: string;
  };
  name: {
    inputName: string;
    tableName: string;
  }
  initialValue?: {
    inputValue?: string;
    tableValue?: VariablesItem[];
  }
  parent: FormInstance<any>;
  preView?: string;
  handleChange?: (value: string) => void;
}

const VariableModule: FC<VariableModule> = ({ label, name, initialValue, preView, parent, handleChange }) => {
  const [inputModuleValue, setInputModuleValue] = useState<string>('');
  const [tableModuleValue, setTableModuleValue] = useState<VariablesItem[]>([]);

  useEffect(() => {
    setInputModuleValue(initialValue?.inputValue || '');
  }, [initialValue?.inputValue])

  useEffect(() => {
    setTableModuleValue(initialValue?.tableValue || []);
  }, [initialValue?.tableValue])

  useEffect(() => {
    parent?.setFieldValue([name.inputName], inputModuleValue);
  }, [inputModuleValue]);

  useEffect(() => {
    parent?.setFieldValue([name.tableName], tableModuleValue);
  }, [tableModuleValue])

  useEffect(() => {
    const variableArr = inputModuleValue.match(VARIABLE_REG) || [];
    if (variableArr.length === tableModuleValue.length && tableModuleValue.length > 0) {
      let previewStr = inputModuleValue;
      tableModuleValue.forEach(itm => {
        if (itm.variableName) {
          previewStr = previewStr.replace(itm.variableName, itm.fieldValue || '')
        }
      })
      handleChange?.(previewStr);
    }
  }, [tableModuleValue, inputModuleValue])

  return (
    <React.Fragment>
      <VariableInput
        label={label.inputLabel}
        name={name.inputName}
        value={inputModuleValue}
        variableChange={setInputModuleValue}
      />
      <VariableTable
        label={label.tableLabel}
        name={name.tableName}
        inputValue={inputModuleValue}
        tableModuleValue={tableModuleValue}
        variableChange={setTableModuleValue}
        variableInputChange={setInputModuleValue}
      />
    </React.Fragment>

  );
};

export default VariableModule;
export type { VariablesItem }