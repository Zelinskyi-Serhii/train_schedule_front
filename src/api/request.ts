import { TrainType } from "../type/TrainType";

const BASE_URL = 'https://train-schedule-6o0l.onrender.com/trains';

export const getAllTrains = async(query: string) => {
  try {
    const trains = await fetch(`${BASE_URL}/?city=${query}`, {
      method: 'GET',
    });

    return trains.json();
  } catch {
    return Promise.reject('Unable to load data from server');
  }
};

export const createNewTrain = async(body: Partial<TrainType>) => {
  try {
    await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    });

  } catch {
    return Promise.reject('Unable to create new train');
  }
};

export const updateTrain = async(trainId: number, body: Partial<TrainType>) => {
  try {
    await fetch(`${BASE_URL}/${trainId}`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    })
  } catch {
    return Promise.reject('Unable to update new train');
  }
}

export const removeTrain = async(trainId: number) => {
  try {
    await fetch(`${BASE_URL}/${trainId}`, {
      method: 'DELETE',
    })

  } catch {
    return Promise.reject('Unable to delete train from server');
  }
}
