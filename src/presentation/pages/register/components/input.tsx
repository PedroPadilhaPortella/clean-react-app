import React from 'react';
import { useRecoilState } from 'recoil';

import { registerState } from './atoms';
import { InputBase } from '@/presentation/components';

type Props = {
  type: string
  name: string
  placeholder: string
};

const Input: React.FC<Props> = ({ type, name, placeholder }: Props) => {
  const [state, setState] = useRecoilState(registerState);

  return (
    <InputBase
      type={type}
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
    />
  );
};

export default Input;