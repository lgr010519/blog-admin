import React, { useEffect, useState } from 'react';
import { Input, Message, Space, Tag } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import { randomColor } from '@/utils/utils';
import styles from '../style/index.module.less';
import { TweenOneGroup } from 'rc-tween-one';

const Tags = (props) => {
  const [tags, setTags] = useState(props.value || []);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const init = (arr) => {
    const newArr = arr?.map((item) => {
      return {
        name: item,
        color: randomColor(),
      };
    });
    setTags(newArr || []);
  };

  useEffect(() => {
    init(props.value);
  }, [props.value === undefined]);

  function addTag() {
    const removeRepeat = (arr) => {
      const map: any = new Map();
      for (const item of arr) {
        if (!map.has(item.name)) {
          map.set(item.name, item);
        } else {
          Message.error('不能添加重复的标签');
        }
      }
      return [...map.values()];
    };
    if (inputValue) {
      tags.push({
        name: inputValue,
        color: randomColor(),
      });
      const newTags = removeRepeat(tags);
      setTags(newTags);
      setInputValue('');
      props.onChange && props.onChange(newTags.map((item) => item.name));
    }

    setShowInput(false);
  }

  function removeTag(removeTag) {
    const newTags = tags.filter((tag) => {
      if (tag.name !== removeTag) {
        return tag;
      }
    });
    setTags(newTags);
    props.onChange && props.onChange(newTags.map((item) => item.name));
  }

  const handleAdd = () => {
    if (tags && tags.length) {
      if (props.max && tags.length < props.max) {
        setShowInput(true);
      } else {
        Message.info(`标签个数不能超过${props.max}个`);
      }
    } else {
      setShowInput(true);
    }
  };

  return (
    <Space size={20} wrap>
      <TweenOneGroup
        enter={{ scale: 0.8, opacity: 0, type: 'from', duration: 300 }}
      >
        {tags?.map((tag) => {
          return (
            <div className={styles['tags-item']} key={tag.name}>
              <Tag
                closable
                onClose={() => removeTag(tag.name)}
                color={tag.color}
                style={{ marginRight: 10, marginTop: 10 }}
              >
                {tag.name}
              </Tag>
            </div>
          );
        })}
      </TweenOneGroup>
      {showInput ? (
        <Input
          autoFocus
          size="mini"
          value={inputValue}
          style={{ width: 84, marginTop: 10 }}
          onPressEnter={addTag}
          onBlur={addTag}
          onChange={setInputValue}
        />
      ) : (
        <Tag
          icon={<IconPlus />}
          style={{
            backgroundColor: 'var(--color-fill-2)',
            border: '1px dashed var(--color-fill-3)',
            cursor: 'pointer',
            marginTop: 10,
          }}
          onClick={handleAdd}
        >
          添加
        </Tag>
      )}
    </Space>
  );
};

export default Tags;
