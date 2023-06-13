import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from 'use-debounce';
import { Header } from '../Header';
import { TrainList } from '../TrainList';
import './App.scss';
import { createNewTrain, getAllTrains, removeTrain, updateTrain } from '../../api/request';
import { Loader } from '../Loader';
import { Footer } from '../Footer';
import { NewTrainForm } from '../NewTrainForm';
import { TrainType } from '../../type/TrainType';

export const App = () => {
  const [allTrains, setAllTrains] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [query, setQuery] = useState('');
  const [value] = useDebounce(query, 1000);

  const loadTrains = useCallback(async() => {
    setIsLoading(true);

    try {
      const trains = await getAllTrains(value);

      setAllTrains(trains);
    } catch {
      setError('Unable to load data from server');
    } finally {
      setIsLoading(false)
    }
  }, [value]);

  const deleteTrain = async(trainId: number) => {
    setIsLoading(true);

    try {
      await removeTrain(trainId);

      await loadTrains();
    } catch {
      setError('Unable to delete train from server')
    } finally {
      setIsLoading(false)
    }
  };

  const addNewTrain = useCallback(async(newTrain: Partial<TrainType>) => {
    setIsLoading(true);
    setIsOpenForm(false)
  
    try {
      await createNewTrain(newTrain);

      await loadTrains();
    } catch {
      setError('Unable to create new train')
    } finally {
      setIsLoading(false)
    }
  }, [loadTrains]);

  const handleUpdateTrain = useCallback(async(trainId: number, body: Partial<TrainType>) => {
    setIsLoading(true);

    try {
      await updateTrain(trainId, body);

      await loadTrains();
    } catch {
      setError('Unable to update train')
    } finally {
      setIsLoading(false);
    }
  }, [loadTrains]);

  useEffect(() => {
    loadTrains();
  }, [loadTrains, value]);

  const isShowTrainList = !isLoading && !error && !isOpenForm;

  return (
    <div className="app">
      <Header
        setIsOpenForm={setIsOpenForm}
        isOpenForm={isOpenForm}
        query={query}
        setQuery={setQuery}
      />
      <div className="container">

      {!!error && (
        <h1>{error}</h1>
      )}

      {isOpenForm && !error && (
        <NewTrainForm
          setIsOpenForm={setIsOpenForm}
          addNewTrain={addNewTrain}
        />
      )}

        {isLoading && <Loader />}

        {isShowTrainList && (
          <TrainList
            allTrains={allTrains}
            deleteTrain={deleteTrain}
            handleUpdateTrain={handleUpdateTrain}
            setError={setError}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
