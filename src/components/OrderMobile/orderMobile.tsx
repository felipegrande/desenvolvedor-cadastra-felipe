import "./OrderMobile.scss";

interface OrderMobileProps {
  title: string;
  options: { id: string; label: string }[];
  selectedOption: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

const OrderMobile = ({ title, options, selectedOption, onSelect, onClose }: OrderMobileProps) => {
  return (
    <div className="ordermobile">
      <div className="ordermobile__header">
        <h2>{title}</h2>
        <svg onClick={onClose} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.5 18.1018L17.5547 0.249885" stroke="black" />
          <line y1="-0.5" x2="25.2899" y2="-0.5" transform="matrix(0.711746 0.702437 -0.874311 0.485367 0 0.485352)" stroke="black" />
        </svg>
      </div>
      <div className="ordermobile__content">
        {options.map((opt) => (
          <div
            className="ordermobile__content_text"
            key={opt.id}
            onClick={() => {
              onSelect(opt.id);
              onClose();
            }}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderMobile;