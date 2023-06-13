import { FC, useState } from 'react';
import close from '../../icons/Close.svg';
import Button from 'react-bootstrap/Button';
import './UpdateTrainForm.scss';
import { TrainType } from '../../type/TrainType';
import { convertDateTime } from '../../helpers/convertDateTime';
import { validDateValue } from '../../helpers/ValidDateValue';
import classNames from 'classnames';

type Props = {
  oldTrain: TrainType;
  handleUpdateTrain: (trainId: number, body: Partial<TrainType>) => void;
  setIsOpenEdit: (value: boolean) => void;
  setError: (message: string) => void;
}

export const UpdateTrainForm: FC<Props> = ({ 
  oldTrain,
  handleUpdateTrain,
  setIsOpenEdit,
  setError,
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
  } = oldTrain;

  const correctDepartureDate = convertDateTime(departureTime);
  const correctArrivalDate = convertDateTime(arrivalTime);

  const [trainNameEdit, setTrainNameEdit] = useState(trainName);
  const [fromCityEdit, setFromCityEdit] = useState(fromCity);
  const [toCityEdit, setToCityEdit] = useState(toCity);
  const [departureTimeEdit, setDepartureTimeEdit] = useState(correctDepartureDate);
  const [errorDepartureTime, setErrorDepartureTime] = useState('');
  const [arrivalTimeEdit, setArrivalTimeEdit] = useState(correctArrivalDate);
  const [errorArrivalTime, setErrorArrivalTime] = useState('');
  const [statusInTimeEdit, setStatusInTimeEdit] = useState(statusInTime);
  const [priceEdit, setPriceEdit] = useState(String(price));
  const [errorPrice, setErrorPrice] = useState('');
  const [freePlacesEdit, setFreePlacesEdit] = useState(String(freePlaces));
  const [errorFreePlaces, setErrorFreePlaces] = useState('');

  const isDisabled = !trainNameEdit || !fromCityEdit || !toCityEdit || !departureTimeEdit || !arrivalTimeEdit;

  const updateTrain = async() => {

    const newTrain = {
      trainName: trainNameEdit,
      fromCity: fromCityEdit,
      toCity: toCityEdit,
      departureTime: departureTimeEdit,
      arrivalTime: arrivalTimeEdit,
      statusInTime: statusInTimeEdit,
      price: priceEdit.length ? +priceEdit : undefined,
      freePlaces: freePlacesEdit.length ? +freePlacesEdit : undefined,
    };

    let isError = false;

    if (!validDateValue(departureTimeEdit)) {
      isError = true;

      setErrorDepartureTime('Example MM-DD HH:MM');
    }

    if (!validDateValue(arrivalTimeEdit)) {
      isError = true;

      setErrorArrivalTime('Example MM-DD HH:MM');
    }

    if (isNaN(+priceEdit)) {
      isError = true;

      setErrorPrice('Write only integer');
    }

    if (isNaN(+freePlacesEdit)) {
      isError = true;

      setErrorFreePlaces('Write only integer');
    }
    
    if (isError) {
      return;
    }

    try {
      await handleUpdateTrain(id, newTrain);
    } catch {
      setError('Unable to update Train');
    } finally {
      setIsOpenEdit(false);
    }
  };


  return (
    <>
    <input
      className={classNames('trainCard__name', {'trainCard-danger': !trainNameEdit.length})}
      placeholder="Train name"
      value={trainNameEdit}
      onChange={(event) => setTrainNameEdit(event.target.value)}
    />

    <div className="trainCard__city">
      <input
        className={classNames('trainCard__fromCity', {'trainCard-danger': !fromCityEdit.length})}
        placeholder="From city"
        value={fromCityEdit}
        onChange={(event) => setFromCityEdit(event.target.value)}
      />
      from
      <input
        className={classNames('trainCard__toCity', {'trainCard-danger': !toCityEdit.length})}
        placeholder="To city"
        value={toCityEdit}
        onChange={(event) => setToCityEdit(event.target.value)}
      />
      to
    </div>

    <input 
     className={classNames('trainCard__departureTime', {'trainCard-danger': errorDepartureTime.length})}
     placeholder="MM-DD HH:MM"
     value={departureTimeEdit}
     onChange={(event) => setDepartureTimeEdit(event.target.value)}
    />

    <input 
      className={classNames('trainCard__arrivalTime', {'trainCard-danger': errorArrivalTime.length})}
      placeholder="MM-DD HH:MM"
      value={arrivalTimeEdit}
      onChange={(event) => setArrivalTimeEdit(event.target.value)}
    />

    <label className="trainCard__inputLabel">
      InTime true
      <input 
        type="checkbox"
        value="true"
        className="trainCard__status" 
        checked={statusInTimeEdit === true} 
        onChange={() => setStatusInTimeEdit(true)}
       />
    </label>

    <label>
      InTime false
      <input 
        type="checkbox"
        value="false"
        className="trainCard__status"
        checked={statusInTimeEdit === false}
        onChange={() => setStatusInTimeEdit(false)}
      />
    </label>

    <input
      className={classNames('trainCard__price', {'trainCard-danger': !!errorPrice.length})}
      placeholder="Price"
      value={priceEdit}
      onChange={(event) => setPriceEdit(event.target.value)}
    />

    <input
      className={classNames('trainCard__places', {'trainCard-danger': !!errorFreePlaces.length})}
      placeholder="Free places"
      value={freePlacesEdit}
      onChange={(event) => setFreePlacesEdit(event.target.value)}
    />

    <div className="trainCard__buttons">
      <Button
        variant="primary"
        disabled={isDisabled}
        onClick={() => updateTrain()}
      >
        Ok
      </Button>

      <img
        src={close} alt="close"
        className="trainCard__button-close"
        onClick={() => setIsOpenEdit(false)}
      />
    </div>
  </>
  );
};
