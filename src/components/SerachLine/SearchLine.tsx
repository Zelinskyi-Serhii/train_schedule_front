import './SearchLine.scss';
import search from '../../icons/Search.svg'
import { FC } from 'react';

type Props = {
  query: string;
  setQuery: (value: string) => void;
}

export const SearchLine: FC<Props> = ({ query, setQuery }) => (
  <div className="search">
    <img 
      className="search__icon"
      src={search}
      alt="search"
    />
    <input
      type="text"
      className="search__input"
      placeholder="Search"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
    />
  </div>
);
