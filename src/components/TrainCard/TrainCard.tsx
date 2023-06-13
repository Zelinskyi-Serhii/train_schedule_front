import { FC, useState } from 'react';
import { TrainType } from '../../type/TrainType';
import './TrainCard.scss';
import { convertDateTime } from '../../helpers/convertDateTime';
import close from '../../icons/Close.svg';
import edit from '../../icons/edit_icon.svg';
import { UpdateTrainForm } from '../UpdateTrainForm';

type Props = {
  train: TrainType;
  deleteTrain: (trainId: number) => void;
  handleUpdateTrain: (trainId: number, body: Partial<TrainType>) => void;
  setError: (message: string) => void;
};

export const TrainCard: FC<Props> = ({
  train,
  deleteTrain,
  handleUpdateTrain,
  setError
}) => {
  const {
    id,
    trainName,
    fromCity,
    toCity, 
    departureTime, 
    arrivalTime, 
    statusInTime,
    price, 
    freePlaces
  } = train;
  const correctDepartureDate = convertDateTime(departureTime);
  const correctArrivalDate = convertDateTime(arrivalTime);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  return (
    <div className="trainCard">
      {isOpenEdit ? (
        <UpdateTrainForm 
          oldTrain={train}
          handleUpdateTrain={handleUpdateTrain}
          setIsOpenEdit={setIsOpenEdit}
          setError={setError}
        />
      ) : (
        <>
          <span className="trainCard__name">{trainName}</span>
          <span className="trainCard__city">{`${fromCity} - ${toCity}`}</span>
          <span className="trainCard__departureTime">{correctDepartureDate}</span>
          <span className="trainCard__arrivalTime">{correctArrivalDate}</span>
          {statusInTime ? (
            <span className="trainCard__status">inTime</span>
          ) : (
            <span className="trainCard__status trainCard__status-danger">late</span>
          )}
          <span className="trainCard__price">{`${price}$`}</span>
          <span className="trainCard__places">{freePlaces}</span>
    
          <div className="trainCard__buttons">
            <img
              src={close} alt="close"
              className="trainCard__button-close"
              onClick={() => deleteTrain(id)}
            />
            <img
              src={edit}
              alt="close"
              className="trainCard__button-edit"
              onClick={() => setIsOpenEdit(true)}
            />
          </div>
        </>
      )}
    </div>
  );
};
