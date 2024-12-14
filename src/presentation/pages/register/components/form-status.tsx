import React from 'react';
import { useRecoilValue } from 'recoil';

import { FormStatusBase } from '@/presentation/components';
import { registerState } from './atoms';

const FormStatus: React.FC = () => {
  const state = useRecoilValue(registerState);

  return (
    <FormStatusBase state={state} />
  );
};

export default FormStatus;