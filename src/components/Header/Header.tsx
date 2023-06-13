import Button from 'react-bootstrap/Button';
import { FC } from 'react';
import { SearchLine } from '../SerachLine';
import './Header.scss';
import { TextLine } from '../TextLine';
import { text } from '../../constant';

type Props = {
  setIsOpenForm: (value: boolean) => void;
  isOpenForm: boolean;
  query: string;
  setQuery: (value: string) => void;
}

export const Header: FC<Props> = ({
   setIsOpenForm,
   isOpenForm,
   query,
   setQuery,
 }) => (
  <div className="header">
    <Button
      variant="primary"
      onClick={() => setIsOpenForm(true)}
      disabled={isOpenForm}
    >
      Create new
    </Button>

    <TextLine text={text}/>

    <SearchLine 
      query={query}
      setQuery={setQuery}
    />
  </div>
);
