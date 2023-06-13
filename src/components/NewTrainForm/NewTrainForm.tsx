import { FC, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames';
import './NewTrainForm.scss';
import { TrainType } from '../../type/TrainType';
import { validDateValue } from '../../helpers/ValidDateValue';

type Props = {
  setIsOpenForm: (value: boolean) => void;
  addNewTrain: (newTrain: Partial<TrainType>) => void;
}

export const NewTrainForm: FC<Props> = ({ setIsOpenForm, addNewTrain }) => {
  const [trainName, setTrainName] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [errorDepartureTime, setErrorDepartureTime] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [errorArrivalTime, setErrorArrivalTime] = useState('');
  const [statusInTime, setStatusInTime] = useState(true);
  const [price, setPrice] = useState('');
  const [errorPrice, setErrorPrice] = useState('');
  const [freePlaces, setFreePlaces] = useState('');
  const [errorFreePlaces, setErrorFreePlaces] = useState('');

  const isDisabled = !trainName || !fromCity || !toCity || !departureTime || !arrivalTime;

  const createNewTrain = async() => {
    const newTrain = {
      trainName,
      fromCity,
      toCity,
      departureTime,
      arrivalTime,
      statusInTime,
      price: price.length ? +price : undefined,
      freePlaces: freePlaces.length ? +freePlaces : undefined,
    };

    let isError = false;

    if (!validDateValue(departureTime)) {
      isError = true;

      setErrorDepartureTime('Example MM-DD HH:MM');
    }

    if (!validDateValue(arrivalTime)) {
      isError = true;

      setErrorArrivalTime('Example MM-DD HH:MM');
    }

    if (isNaN(+price)) {
      isError = true;

      setErrorPrice('Write only integer')
    }

    if (isNaN(+freePlaces)) {
      isError = true;
      
      setErrorFreePlaces('Write only integer')
    }

    if (isError) {
      return;
    }

    try {
      await addNewTrain(newTrain);
    } catch {
      console.log('error123');
    }
  };


  return (
    <Form className="trainForm">
      <Form.Group className="mb-1">
        <Form.Label className=" trainForm__require">Train name</Form.Label>
        <Form.Control
          type="text"
          placeholder="max length 5 characters"
          maxLength={6}
          value={trainName}
          onChange={(event) => setTrainName(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label className=" trainForm__require">From city</Form.Label>
        <Form.Control
          type="text"
          value={fromCity}
          onChange={(event) => setFromCity(event.target.value)}
         />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label className=" trainForm__require">To city</Form.Label>
        <Form.Control
         type="text"
         value={toCity}
         onChange={(event) => setToCity(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label className="trainForm__require">Departure time</Form.Label>
        <Form.Control
          className={classNames({'trainForm__require-isDanger': !!errorDepartureTime.length})}
          type="text"
          placeholder="Only format MM-DD HH:MM"
          value={departureTime}
          onChange={(event) => setDepartureTime(event.target.value)}
        />
        {!!errorDepartureTime.length && (
          <Form.Text className="trainForm__require-red">
            {errorDepartureTime}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label className=" trainForm__require">Arrival time</Form.Label>
        <Form.Control
          className={classNames({'trainForm__require-isDanger': !!errorArrivalTime.length})}
          type="text"
          placeholder="Only format MM-DD HH:MM"
          value={arrivalTime}
          onChange={(event) => setArrivalTime(event.target.value)}
        />
        {!!errorArrivalTime.length && (
          <Form.Text className="trainForm__require-red">
            {errorDepartureTime}
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label className="trainForm__radio">Status in time</Form.Label>
        <Form.Check
          inline
          label="true"
          name="group1"
          type="radio"
          id="inline-radio-1"
          value="true"
          onChange={() => setStatusInTime(true)}
        />
        <Form.Check
          inline
          label="false"
          name="group1"
          type="radio"
          id="inline-radio-2"
          value="false"
          onChange={() => setStatusInTime(false)}
        />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label>Price</Form.Label>
        <Form.Control 
          className={classNames({'trainForm__require-isDanger': !!errorPrice.length})}
          type="text"
          placeholder="default value - 10$"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        {!!errorPrice.length && (
          <Form.Text className="trainForm__require-red">
            {errorPrice}
          </Form.Text>
        )}
      </Form.Group>
    
      <Form.Group className="mb-1">
        <Form.Label>Total places</Form.Label>
        <Form.Control
          className={classNames({'trainForm__require-isDanger': !!errorFreePlaces.length})}
          type="text"
          placeholder="default value - 100"
          value={freePlaces}
          onChange={(event) => setFreePlaces(event.target.value)}
        />
        {!!errorFreePlaces.length && (
          <Form.Text className="trainForm__require-red">
            {errorFreePlaces}
          </Form.Text>
        )}
      </Form.Group>

      <div className="trainForm__buttons">
        <Button 
          variant="primary"
          disabled={isDisabled}
          onClick={() => createNewTrain()}
        >
          Create
        </Button>

        <Button 
          variant="danger"
          onClick={() => setIsOpenForm(false)}
        >
          Cancel
        </Button>
      </div>
    </Form>
  )
};
