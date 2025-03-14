import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ServiceBadge = (props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <FontAwesomeIcon icon={props.icon} size="3x" className="text-lime-500" />
      <div className="font-bold text-sm text-center">
        <h1>{props.serviceName}</h1>
        <p className="text-gray-400">{props.serviceDes}</p>
      </div>
    </div>
  );
};
export default ServiceBadge;
