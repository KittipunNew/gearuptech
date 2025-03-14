import {
  faTruckFast,
  faMoneyBill,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';
import ServiceBadge from './ServiceBadge';

const Service = () => {
  return (
    <div className="relative">
      <div
        className="bg-lime-500 w-10 h-2 absolute top-0.5"
        style={{ clipPath: 'polygon(0 100%, 80% 100%, 100% 0, 0 0)' }}
      ></div>
      <div className="border-b-2 border-t-2 py-10 uppercase flex flex-col gap-20 md:flex-row justify-center items-center">
        <ServiceBadge
          icon={faTruckFast}
          serviceName="Worldwide Shipping"
          serviceDes="Enjoy free delivery on every order."
        />
        <ServiceBadge
          icon={faMoneyBill}
          serviceName="Money-Back Guarantee"
          serviceDes="30-day money back guarantee."
        />
        <ServiceBadge
          icon={faCreditCard}
          serviceName="Secure Payments"
          serviceDes="Secure checkout verified"
        />
      </div>
      <div
        className="bg-lime-500 w-10 h-2 absolute bottom-0.5 right-0"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 20% 0)' }}
      ></div>
    </div>
  );
};
export default Service;
