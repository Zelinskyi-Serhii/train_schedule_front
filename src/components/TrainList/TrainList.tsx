import { FC } from 'react';
import { TrainType } from '../../type/TrainType';
import { TrainCard } from '../TrainCard';
import { TrainListHeader } from '../TrainListHeader/TrainListHeader';
import './TrainList.scss';

type Props = {
  allTrains: TrainType[];
  deleteTrain: (trainId: number) => void;
  handleUpdateTrain: (trainId: number, body: Partial<TrainType>) => void;
  setError: (message: string) => void;
};

export const TrainList: FC<Props> = ({
  allTrains,
  deleteTrain,
  handleUpdateTrain,
  setError 
}) => (
  <div className="schedule">
    <TrainListHeader />
    {!allTrains.length && (
      <h2 className="schedule__title">Any trains</h2>
    )}

    {allTrains.map(train => (
      <TrainCard 
        train={train}
        key={train.id}
        deleteTrain={deleteTrain}
        handleUpdateTrain={handleUpdateTrain}
        setError={setError}
      />
    ))}

  </div>
);
