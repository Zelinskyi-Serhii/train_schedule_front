import './TrainListHeader.scss';

export const TrainListHeader = () => (
  <div className="listHeader">
    <span className="listHeader__name">train</span>
    <span className="listHeader__city">route</span>
    <span className="listHeader__departureTime">departure time</span>
    <span className="listHeader__arrivalTime">arrival time</span>
    <span className="listHeader__status">status</span>
    <span className="listHeader__price">price</span>
    <span className="listHeader__places">places</span>
  </div>
);
