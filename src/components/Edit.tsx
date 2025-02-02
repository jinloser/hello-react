import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { GetContext } from '@/context';
import Alert from './common/AlertModal';
import styled from 'styled-components';
import { ListForm, SubTitle, Tip, Input, Button, LinkStyle, } from './style';

const UL = styled.ul`
  list-style-type: none;
  margin: 0 0 15px 0;
  padding: 0;
  li{
    padding: 5px;
    width: 90%;
    border-bottom: 1px solid #eee;
    margin-bottom: 5px;
  }`

const ListEdit = () => {
    const { state, action } = GetContext();
    const { user, list } = state;
    const { removeComment, addComment } = action;
    const inputRef = useRef(null);

    const showDialog = (id: string) => {
        Alert({
            title: 'are you sure',
            content: 'remove this item ?',
            onOk: () => removeComment(id)
        })
    };

    const showDia = () => {
        Alert({
            title: 'are you sure',
            content: 'remove this item ?',
        })
    }

    const add = () => {
        const input = inputRef.current;
        const val = input.value.trim();
        if (!val) return;
        addComment({
            id: '' + Math.round(Math.random() * 1000000),
            txt: val,
        });
        input.value = '';
    };

    return (
        <>
            <ListForm>
                <SubTitle>This is list page</SubTitle>
                <Button onClick={showDia} title="add item">show dialog</Button>
                <div>
                    <p>
                        hello,
                        {user.name}
                        {' '}
                        !
                    </p>
                    <p>
                        your email is
                        {user.email}
                        {' '}
                        !
                    </p>
                    <Tip>please add and remove the list item !!</Tip>
                    <Button onClick={showDia} title="add item" style={{ marginLeft: '300px' }}>show dialog</Button>
                </div>
                <UL>
                    {
                        list.map((l, i) => (
                            <li key={i}>
                                {l.txt}
                                <i className="icon-minus" title="remove item" onClick={() => showDialog(l.id)} />
                            </li>
                        ))
                    }
                </UL>
                <Input ref={inputRef} type="text" />
                <Button onClick={add} title="add item">Add Item</Button>
                <Button onClick={showDia} title="add item">show dialog</Button>
                <Button onClick={showDia} title="add item" style={{ marginLeft: '900px' }}>show dialog</Button>
                <Link css={LinkStyle} to="/">redirect to home</Link>
            </ListForm>
        </>
    );
};

export default ListEdit;
