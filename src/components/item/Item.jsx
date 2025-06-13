import { useState } from 'react';
import { Button, Input } from 'antd';
import style from './index.module.scss';

export default function Item({ item, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.value);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editValue.trim()) {
      updateTask(item.id, editValue.trim());
      setIsEditing(false);
    }
  };

  return (
    <li className={style.item}>
      {isEditing ? (
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className={style.input}
        />
      ) : (
        <span
  className={`${style.span} ${item.isChecked ? style.checked : ''}`}
  onClick={() => updateTask(item.id, item.value, !item.isChecked)}
>
  {item.value}
</span>
      )}
      <div>
        {isEditing ? (
          <Button type="primary" style={{marginBottom: '5px'}} onClick={handleSaveClick}>
            сохранить
          </Button>
        ) : (
          <Button type="primary" onClick={handleEditClick}>
            редактировать
          </Button>
        )}
        <Button
          className={style.button}
          onClick={() => deleteTask(item.id)}
          type="primary"
          danger
        >
          удалить
        </Button>
      </div>
    </li>
  );
}
